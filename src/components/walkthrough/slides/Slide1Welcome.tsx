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
          This is a 30-second tour of what an AI &quot;conversation&quot; actually is.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" onClick={onNext} className="min-w-[160px]">
            Continue
          </Button>
          <Button size="lg" variant="ghost" onClick={onSkip} className="text-muted-foreground">
            Skip
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
