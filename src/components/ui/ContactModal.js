import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, CheckCircle, ArrowRight } from "lucide-react";
import NeonButton from "./NeonButton";

const ContactModal = ({ isOpen, onClose, lang, t }) => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send");
      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(() => { onClose(); setStatus(null); }, 2500);
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = "w-full px-4 py-3 rounded-lg text-sm text-ink placeholder-slate-400 focus:outline-none transition-all duration-200";
  const inputStyle = { background: "#f8f9fd", border: "1px solid rgba(15,23,42,0.1)" };
  const inputFocusStyle = { borderColor: "rgba(47,94,236,0.5)", boxShadow: "0 0 0 2px rgba(47,94,236,0.12)" };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-2xl relative"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(15,23,42,0.08)",
                boxShadow: "0 20px 60px rgba(15,23,42,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: "1px solid rgba(15,23,42,0.08)" }}
              >
                <span className="font-mono text-xs font-bold text-slate-400" style={{ letterSpacing: "0.2em" }}>
                  GET IN TOUCH
                </span>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ color: "#94a3b8" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#2f5eec")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                {/* Icon + title */}
                <div className="text-center mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: "#eef4ff",
                      border: "1px solid rgba(47,94,236,0.25)",
                    }}
                  >
                    <Mail size={24} style={{ color: "#2f5eec" }} />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-ink mb-2">{t("contactTitle")}</h2>
                  <p className="text-slate-500 text-sm">{t("contactDescription")}</p>
                </div>

                {/* Status messages */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 rounded-lg"
                      style={{ background: "#eafaf3", border: "1px solid rgba(14,165,112,0.3)" }}
                    >
                      <CheckCircle size={18} style={{ color: "#0ea570" }} />
                      <p className="text-sm" style={{ color: "#0ea570" }}>{t("contactSuccess")}</p>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 rounded-lg"
                      style={{ background: "#fef3e2", border: "1px solid rgba(217,119,6,0.3)" }}
                    >
                      <X size={18} style={{ color: "#b45309" }} />
                      <p className="text-sm" style={{ color: "#b45309" }}>{t("contactError")}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Fields */}
                <div className="space-y-3">
                  {[
                    { name: "name", placeholder: t("contactName"), type: "text", required: true },
                    { name: "email", placeholder: t("contactEmail"), type: "email", required: true },
                    { name: "company", placeholder: t("contactCompany"), type: "text", required: true },
                  ].map((field) => (
                    <input
                      key={field.name}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      className={inputClass}
                      style={inputStyle}
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                    />
                  ))}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contactMessage")}
                    required
                    rows={4}
                    className={inputClass + " resize-none"}
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                </div>

                <NeonButton
                  type="submit"
                  variant="filled"
                  color="cyan"
                  size="md"
                  disabled={isSubmitting || status === "success"}
                  className="w-full"
                >
                  {isSubmitting ? t("contactSending") : (
                    <>
                      {t("contactSubmit")}
                      <ArrowRight size={16} />
                    </>
                  )}
                </NeonButton>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
