import React from "react";
import { motion } from "framer-motion";
import SectionTag from "../ui/SectionTag";
import { TestimonialCard } from "../ui/testimonial-card";

const TestimonialsSection = ({ t }) => {
  const testimonials = t("testimonials");

  // Map translations data to testimonial card format
  const cards = testimonials.map((item) => ({
    author: {
      name: item.userName,
      handle: item.handle || `@${item.userName.replace(/\s+/g, "").toLowerCase()}`,
      avatar: item.avatar || "",
    },
    text: item.review,
    designation: item.designation,
  }));

  return (
    <section
      className="relative py-24 md:py-32 px-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04050d 0%, #060810 50%, #04050d 100%)" }}
    >
      <div className="absolute inset-0 hud-grid opacity-20" />
      <div
        className="radial-blob w-[500px] h-[500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "rgba(0,245,255,0.03)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <SectionTag zone="ZONE 05.5" label="CLIENT SIGNALS" color="cyan" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4"
            style={{
              background: "linear-gradient(135deg, #00f5ff, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("testimonialsTitle")}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t("testimonialsSubtitle")}
          </p>
        </motion.div>
      </div>

      {/* Marquee testimonials - full width, no horizontal padding */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <div
          className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]"
        >
          <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
            {[...Array(4)].map((_, setIndex) =>
              cards.map((card, i) => (
                <TestimonialCard
                  key={`${setIndex}-${i}`}
                  author={card.author}
                  text={card.text}
                />
              ))
            )}
          </div>
        </div>

        {/* Gradient fade edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 sm:block"
          style={{ background: "linear-gradient(to right, #04050d, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 sm:block"
          style={{ background: "linear-gradient(to left, #04050d, transparent)" }}
        />
      </div>
    </section>
  );
};

export default TestimonialsSection;
