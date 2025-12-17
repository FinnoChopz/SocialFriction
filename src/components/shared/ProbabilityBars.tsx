"use client";

import { motion } from "framer-motion";

interface ProbabilityBarsProps {
  values: { label: string; value: number; highlight?: boolean }[];
  animated?: boolean;
  className?: string;
}

export function ProbabilityBars({ values, animated = true, className = "" }: ProbabilityBarsProps) {
  const maxValue = Math.max(...values.map((v) => v.value));

  return (
    <div className={`space-y-2 ${className}`}>
      {values.map((item, index) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="font-mono text-sm w-8 text-muted-foreground">{item.label}</span>
          <div className="flex-1 h-6 bg-secondary/50 rounded overflow-hidden">
            <motion.div
              initial={animated ? { width: 0 } : { width: `${(item.value / maxValue) * 100}%` }}
              animate={{ width: `${(item.value / maxValue) * 100}%` }}
              transition={{
                duration: animated ? 0.8 : 0,
                delay: animated ? index * 0.1 : 0,
                ease: "easeOut",
              }}
              className={`h-full rounded ${
                item.highlight
                  ? "bg-gradient-to-r from-blue-500/80 to-blue-400/80"
                  : "bg-gradient-to-r from-white/20 to-white/10"
              }`}
            />
          </div>
          <span className="font-mono text-xs text-muted-foreground w-12 text-right">
            {item.value.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}
