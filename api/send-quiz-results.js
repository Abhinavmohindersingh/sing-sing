const { Resend } = require("resend");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, company, score, gaps, totalHoursWasted } = req.body;
  if (!name || !email || !company) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    if (!process.env.RESEND_API_KEY) throw new Error("API key missing");

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Quiz Lead <onboarding@resend.dev>",
      to: ["abhinavsinghkanwal@gmail.com"],
      subject: `Quiz Lead: ${name} (${company})`,
      html: `
        <h1>New Quiz Lead</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Score:</strong> ${score}</p>
        <p><strong>Gaps:</strong> ${gaps}</p>
        <p><strong>Total Hours Wasted:</strong> ${totalHoursWasted}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: err.message || "Send failed!" });
  }
};
