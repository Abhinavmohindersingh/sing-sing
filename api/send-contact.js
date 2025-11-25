import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !company || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await resend.emails.send({
      from: "Sing Singh AI <onboarding@resend.dev>",
      to: ["abhinavsinghkanwal@gmail.com"],
      subject: `New Contact Form: ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1E3A8A;">New Contact Form Submission</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      return res.status(400).json({ success: false, error });
    }

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      emailId: data.id,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
