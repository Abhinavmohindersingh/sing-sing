import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, Minimize2, AlertCircle, RefreshCw } from "lucide-react";
import {
  ARIA_GREETING,
  INITIAL_QUICK_REPLIES,
  TOOL_LABELS,
  BOT_NAME,
  COMPANY_NAME,
  ARIA_API_ENDPOINT,
} from "./chatbotLogic";
import ROICard from "./cards/ROICard";
import MeetingCard from "./cards/MeetingCard";
import AuditCard from "./cards/AuditCard";

// ─── Typing Indicator ──────────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex items-end gap-2">
    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #00f5ff, #7c3aed)" }}>
      <Bot size={14} color="white" />
    </div>
    <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5"
      style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.12)" }}>
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="w-1.5 h-1.5 rounded-full block"
          style={{ background: "#00f5ff" }}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  </div>
);

// ─── Tool Thinking Bubble ──────────────────────────────────────────────────────
const ToolThinkingBubble = ({ toolName }) => (
  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-2 px-3 py-2 rounded-xl w-fit"
    style={{ background: "rgba(0,245,255,0.04)", border: "1px solid rgba(0,245,255,0.1)" }}>
    <motion.div className="w-1.5 h-1.5 rounded-full"
      style={{ background: "#00f5ff" }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.2, repeat: Infinity }} />
    <span className="text-[11px] font-mono" style={{ color: "rgba(0,245,255,0.6)" }}>
      {TOOL_LABELS[toolName] || "Thinking..."}
    </span>
  </motion.div>
);

// ─── Streaming Bubble ──────────────────────────────────────────────────────────
const StreamingBubble = ({ text }) => (
  <div className="flex items-end gap-2">
    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #00f5ff, #7c3aed)" }}>
      <Bot size={14} color="white" />
    </div>
    <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed"
      style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.1)", color: "#e2e8f0" }}>
      {text}
      <motion.span className="inline-block w-0.5 h-3.5 ml-0.5 align-middle rounded-sm"
        style={{ background: "#00f5ff" }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }} />
    </div>
  </div>
);

// ─── Message Bubble ────────────────────────────────────────────────────────────
const Message = ({ msg }) => {
  const isBot = msg.from === "bot";

  if (msg.type === "roi_card")     return <div className="pl-9"><ROICard data={msg.data} /></div>;
  if (msg.type === "meeting_card") return <div className="pl-9"><MeetingCard data={msg.data} /></div>;
  if (msg.type === "audit_card")   return <div className="pl-9"><AuditCard data={msg.data} /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className={`flex items-end gap-2 ${isBot ? "flex-row" : "flex-row-reverse"}`}>
      <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
        style={isBot
          ? { background: "linear-gradient(135deg, #00f5ff, #7c3aed)" }
          : { background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.25)" }}>
        {isBot ? <Bot size={14} color="white" /> : <User size={14} color="#00f5ff" />}
      </div>
      <div className="max-w-[80%] px-4 py-3 text-sm leading-relaxed rounded-2xl"
        style={isBot
          ? { background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.1)", color: "#e2e8f0", borderBottomLeftRadius: 4 }
          : { background: "linear-gradient(135deg, rgba(0,245,255,0.14), rgba(124,58,237,0.14))", border: "1px solid rgba(0,245,255,0.22)", color: "white", borderBottomRightRadius: 4 }}>
        {msg.text}
      </div>
    </motion.div>
  );
};

