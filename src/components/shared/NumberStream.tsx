"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NumberStreamProps {
  className?: string;
  count?: number;
}

export function NumberStream({ className = "", count = 20 }: NumberStreamProps) {
  const nextIdRef = useRef(0);
  const [numbers, setNumbers] = useState<Array<{ id: number; value: string }>>([]);

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
    nextIdRef.current = 0;
    const initial = Array.from({ length: count }, () => ({
      id: nextIdRef.current++,
      value: generateNumber(),
    }));
    setNumbers(initial);

    // Update numbers periodically
    const interval = setInterval(() => {
      setNumbers((prev) =>
        prev.map((n) =>
          Math.random() > 0.7
            ? { ...n, value: generateNumber(), id: nextIdRef.current++ }
            : n
        )
      );
    }, 100);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className={`font-mono text-xs text-muted-foreground/70 overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout">
        {numbers.map((n) => (
          <motion.span
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="inline-block mx-1"
            style={{ position: "relative" }}
          >
            {n.value}
          </motion.span>
        ))}
      </AnimatePresence>
      <span className="text-muted-foreground/40"> ...</span>
    </div>
  );
}
