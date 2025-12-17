"use client";

import { motion } from "framer-motion";
import { WalkthroughSlide } from "../WalkthroughSlide";
import { NumberStream } from "@/components/shared/NumberStream";

interface SlideProps {
  onNext: () => void;
}

export function Slide2Numbers({ onNext }: SlideProps) {
  return (
    <WalkthroughSlide>
      <div className="max-w-3xl mx-auto text-center cursor-pointer" onClick={onNext}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          AI is all numbers.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto"
        >
          A model is a huge set of learned parameters—just values adjusted by training.
        </motion.p>

        {/* Vector animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-card/50 border border-border rounded-xl p-8 mb-8"
        >
          <div className="font-mono text-sm text-muted-foreground mb-4">
            model_weights =
          </div>
          <div className="overflow-hidden h-24">
            <NumberStream count={30} className="text-lg" />
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-muted-foreground/60">...</span>
            <span className="font-mono text-sm bg-secondary px-3 py-1 rounded">
              ≈ billions of parameters
            </span>
            <span className="text-muted-foreground/60">...</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-muted-foreground/60"
        >
          Click to continue
        </motion.p>
      </div>
    </WalkthroughSlide>
  );
}
