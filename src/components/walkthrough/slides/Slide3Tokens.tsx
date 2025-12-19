"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { WalkthroughSlide } from "../WalkthroughSlide";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { formatToyEmbeddingInt, TOY_JOKE_RATING_TOKENS } from "@/components/walkthrough/toyJokeRatingExample";

interface SlideProps {
  onNext: () => void;
}

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10 max-w-2xl mx-auto bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border/50 relative z-10 shadow-sm"
        >
          <p className="text-lg text-foreground leading-relaxed">
            Text is turned into things called “tokens”. A token is just a list, or string, of numbers, that the model can use to identify a word. For example, the token for the word “hello”, might be (0.278, -0.876, 0.982, -0.023, 0.172, 0.869, -0.012, 0.137).
            <br /><br />
            Each word has a unique list of numbers that identifies it--the token for the word “hi” would be different from the token for the word “hello”.
            <br /><br />
            This allows the model to process your text as numbers.
          </p>
        </motion.div>

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
              {TOY_JOKE_RATING_TOKENS.map((token, i) => (
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
                          [{token.embedding.map((v) => formatToyEmbeddingInt(v)).join(", ")}]
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
          className="mt-6 inline-flex items-center gap-4"
        >
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={onNext} 
            className="shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-shadow duration-500"
          >
            Continue
          </Button>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
            <span>←</span>
            <span>Click to proceed</span>
          </div>
        </motion.div>
      </div>
    </WalkthroughSlide>
  );
}
