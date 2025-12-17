"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { WalkthroughSlide } from "../WalkthroughSlide";

interface SlideProps {
  onNext: () => void;
}

const ratingProbs = [
  { label: "0", value: 0.01 },
  { label: "1", value: 0.02 },
  { label: "2", value: 0.05 },
  { label: "3", value: 0.12 },
  { label: "4", value: 0.15 },
  { label: "5", value: 0.18 },
  { label: "6", value: 0.14 },
  { label: "7", value: 0.21 },
  { label: "8", value: 0.08 },
  { label: "9", value: 0.03 },
  { label: "10", value: 0.01 },
];

export function Slide4Probabilities({ onNext }: SlideProps) {
  const [animationPhase, setAnimationPhase] = useState<"bars" | "sampling" | "selected">("bars");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase("sampling"), 2000);
    const timer2 = setTimeout(() => {
      setAnimationPhase("selected");
      setSelectedIndex(7); // Index of rating "7" (highest prob in our example)
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const maxValue = Math.max(...ratingProbs.map((r) => r.value));

  return (
    <WalkthroughSlide>
      <div className="max-w-3xl mx-auto text-center cursor-pointer" onClick={onNext}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          The model outputs probabilities.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
        >
          Before it answers, it holds a probability distribution over next tokens.
        </motion.p>

        {/* Probability visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-card/50 border border-border rounded-xl p-6 sm:p-8 mb-6"
        >
          <div className="text-left mb-6 text-sm text-muted-foreground">
            P(next token | &quot;Rate this joke 1-10: ...&quot;)
          </div>

          {/* Horizontal bars */}
          <div className="space-y-2">
            {ratingProbs.map((item, index) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="font-mono text-sm w-6 text-right text-muted-foreground">
                  {item.label}
                </span>
                <div className="flex-1 h-8 bg-secondary/30 rounded overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / maxValue) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.1 * index }}
                    className={`h-full rounded transition-colors duration-300 ${
                      animationPhase === "selected" && selectedIndex === index
                        ? "bg-gradient-to-r from-green-500 to-green-400"
                        : animationPhase === "sampling"
                        ? "bg-gradient-to-r from-blue-500/80 to-blue-400/80 animate-pulse"
                        : "bg-gradient-to-r from-white/30 to-white/20"
                    }`}
                  />
                  {animationPhase === "selected" && selectedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-green-300"
                    >
                      sampled ✓
                    </motion.div>
                  )}
                </div>
                <span className="font-mono text-xs text-muted-foreground w-12 text-right">
                  {(item.value * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>

          {/* Status indicator */}
          <div className="mt-6 text-center">
            {animationPhase === "bars" && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground"
              >
                Computing distribution...
              </motion.span>
            )}
            {animationPhase === "sampling" && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-blue-400"
              >
                Sampling from distribution...
              </motion.span>
            )}
            {animationPhase === "selected" && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-green-400"
              >
                Output: &quot;7&quot;
              </motion.span>
            )}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-muted-foreground/60"
        >
          Click to continue
        </motion.p>
      </div>
    </WalkthroughSlide>
  );
}
