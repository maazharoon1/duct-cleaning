import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateContact } from "@/lib/contact-validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let input: unknown;
  try {
    const body = await request.text();
    if (body.length > 16_000) return NextResponse.json({ success: false, error: "Your request is too large." }, { status: 413 });
    input = JSON.parse(body);
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request. Please check your form details." }, { status: 400 });
  }
  const result = validateContact(input);
  if (!result.success) return NextResponse.json(result, { status: 400 });
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL;
  if (!user || !pass || !receiver) {
    console.error("Contact email configuration is incomplete.");
    return NextResponse.json({ success: false, error: "The contact form is temporarily unavailable. Please try again later." }, { status: 503 });
  }
  const transporter = nodemailer.createTransport({
    service: "gmail", auth: { user, pass },
    connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 20_000,
  });
  try {
    const { fullName, phone, email, zip, service, message } = result.data;
    const info = await transporter.sendMail({
      from: { name: "Duct Master Website", address: user },
      to: receiver, replyTo: email,
      subject: `New estimate request: ${service}`,
      text: ["New free estimate request", "", `Full name: ${fullName}`, `Phone: ${phone}`, `Email: ${email}`, `ZIP code: ${zip}`, `Service: ${service}`, "", "Message:", message || "No additional message provided."].join("\n"),
    });
    if (!info.accepted.length || info.rejected.length) throw new Error("Recipient not accepted");
    return NextResponse.json({ success: true, message: "Your estimate request was sent successfully." });
  } catch {
    console.error("Contact email could not be sent.");
    return NextResponse.json({ success: false, error: "We could not send your request. Please try again shortly." }, { status: 502 });
  } finally {
    transporter.close();
  }
}
