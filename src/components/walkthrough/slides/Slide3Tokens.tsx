"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { WalkthroughSlide } from "../WalkthroughSlide";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface SlideProps {
  onNext: () => void;
}

const sampleTokens = [
  { text: "Rate", id: 15860, embedding: [0.023, -0.187, 0.941, 0.002, -0.456, 0.112, -0.089, 0.334] },
  { text: " this", id: 428, embedding: [-0.156, 0.234, 0.087, -0.912, 0.445, -0.067, 0.223, -0.189] },
  { text: " joke", id: 8756, embedding: [0.445, -0.023, 0.156, 0.789, -0.234, 0.567, -0.012, 0.890] },
  { text: " 1", id: 352, embedding: [-0.089, 0.445, -0.678, 0.123, 0.890, -0.345, 0.567, 0.012] },
  { text: "–", id: 2013, embedding: [0.234, -0.567, 0.890, -0.123, 0.456, 0.078, -0.901, 0.345] },
  { text: "10", id: 940, embedding: [-0.456, 0.789, 0.012, -0.345, 0.678, -0.901, 0.234, -0.567] },
  { text: ":", id: 25, embedding: [0.112, -0.890, 0.345, 0.678, -0.012, 0.456, -0.789, 0.123] },
  { text: ' "', id: 366, embedding: [-0.234, 0.567, -0.890, 0.123, -0.456, 0.789, 0.012, -0.345] },
  { text: "Why", id: 5765, embedding: [0.678, -0.012, 0.345, -0.678, 0.901, -0.234, 0.567, 0.890] },
  { text: " did", id: 863, embedding: [-0.123, 0.456, -0.789, 0.012, -0.345, 0.678, -0.901, 0.234] },
  { text: " the", id: 262, embedding: [0.345, -0.678, 0.901, -0.234, 0.567, -0.890, 0.123, -0.456] },
  { text: " butt", id: 19379, embedding: [-0.567, 0.890, -0.123, 0.456, -0.789, 0.012, -0.345, 0.678] },
  { text: " poop", id: 41583, embedding: [0.789, -0.012, 0.345, -0.678, 0.901, -0.234, 0.567, -0.890] },
  { text: "?", id: 30, embedding: [-0.890, 0.123, -0.456, 0.789, -0.012, 0.345, -0.678, 0.901] },
  { text: ' Because', id: 4362, embedding: [0.012, -0.345, 0.678, -0.901, 0.234, -0.567, 0.890, -0.123] },
  { text: " stinky", id: 36338, embedding: [-0.234, 0.567, -0.890, 0.123, -0.456, 0.789, -0.012, 0.345] },
  { text: '!"', id: 2474, embedding: [0.456, -0.789, 0.012, -0.345, 0.678, -0.901, 0.234, -0.567] },
];

export function Slide3Tokens({ onNext }: SlideProps) {
  const [hoveredToken, setHoveredToken] = useState<number | null>(null);

  return (
    <WalkthroughSlide>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          Your words get encoded.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
        >
          Text is broken into tokens, and each token becomes a vector.
        </motion.p>

        {/* Token hover interaction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-card/50 border border-border rounded-xl p-6 sm:p-8 mb-6"
        >
          <div className="text-left mb-4 text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/15 text-[11px] font-bold text-blue-200">
              ?
            </span>
            Hover any word to see its token id and embedding (example)
          </div>
          <TooltipProvider delayDuration={0}>
            <div className="flex flex-wrap items-center gap-0.5 font-mono text-lg">
              {sampleTokens.map((token, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <motion.span
                      onMouseEnter={() => setHoveredToken(i)}
                      onMouseLeave={() => setHoveredToken(null)}
                      className={`cursor-pointer px-0.5 py-1 rounded transition-colors ${
                        hoveredToken === i
                          ? "bg-blue-500/30 text-blue-300"
                          : "hover:bg-secondary"
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {token.text}
                    </motion.span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs p-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">token_id:</span>
                        <span className="font-mono text-sm">{token.id}</span>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">embedding (8-dim example):</span>
                        <div className="font-mono text-xs mt-1 text-blue-400">
                          [{token.embedding.map(v => v.toFixed(3)).join(", ")}]
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-muted-foreground/50 italic mb-8"
        >
          (example values—not from a real model)
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 inline-flex"
        >
          <Button variant="secondary" size="lg" onClick={onNext} className="shadow-md">
            Continue
          </Button>
        </motion.div>
      </div>
    </WalkthroughSlide>
  );
}
