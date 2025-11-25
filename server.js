// ✅ Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sendContact = require("./api/send-contact");
const sendQuizResults = require("./api/send-quiz-results");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mount API routes
app.post("/api/send-contact", async (req, res) => {
  await sendContact(req, res);
});

app.post("/api/send-quiz-results", async (req, res) => {
  await sendQuizResults(req, res);
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(
    `Resend API Key loaded: ${process.env.RESEND_API_KEY ? "✅ Yes" : "❌ No"}`
  );
});
