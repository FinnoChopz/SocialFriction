"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WalkthroughSlide } from "../WalkthroughSlide";

interface SlideProps {
  onNext: () => void;
  onSkip: () => void;
}

export function Slide1Welcome({ onNext, onSkip }: SlideProps) {
  return (
    <WalkthroughSlide>
      <div className="max-w-2xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl sm:text-6xl font-bold mb-6"
        >
          Welcome.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-muted-foreground mb-12"
        >
          This is a brief tour of what an AI &quot;conversation&quot; actually is, under the hood.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <Button 
              size="lg" 
              onClick={onNext} 
              className="min-w-[160px] shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-shadow duration-500"
            >
              Continue
            </Button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
              <span>←</span>
              <span>Click here to start</span>
            </div>
          </div>
          
          <Button size="sm" variant="ghost" onClick={onSkip} className="text-muted-foreground">
            Skip Entire Intro
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-muted-foreground/60"
        >
          Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">Esc</kbd> to skip
        </motion.p>
      </div>
    </WalkthroughSlide>
  );
}
