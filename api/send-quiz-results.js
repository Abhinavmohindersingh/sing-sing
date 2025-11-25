import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Set CORS headers BEFORE any logic
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

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { name, email, company, mobile, score, gaps, totalHoursWasted } =
      req.body;

    if (!name || !email || !company) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    console.log("Sending quiz results via Resend...", {
      name,
      email,
      company,
      score,
    });

    const gapsHTML =
      Array.isArray(gaps) && gaps.length > 0
        ? gaps
            .map(
              (gap, index) => `
          <div style="margin-bottom: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <h4 style="margin: 0 0 10px 0; color: #333;">Priority ${index + 1}: ${gap.solution?.name || "N/A"}</h4>
            <p style="margin: 5px 0;"><strong>Category:</strong> ${gap.category}</p>
            <p style="margin: 5px 0;"><strong>Severity:</strong> ${gap.severity}</p>
            <p style="margin: 5px 0;"><strong>Hours Wasted/Week:</strong> ${gap.hoursWasted || 0}</p>
            <p style="margin: 5px 0;"><strong>Problem:</strong> ${gap.solution?.solves || "N/A"}</p>
          </div>
        `
            )
            .join("")
        : "<p>No gaps identified</p>";

    const { data, error } = await resend.emails.send({
      from: "Quiz Lead <onboarding@resend.dev>",
      to: ["abhinavsinghkanwal@gmail.com"],
      subject: `🎯 New Quiz Lead: ${name} from ${company} (Score: ${score}%)`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1E3A8A, #10B981); padding: 30px; border-radius: 10px; color: white; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 24px; }
            .info-box { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
            .info-row { display: flex; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
            .info-row:last-child { border-bottom: none; }
            .info-label { font-weight: bold; width: 180px; color: #6b7280; }
            .info-value { flex: 1; color: #111827; }
            .score-badge { display: inline-block; padding: 8px 16px; background: #10B981; color: white; border-radius: 20px; font-weight: bold; font-size: 18px; }
            .gaps-section { margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 New Quiz Lead Submission</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">AI Readiness Assessment Results</p>
            </div>
            
            <div class="info-box">
              <h2 style="margin-top: 0; color: #1E3A8A;">Contact Information</h2>
              <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">${name}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Company:</span>
                <span class="info-value">${company}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value"><a href="mailto:${email}">${email}</a></span>
              </div>
              ${
                mobile
                  ? `
              <div class="info-row">
                <span class="info-label">Mobile:</span>
                <span class="info-value"><a href="tel:${mobile}">${mobile}</a></span>
              </div>
              `
                  : ""
              }
            </div>

            <div class="info-box">
              <h2 style="margin-top: 0; color: #1E3A8A;">Assessment Results</h2>
              <div class="info-row">
                <span class="info-label">AI Readiness Score:</span>
                <span class="info-value"><span class="score-badge">${score}%</span></span>
              </div>
              <div class="info-row">
                <span class="info-label">Total Hours Wasted/Week:</span>
                <span class="info-value" style="color: #EF4444; font-weight: bold;">${totalHoursWasted} hours</span>
              </div>
              <div class="info-row">
                <span class="info-label">Annual Potential Savings:</span>
                <span class="info-value" style="color: #10B981; font-weight: bold;">$${((totalHoursWasted * 52 * 50) / 1000).toFixed(0)}K</span>
              </div>
            </div>

            <div class="gaps-section">
              <h2 style="color: #1E3A8A;">Top Priority Gaps Identified</h2>
              ${gapsHTML}
            </div>

            <div style="margin-top: 30px; padding: 20px; background: #F3F4F6; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #6B7280; font-size: 14px;">
                📅 Follow up within 24 hours for best conversion rate
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("❌ Resend API error:", error);
      res.status(400).json({
        success: false,
        error: error.message || "Resend API error",
        details: error,
      });
      return;
    }

    console.log("✅ Quiz results email sent successfully:", data);
    res.status(200).json({
      success: true,
      message: "Results sent successfully",
      emailId: data?.id,
    });
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Failed to send email",
    });
  }
}
