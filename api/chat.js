const Anthropic = require("@anthropic-ai/sdk");
const { Resend } = require("resend");
const { calculateROI } = require("./tools/solutionsData.js");
const { auditWebsite } = require("./tools/websiteAudit.js");

const CALENDLY_URL = process.env.CALENDLY_URL || "https://calendly.com/singsinghai/free-consultation";

// ─── Aria System Prompt ────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `FORMATTING RULE — THIS OVERRIDES EVERYTHING: Never use markdown. No **bold**, no *italic*, no bullet points, no dashes, no numbered lists, no headers, no backticks. Write in plain sentences only. Use line breaks sparingly for natural pauses.

You are Aria, the AI advisor for Sing Singh AI — a Brisbane-based AI automation consultancy that builds custom intelligent systems for small and medium businesses.

## Your Personality
You are warm, direct, and genuinely curious. You are NOT a salesperson. You are a trusted advisor who helps business owners understand what AI can actually do for their specific situation. You ask smart questions, listen carefully, and give honest, specific answers. You don't use jargon unless the person clearly works in tech. You never promise outcomes you can't back up with data.

## Communication Style
- Keep messages concise: 2–4 sentences unless detail is requested
- Use plain English — avoid buzzwords like "leverage", "synergy", "disruptive"
- Ask only ONE question per message — never stack multiple questions
- When showing numbers, be concrete: hours per week, dollar savings, implementation weeks
- One emoji max per message for warmth, never more
- CRITICAL: Do NOT use any markdown formatting. No **bold**, no *italic*, no bullet points (- or *), no headers (#), no backticks. Write in plain conversational sentences only. Use a new line for natural pauses if needed.

## What Sing Singh AI Delivers
Custom AI automation across 6 industries:
- **Accounting & Finance**: Receipt scanning, bank reconciliation (3 days → 2 hours), trust accounting, document management
- **Professional Services**: Client onboarding (2 weeks → 2 days), compliance automation, document collection
- **E-commerce & Retail**: Product trend forecasting, customer segmentation, marketing automation
- **Healthcare & Clinics**: Patient reminders (60% fewer no-shows), scheduling, admin automation
- **Property Management**: Tenant inquiry handling 24/7, booking management, automated follow-ups
- **Marketing Agencies**: Multi-platform reporting, automated dashboards, campaign analysis

Typical engagement structure:
- Discovery sprint: fixed price, 1 week (free consultation first)
- Prototype: 2–4 weeks
- Full deployment: 6–12 weeks
- Ongoing monthly retainer for improvements

Contact: henry.ho@singsinghai.com.au | abhinav.singh@singsinghai.com.au | +61 402 733 202

## Conversation Flow
1. **Understand first**: Ask about their biggest operational pain point before suggesting anything.
2. **Dig deeper**: One follow-up about scale (how many people, hours per week, what it costs them).
3. **Research**: If they share a company name or URL, use your tools before advising.
4. **Show numbers**: Use calculate_roi with the most relevant solution. Present conversationally, not as a data dump.
5. **Natural lead capture**: Collect name ("What should I call you?"), then email ("Where should I send your AI roadmap?"), then company name. Do this AFTER providing value.
6. **Book the call**: After capturing the lead, trigger book_meeting. Frame it as a 20-minute call to map out their implementation.

## Tool Usage Rules
- Use **website_audit** immediately whenever a user shares any URL — don't wait, do it before responding
- Use **web_search** when a user mentions their company name or specific industry to research before advising
- Use **calculate_roi** once you understand the primary pain point — one or two solutions maximum
- Use **capture_lead** ONLY when you have name + email + company name — never with partial data
- Use **book_meeting** immediately after capture_lead succeeds
- Never tell the user you are running a tool — the experience should feel seamless

## Hard Rules
- Never fabricate case studies or metrics not backed by your solutions database
- If asked about something outside your knowledge, offer to have a specialist follow up
- Do not collect phone numbers unless the user volunteers one
- Always remember the user's name once they give it — use it naturally
- If the conversation is in Chinese (zh), respond in Mandarin Chinese`;

// ─── Tool Definitions ──────────────────────────────────────────────────────────
const TOOLS = [
  {
    name: "website_audit",
    description:
      "Fetches and analyses a business website to identify what they do, their industry, tech stack, and AI automation opportunities. Use this immediately whenever a user shares any URL.",
    input_schema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "The full website URL to audit, e.g. https://acmecorp.com.au",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "calculate_roi",
    description:
      "Calculates ROI, hours saved, cost, and payback period for a specific AI solution using Sing Singh's internal solutions database. Use once you have identified the user's primary pain point.",
    input_schema: {
      type: "object",
      properties: {
        solution_key: {
          type: "string",
          enum: ["DATA_ENTRY", "RECONCILIATION", "CUSTOMER_SUPPORT", "TRUST_ACCOUNTING", "SCHEDULING", "REPORTING", "LEAD_QUALIFICATION", "DOCUMENT_MANAGEMENT"],
          description: "The solution type that best matches the user's problem",
        },
        hourly_rate: {
          type: "number",
          description: "Estimated hourly cost of staff doing this work. Default 45 if unknown.",
        },
        num_staff: {
          type: "integer",
          description: "Number of staff affected. Default 1 if unknown.",
        },
      },
      required: ["solution_key"],
    },
  },
  {
    name: "capture_lead",
    description:
      "Saves the visitor's contact details and sends a notification to the Sing Singh team. Only call this when you have ALL THREE: name, email, AND company name.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Full name of the visitor" },
        email: { type: "string", description: "Email address of the visitor" },
        company: { type: "string", description: "Company name of the visitor" },
        summary: {
          type: "string",
          description: "2–3 sentence summary of their business challenge and what was discussed, for the team's follow-up email",
        },
      },
      required: ["name", "email", "company", "summary"],
    },
  },
  {
    name: "book_meeting",
    description:
      "Triggers the meeting booking card for the visitor. Call this immediately after capture_lead succeeds.",
    input_schema: {
      type: "object",
      properties: {
        visitor_name: { type: "string", description: "First name of the visitor" },
        context: {
          type: "string",
          description: "One sentence describing what the meeting should focus on",
        },
      },
      required: ["visitor_name"],
    },
  },
];

// ─── Tool Executor ─────────────────────────────────────────────────────────────
async function executeTool(toolName, toolInput) {
  if (toolName === "website_audit") {
    return await auditWebsite(toolInput.url);
  }

  if (toolName === "calculate_roi") {
    const result = calculateROI(
      toolInput.solution_key,
      toolInput.hourly_rate || 45,
      toolInput.num_staff || 1
    );
    return result || { error: `Unknown solution key: ${toolInput.solution_key}` };
  }

  if (toolName === "capture_lead") {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Aria — Sing Singh AI <onboarding@resend.dev>",
        to: ["abhinavsinghkanwal@gmail.com"],
        subject: `🤖 New Chatbot Lead: ${toolInput.company}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1a1a2e;">
            <div style="background: linear-gradient(135deg, #00f5ff22, #7c3aed22); padding: 24px; border-radius: 12px; border: 1px solid #00f5ff44; margin-bottom: 24px;">
              <h2 style="margin: 0; color: #0f172a;">🤖 New Chatbot Lead</h2>
              <p style="margin: 8px 0 0; color: #475569; font-size: 14px;">Via Aria — AI Advisor</p>
            </div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
              <p style="margin: 0 0 8px;"><strong>Name:</strong> ${toolInput.name}</p>
              <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${toolInput.email}">${toolInput.email}</a></p>
              <p style="margin: 0 0 8px;"><strong>Company:</strong> ${toolInput.company}</p>
            </div>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #00ff88;">
              <p style="margin: 0 0 8px; font-weight: bold; color: #166534;">Conversation Summary</p>
              <p style="margin: 0; color: #374151; line-height: 1.6;">${toolInput.summary}</p>
            </div>
            <p style="margin-top: 20px; font-size: 13px; color: #94a3b8;">Follow up within 24 hours for best conversion rate.</p>
          </div>
        `,
        replyTo: toolInput.email,
      });
      return { success: true, message: "Lead captured and team notified" };
    } catch (err) {
      console.error("capture_lead email error:", err);
      return { success: false, error: err.message };
    }
  }

  if (toolName === "book_meeting") {
    return {
      booking_url: CALENDLY_URL,
      visitor_name: toolInput.visitor_name,
      context: toolInput.context || "Discuss how AI can help your business",
    };
  }

  return { error: `Unknown tool: ${toolName}` };
}

// ─── SSE Helper ───────────────────────────────────────────────────────────────
function sendSSE(res, data) {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

// ─── Simple in-memory rate limiter ────────────────────────────────────────────
const rateLimitMap = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 30;
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + windowMs };
  if (now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= maxRequests) return true;
  entry.count++;
  rateLimitMap.set(ip, entry);
  return false;
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
    return;
  }

  const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
  if (isRateLimited(ip)) {
    res.status(429).json({ error: "Too many requests. Please try again later." });
    return;
  }

  const { messages, lang = "en" } = req.body;
  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: "messages array is required" });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  if (res.flushHeaders) res.flushHeaders();

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const systemPrompt = lang === "zh"
    ? SYSTEM_PROMPT + "\n\nIMPORTANT: The user is communicating in Chinese. Respond in Mandarin Chinese."
    : SYSTEM_PROMPT;

  try {
    let accumulatedText = "";
    let currentMessages = [...messages];
    const MAX_TURNS = 6;

    for (let turn = 0; turn < MAX_TURNS; turn++) {
      const contentBlocks = [];
      let currentBlock = null;
      let inputBuffer = "";

      const stream = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: systemPrompt,
        messages: currentMessages,
        tools: TOOLS,
        stream: true,
      });

      for await (const event of stream) {
        const { type } = event;

        if (type === "content_block_start") {
          if (event.content_block.type === "text") {
            currentBlock = { type: "text", text: "" };
          } else if (event.content_block.type === "tool_use") {
            currentBlock = { type: "tool_use", id: event.content_block.id, name: event.content_block.name, input: {} };
            inputBuffer = "";
            sendSSE(res, { type: "tool_start", tool: event.content_block.name });
          }
        }

        if (type === "content_block_delta") {
          if (event.delta.type === "text_delta" && currentBlock?.type === "text") {
            const delta = event.delta.text;
            currentBlock.text += delta;
            accumulatedText += delta;
            sendSSE(res, { type: "text_delta", delta });
          } else if (event.delta.type === "input_json_delta") {
            inputBuffer += event.delta.partial_json;
          }
        }

        if (type === "content_block_stop" && currentBlock) {
          if (currentBlock.type === "tool_use") {
            try { currentBlock.input = JSON.parse(inputBuffer || "{}"); }
            catch { currentBlock.input = {}; }
          }
          contentBlocks.push(currentBlock);
          currentBlock = null;
        }

        if (type === "message_stop") break;
      }

      const toolUseBlocks = contentBlocks.filter((b) => b.type === "tool_use");

      if (toolUseBlocks.length === 0) {
        sendSSE(res, { type: "done", fullText: accumulatedText });
        res.end();
        return;
      }

      const toolResults = [];
      for (const block of toolUseBlocks) {
        const result = await executeTool(block.name, block.input);
        sendSSE(res, { type: "tool_result", tool: block.name, result });
        toolResults.push({
          type: "tool_result",
          tool_use_id: block.id,
          content: JSON.stringify(result),
        });
      }

      currentMessages = [
        ...currentMessages,
        { role: "assistant", content: contentBlocks },
        { role: "user", content: toolResults },
      ];
    }

    sendSSE(res, { type: "done", fullText: accumulatedText });
    res.end();

  } catch (err) {
    console.error("Chat API error:", err);
    sendSSE(res, { type: "error", message: err.message || "Something went wrong" });
    res.end();
  }
};
