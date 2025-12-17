"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NumberStreamProps {
  className?: string;
  count?: number;
}

export function NumberStream({ className = "", count = 20 }: NumberStreamProps) {
  const [numbers, setNumbers] = useState<{ id: number; value: string; x: number }[]>([]);

  useEffect(() => {
    const generateNumber = () => {
      const formats = [
        () => (Math.random() * 2 - 1).toFixed(4),
        () => Math.random().toFixed(6),
        () => `${(Math.random() * 10).toFixed(2)}e-${Math.floor(Math.random() * 5) + 1}`,
        () => (Math.random() > 0.5 ? "+" : "-") + Math.random().toFixed(3),
      ];
      return formats[Math.floor(Math.random() * formats.length)]();
    };

    // Initialize numbers
    const initial = Array.from({ length: count }, (_, i) => ({
      id: i,
      value: generateNumber(),
      x: Math.random() * 100,
    }));
    setNumbers(initial);

    // Update numbers periodically
    const interval = setInterval(() => {
      setNumbers((prev) =>
        prev.map((n) =>
          Math.random() > 0.7
            ? { ...n, value: generateNumber(), id: Date.now() + Math.random() }
            : n
        )
      );
    }, 100);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className={`font-mono text-xs text-muted-foreground/50 overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout">
        {numbers.map((n) => (
          <motion.span
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.5, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="inline-block mx-1"
            style={{ position: "relative" }}
          >
            {n.value}
          </motion.span>
        ))}
      </AnimatePresence>
      <span className="text-muted-foreground/30"> ...</span>
    </div>
  );
}
