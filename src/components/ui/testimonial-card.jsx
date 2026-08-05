import React from "react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

export function TestimonialCard({ author, text, href, className }) {
  const Card = href ? "a" : "div";

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-2xl",
        "p-6 text-start",
        "transition-colors duration-300",
        "max-w-[320px]",
        className
      )}
      style={{
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.08)",
      }}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback
            className="font-bold text-sm"
            style={{
              background: "#eef4ff",
              border: "1px solid rgba(47,94,236,0.25)",
              color: "#2f5eec",
            }}
          >
            {author.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-semibold leading-none text-ink">
            {author.name}
          </h3>
          <p className="text-xs mt-1" style={{ color: "#2f5eec" }}>
            {author.handle}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-500">
        {text}
      </p>
    </Card>
  );
}
