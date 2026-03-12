import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const ChatbotLauncher = ({ isOpen, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    aria-label={isOpen ? "Close Aria chat" : "Chat with Aria"}
    className="relative flex items-center justify-center w-14 h-14 rounded-full"
    style={{
      background: "linear-gradient(135deg, #00f5ff, #7c3aed)",
      boxShadow: "0 0 30px rgba(0,245,255,0.4), 0 0 60px rgba(0,245,255,0.1), 0 8px 32px rgba(0,0,0,0.6)",
    }}
  >
    {/* Pulsing ring - only when closed */}
    {!isOpen && (
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ border: "2px solid rgba(0,245,255,0.5)" }}
        animate={{ scale: [1, 1.55, 1.55], opacity: [0.7, 0, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />
    )}

    {/* Icon swap */}
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
          key="close"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <X size={22} color="white" />
        </motion.div>
      ) : (
        <motion.div
          key="chat"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <MessageCircle size={22} color="white" />
        </motion.div>
      )}
    </AnimatePresence>

    {/* Green notification dot */}
    {!isOpen && (
      <motion.span
        className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-green-400"
        style={{ border: "2px solid #04050d" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    )}
  </motion.button>
);

export default ChatbotLauncher;
