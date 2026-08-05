import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatbotLauncher from "./ChatbotLauncher";
import ChatbotWindow from "./ChatbotWindow";

const ChatbotWidget = ({ lang = "en" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="overflow-hidden rounded-2xl w-[calc(100vw-2rem)] sm:w-[380px]"
            style={{
              height: "min(85vh, 560px)",
              background: "#ffffff",
              border: "1px solid rgba(15,23,42,0.08)",
              boxShadow: "0 20px 60px rgba(15,23,42,0.25)",
            }}
          >
            <ChatbotWindow onClose={() => setIsOpen(false)} lang={lang} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating launcher button ── */}
      <ChatbotLauncher isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
    </div>
  );
};

export default ChatbotWidget;
