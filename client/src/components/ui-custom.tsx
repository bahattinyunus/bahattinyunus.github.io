import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

// Glitch Text Effect Component
export const GlitchText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={cn("relative inline-block group", className)}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-destructive opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
    </div>
  );
};

// Hexagon Badge Component
export const HexBadge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn(
      "relative px-4 py-1 text-xs font-mono uppercase tracking-wider text-primary-foreground bg-primary/20 border border-primary/50 backdrop-blur-sm clip-path-hexagon hover:bg-primary/30 transition-colors cursor-default",
      className
    )}>
      {children}
    </div>
  );
};

// Cyber Card Component
export const CyberCard = ({ children, className, hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.01, boxShadow: "0 0 20px rgba(0, 240, 255, 0.1)" } : {}}
      className={cn(
        "relative bg-card/50 border border-border/50 backdrop-blur-md overflow-hidden rounded-lg p-6",
        "before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:border-t-2 before:border-l-2 before:border-primary before:content-['']",
        "after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2 after:border-b-2 after:border-r-2 after:border-primary after:content-['']",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// Section Header
export const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <div className="mb-12 relative">
      <div className="flex items-center gap-4 mb-2">
        <div className="h-[1px] w-12 bg-primary/50"></div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground uppercase tracking-tight">
          <GlitchText text={title} />
        </h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
      </div>
      {subtitle && (
        <p className="text-muted-foreground font-mono text-sm md:text-base pl-16 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
