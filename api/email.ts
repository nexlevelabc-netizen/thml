import nodemailer from "nodemailer";

const TO_EMAIL = process.env.CONTACT_EMAIL || "info@thameshousingmanagement.co.uk";

function getTransporter() {
  // If SMTP credentials are provided, use them
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Otherwise, use Ethereal (test account) for development
  // In production without SMTP, emails are logged to console
  return null;
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  type: string;
  subject?: string;
  message: string;
}) {
  try {
    const transporter = getTransporter();

  const html = `
    <h2>New contact form submission</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${data.phone || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">I am a</td><td style="padding:8px;border:1px solid #ddd">${data.type}</td></tr>
      ${data.subject ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Subject</td><td style="padding:8px;border:1px solid #ddd">${data.subject}</td></tr>` : ""}
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${data.message.replace(/\n/g, "<br>")}</td></tr>
    </table>
  `;

  const text = `
New contact form submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "—"}
I am a: ${data.type}
${data.subject ? `Subject: ${data.subject}` : ""}
Message: ${data.message}
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"THML Website" <${process.env.SMTP_USER}>`,
        to: TO_EMAIL,
        replyTo: data.email,
        subject: `Contact form: ${data.name}`,
        text,
        html,
      });
      return { sent: true };
    } catch (err) {
      console.error("SMTP send failed:", err);
      // Fall through to logging
    }
  }

  // No SMTP or send failed — log and return success (form still works)
  console.log("Contact form submission (logged, not emailed):");
  console.log(text);
  return { sent: false, logged: true };
  } catch (err) {
    console.error("Contact email error:", err);
    // Still return success so the user sees confirmation
    console.log("Contact form submission (error fallback):");
    console.log(JSON.stringify(data, null, 2));
    return { sent: false, logged: true, error: true };
  }
}

export async function sendQuoteEmail(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  address?: string;
  description: string;
  timeframe?: string;
}) {
  try {
    const transporter = getTransporter();

  const html = `
    <h2>New quote request</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:8px;border:1px solid #ddd">${data.company || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${data.phone || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Service required</td><td style="padding:8px;border:1px solid #ddd">${data.service}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Property address</td><td style="padding:8px;border:1px solid #ddd">${data.address || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Timeframe</td><td style="padding:8px;border:1px solid #ddd">${data.timeframe || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Description</td><td style="padding:8px;border:1px solid #ddd">${data.description.replace(/\n/g, "<br>")}</td></tr>
    </table>
  `;

  const text = `
New quote request

Name: ${data.name}
Company: ${data.company || "—"}
Email: ${data.email}
Phone: ${data.phone || "—"}
Service: ${data.service}
Address: ${data.address || "—"}
Timeframe: ${data.timeframe || "—"}
Description: ${data.description}
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"THML Website" <${process.env.SMTP_USER}>`,
        to: TO_EMAIL,
        replyTo: data.email,
        subject: `Quote request: ${data.service} — ${data.name}`,
        text,
        html,
      });
      return { sent: true };
    } catch (err) {
      console.error("SMTP send failed:", err);
    }
  }

  console.log("Quote request (logged, not emailed):");
  console.log(text);
  return { sent: false, logged: true };
  } catch (err) {
    console.error("Quote email error:", err);
    console.log(JSON.stringify(data, null, 2));
    return { sent: false, logged: true, error: true };
  }
}

export async function sendPropertyEnquiryEmail(data: {
  name: string;
  email: string;
  phone?: string;
  propertyTitle: string;
  message?: string;
}) {
  try {
    const transporter = getTransporter();

  const html = `
    <h2>Property enquiry</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Property</td><td style="padding:8px;border:1px solid #ddd">${data.propertyTitle}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${data.phone || "—"}</td></tr>
      ${data.message ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${data.message.replace(/\n/g, "<br>")}</td></tr>` : ""}
    </table>
  `;

  const text = `
Property enquiry

Property: ${data.propertyTitle}
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "—"}
${data.message ? `Message: ${data.message}` : ""}
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"THML Website" <${process.env.SMTP_USER}>`,
        to: TO_EMAIL,
        replyTo: data.email,
        subject: `Property enquiry: ${data.propertyTitle} — ${data.name}`,
        text,
        html,
      });
      return { sent: true };
    } catch (err) {
      console.error("SMTP send failed:", err);
    }
  }

  console.log("Property enquiry (logged, not emailed):");
  console.log(text);
  return { sent: false, logged: true };
  } catch (err) {
    console.error("Property enquiry email error:", err);
    console.log(JSON.stringify(data, null, 2));
    return { sent: false, logged: true, error: true };
  }
}
