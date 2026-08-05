import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const liquidbuttonVariants = cva(
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:scale-105 duration-300 transition text-white",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 text-xs px-4",
        lg: "h-10 px-6",
        xl: "h-12 px-8",
        xxl: "h-14 px-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xxl",
    },
  }
);

export function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        "relative",
        liquidbuttonVariants({ variant, size, className })
      )}
      {...props}
    >
      <div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-full transition-all"
        style={{
          boxShadow: "0 8px 20px rgba(47,94,236,0.25)",
          background: "linear-gradient(135deg, #2f5eec 0%, #7c5cfc 100%)",
        }}
      />
      <div className="pointer-events-none z-10 relative flex items-center gap-2">{children}</div>
    </Comp>
  );
}
