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
        background: "rgba(8,8,15,0.9)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback
            className="font-bold text-sm"
            style={{
              background: "rgba(0,245,255,0.15)",
              border: "1px solid rgba(0,245,255,0.3)",
              color: "#00f5ff",
            }}
          >
            {author.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-semibold leading-none text-white">
            {author.name}
          </h3>
          <p className="text-xs mt-1" style={{ color: "rgba(0,245,255,0.7)" }}>
            {author.handle}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
        {text}
      </p>
    </Card>
  );
}