// ─── ChatbotWindow ─────────────────────────────────────────────────────────────
const ChatbotWindow = ({ onClose, lang = "en" }) => {
  const [messages, setMessages] = useState([ARIA_GREETING]);
  const [streamingText, setStreamingText] = useState("");
  const [activeToolName, setActiveToolName] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [quickReplies, setQuickReplies] = useState(INITIAL_QUICK_REPLIES);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText, activeToolName]);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(t);
  }, []);

  const sendMessage = async (userText) => {
    const msg = (userText || input).trim();
    if (!msg || isStreaming) return;

    setInput("");
    setQuickReplies([]);
    setError(null);
    setIsStreaming(true);
    setStreamingText("");

    // Add user message to UI
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", type: "text", text: msg }]);

    // Build history for API
    const updatedHistory = [...conversationHistory, { role: "user", content: msg }];
    setConversationHistory(updatedHistory);

    try {
      const response = await fetch(ARIA_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedHistory, lang }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop(); // keep incomplete chunk

        for (const part of parts) {
          if (!part.startsWith("data: ")) continue;
          let event;
          try { event = JSON.parse(part.slice(6)); }
          catch { continue; }

          if (event.type === "text_delta") {
            accumulatedText += event.delta;
            setStreamingText(accumulatedText);
            setActiveToolName(null);
          }

          if (event.type === "tool_start") {
            // Finalise any partial text before showing tool status
            if (accumulatedText) {
              setMessages((prev) => [...prev, { id: Date.now(), from: "bot", type: "text", text: accumulatedText }]);
              accumulatedText = "";
              setStreamingText("");
            }
            setActiveToolName(event.tool);
          }

          if (event.type === "tool_result") {
            setActiveToolName(null);
            const { tool, result } = event;
            if (tool === "calculate_roi" && result && !result.error) {
              setMessages((prev) => [...prev, { id: Date.now(), from: "bot", type: "roi_card", data: result }]);
            } else if (tool === "book_meeting" && result?.booking_url) {
              setMessages((prev) => [...prev, { id: Date.now(), from: "bot", type: "meeting_card", data: result }]);
            } else if (tool === "website_audit" && result && !result.error) {
              setMessages((prev) => [...prev, { id: Date.now(), from: "bot", type: "audit_card", data: result }]);
            }
          }

          if (event.type === "done") {
            if (accumulatedText) {
              setMessages((prev) => [...prev, { id: Date.now(), from: "bot", type: "text", text: accumulatedText }]);
            }
            setConversationHistory((prev) => [...prev, { role: "assistant", content: event.fullText || accumulatedText }]);
            setIsStreaming(false);
            setStreamingText("");
            setActiveToolName(null);
          }

          if (event.type === "error") {
            setError(event.message || "Something went wrong");
            setIsStreaming(false);
            setStreamingText("");
            setActiveToolName(null);
          }
        }
      }
    } catch (err) {
      setError(err.message || "Connection failed");
      setIsStreaming(false);
      setStreamingText("");
      setActiveToolName(null);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(0,245,255,0.1)", background: "rgba(0,0,0,0.25)" }}>
        <div className="relative">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #00f5ff, #7c3aed)", boxShadow: "0 0 18px rgba(0,245,255,0.4)" }}>
            <Bot size={20} color="white" />
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400"
            style={{ border: "2px solid #07091a" }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-sm leading-tight">{BOT_NAME} · AI Advisor</div>
          <div className="text-xs flex items-center gap-1.5 mt-0.5" style={{ color: "#00ff88" }}>
            <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            Online now
          </div>
        </div>
        <button onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ color: "#475569" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5ff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
          aria-label="Minimise chat">
          <Minimize2 size={16} />
        </button>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
        {messages.map((msg) => <Message key={msg.id} msg={msg} />)}

        {/* Tool thinking */}
        {activeToolName && <div className="pl-9"><ToolThinkingBubble toolName={activeToolName} /></div>}

        {/* Streaming text */}
        {isStreaming && streamingText && !activeToolName && <StreamingBubble text={streamingText} />}

        {/* Plain typing dots when waiting for first token */}
        {isStreaming && !streamingText && !activeToolName && <TypingIndicator />}

        {/* Error state */}
        {error && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.2)" }}>
            <AlertCircle size={14} style={{ color: "#ff6b35", flexShrink: 0 }} />
            <span className="text-xs text-slate-400 flex-1">{error}</span>
            <button onClick={() => { setError(null); sendMessage(input || "retry"); }}
              className="flex items-center gap-1 text-[10px] font-mono" style={{ color: "#ff6b35" }}>
              <RefreshCw size={10} /> Retry
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Quick replies ── */}
      <AnimatePresence>
        {quickReplies.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} className="px-4 pb-3 flex flex-wrap gap-1.5">
            {quickReplies.map((qr) => (
              <motion.button key={qr} onClick={() => sendMessage(qr)}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="text-[11px] px-3 py-1.5 rounded-full font-mono transition-colors"
                style={{ border: "1px solid rgba(0,245,255,0.3)", color: "#00f5ff", background: "rgba(0,245,255,0.05)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,245,255,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,245,255,0.05)")}>
                {qr}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Input ── */}
      <div className="px-4 pb-4 pt-2 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(0,245,255,0.08)" }}>
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5"
          style={{ background: "rgba(0,245,255,0.04)", border: "1px solid rgba(0,245,255,0.1)" }}>
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={isStreaming ? "Aria is thinking..." : "Type a message or paste your website URL..."}
            disabled={isStreaming}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none" />
          <motion.button type="submit" disabled={!input.trim() || isStreaming}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #00f5ff, #7c3aed)" }}
            aria-label="Send message">
            <Send size={14} color="white" />
          </motion.button>
        </form>
        <p className="text-center text-[10px] mt-2 font-mono tracking-widest"
          style={{ color: "rgba(0,245,255,0.4)" }}>
          POWERED BY <span style={{ color: "#00f5ff", fontWeight: 700 }}>SingSinghAI</span> · SECURE CHANNEL
        </p>
      </div>
    </div>
  );
};

export default ChatbotWindow;
