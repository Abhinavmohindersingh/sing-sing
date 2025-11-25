const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
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
    return res.status(200).json({ ok: true });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !company || !message) {
      console.log("Missing fields:", { name, email, company, message });
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Sending contact email via Resend...", {
      name,
      email,
      company,
    });

    // ✅ CRITICAL FIX: Destructure { data, error } from Resend response
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
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 14px;">Reply to: ${email}</p>
        </div>
      `,
      replyTo: email,
    });

    // ✅ CHECK FOR RESEND API ERRORS
    if (error) {
      console.error("❌ Resend API returned an error:", error);
      return res.status(400).json({
        success: false,
        error: error.message || "Resend API error",
        details: error,
      });
    }

    console.log("✅ Contact email sent successfully:", data);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      emailId: data.id,
    });
  } catch (error) {
    console.error("❌ Unexpected error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to send email",
    });
  }
};
