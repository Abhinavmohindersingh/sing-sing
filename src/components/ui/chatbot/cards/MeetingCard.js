import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";

const MeetingCard = ({ data }) => {
  const { booking_url, visitor_name, context } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
      className="rounded-xl overflow-hidden w-full"
      style={{
        background: "linear-gradient(135deg, rgba(0,245,255,0.05), rgba(124,58,237,0.05))",
        border: "1px solid rgba(0,245,255,0.2)",
        boxShadow: "0 0 30px rgba(0,245,255,0.05)",
      }}
    >
      <div className="p-4 flex flex-col items-center text-center gap-3">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))",
            border: "1px solid rgba(0,245,255,0.3)",
            boxShadow: "0 0 20px rgba(0,245,255,0.15)",
          }}
        >
          <Calendar size={20} style={{ color: "#00f5ff" }} />
        </div>

        {/* Text */}
        <div>
          <p className="text-white font-semibold text-sm leading-tight mb-1">
            {visitor_name ? `${visitor_name}, let's map this out` : "Book Your Free Consultation"}
          </p>
          {context && (
            <p className="text-slate-400 text-xs leading-relaxed">{context}</p>
          )}
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={() => window.open(booking_url, "_blank", "noopener,noreferrer")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, #00f5ff, #7c3aed)",
            boxShadow: "0 0 20px rgba(0,245,255,0.25)",
          }}
        >
          Book 20 min with our team
          <ArrowRight size={15} />
        </motion.button>

        {/* Tagline */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono" style={{ color: "rgba(0,245,255,0.35)" }}>
          <Clock size={10} />
          No commitment · Usually same week
        </div>
      </div>
    </motion.div>
  );
};

export default MeetingCard;
