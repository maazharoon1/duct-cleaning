import nextEnv from "@next/env";
import nodemailer from "nodemailer";

nextEnv.loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

const required = ["GMAIL_USER", "GMAIL_APP_PASSWORD", "CONTACT_RECEIVER_EMAIL"];
const missing = required.filter((key) => !process.env[key]?.trim());
if (missing.length) {
  console.error(`Missing contact email settings: ${missing.join(", ")}`);
  process.exitCode = 1;
} else {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER.trim(),
      pass: process.env.GMAIL_APP_PASSWORD.replace(/\s/g, ""),
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  try {
    await transport.verify();
    console.log("Gmail connection and authentication passed. No email was sent.");
  } catch (error) {
    console.error("Gmail verification failed:", {
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
    });
    process.exitCode = 1;
  } finally {
    transport.close();
  }
}
