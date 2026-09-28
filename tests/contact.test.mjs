import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Load the real TypeScript modules with an isolated mail transport: no emails are sent.
function load(file, dependencies = {}, env = {}) {
  const code = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const loaded = { exports: {} };
  runInNewContext(code, {
    exports: loaded.exports, module: loaded,
    require: (name) => {
      if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
      return dependencies[name];
    },
    process: { env }, console: { error() {} },
  });
  return loaded.exports;
}

const validation = load("lib/contact-validation.ts");
const valid = { fullName: "Test Customer", phone: "(555) 123-4567", email: "test@example.com", zip: "90210", service: "Air Duct Cleaning", message: "" };
function handler({ env = { GMAIL_USER: "sender@example.com", GMAIL_APP_PASSWORD: "test", CONTACT_RECEIVER_EMAIL: "receiver@example.com" }, sendMail = async () => ({ accepted: ["receiver@example.com"], rejected: [] }) } = {}) {
  return load("app/api/contact/route.ts", {
    "@/lib/contact-validation": validation,
    "next/server": { NextResponse: Response },
    nodemailer: { createTransport: () => ({ sendMail, close() {} }) },
  }, env).POST;
}
const request = (body) => new Request("http://localhost/api/contact", { method: "POST", body: typeof body === "string" ? body : JSON.stringify(body) });

test("accepts an optional empty message and normalizes contact details", () => {
  const result = validation.validateContact({ ...valid, fullName: "  Test Customer  ", message: undefined });
  assert.equal(result.success, true);
  assert.equal(result.data.fullName, "Test Customer");
  assert.equal(result.data.message, "");
});

test("rejects missing services, invalid fields, whitespace and non-string values", () => {
  for (const input of [null, [], { ...valid, service: "" }, { ...valid, service: "Other" }, { ...valid, fullName: "  " }, { ...valid, phone: "-------" }, { ...valid, phone: {} }, { ...valid, email: "invalid" }, { ...valid, zip: "123" }, { ...valid, message: "x".repeat(1001) }]) {
    assert.equal(validation.validateContact(input).success, false);
  }
});

test("malformed JSON and invalid form data return 400 without sending mail", async () => {
  const post = handler({ sendMail: async () => { assert.fail("Must not send invalid requests"); } });
  for (const body of ["{", null, { ...valid, zip: "bad" }]) {
    const response = await post(request(body));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).success, false);
  }
});

test("oversized submissions return 413", async () => {
  assert.equal((await handler()(request("x".repeat(16001)))).status, 413);
});

test("missing mail configuration returns a recoverable 503", async () => {
  assert.equal((await handler({ env: {} })(request(valid))).status, 503);
});

test("success includes service, ZIP and safe plain-text message in the email", async () => {
  let sent;
  const response = await handler({ sendMail: async (message) => { sent = message; return { accepted: ["receiver@example.com"], rejected: [] }; } })(request({ ...valid, message: "<script>alert(1)</script>" }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  assert.equal(sent.replyTo, valid.email);
  assert.match(sent.text, /ZIP code: 90210/);
  assert.match(sent.text, /Service: Air Duct Cleaning/);
  assert.equal(sent.html, undefined);
});

test("SMTP failures and rejected recipients never report success", async () => {
  for (const sendMail of [async () => { throw new Error("SMTP failure"); }, async () => ({ accepted: [], rejected: ["receiver@example.com"] })]) {
    const response = await handler({ sendMail })(request(valid));
    assert.equal(response.status, 502);
    const body = await response.json();
    assert.equal(body.success, false);
    assert.equal(typeof body.error, "string");
  }
});
