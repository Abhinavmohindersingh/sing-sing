const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
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
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !company || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Sending contact email via Resend...");

    const data = await resend.emails.send({
      from: "Sing Singh AI <onboarding@resend.dev>",
      to: ["henry.ho@singsinghai.com.au", "abhinav.singh@singsinghai.com.au"],
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
      reply_to: email,
    });

    console.log("Contact email sent successfully");
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({
      error: error.message || "Failed to send email",
    });
  }
};
