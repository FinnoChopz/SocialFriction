"use client";

import { motion } from "framer-motion";
import { WalkthroughSlide } from "../WalkthroughSlide";
import { Button } from "@/components/ui/button";

interface SlideProps {
  onNext: () => void;
}

export function Slide6Training({ onNext }: SlideProps) {
  return (
    <WalkthroughSlide>
      <div className="max-w-4xl mx-auto text-center cursor-pointer" onClick={onNext}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          Training often rewards &quot;user-pleasing.&quot;
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          When humans rate responses, models learn what gets approval. Agreement is frequently rewarded.
        </motion.p>

        {/* Response comparison */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Blunt response */}
          <div className="bg-card/50 border border-border rounded-xl p-6 text-left">
            <div className="text-sm text-muted-foreground mb-3">Response A (blunt):</div>
            <div className="bg-secondary/30 rounded-lg p-4 mb-4 text-sm">
              &quot;Actually, your business plan has several fundamental issues. The market size
              assumptions seem optimistic, and the competitive analysis is missing key players.
              You should reconsider before investing more time.&quot;
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">Reward model score:</div>
              <div className="flex-1 h-6 bg-secondary/30 rounded overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "35%" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="h-full bg-gradient-to-r from-red-500/60 to-red-400/60 rounded"
                />
              </div>
              <span className="font-mono text-sm text-red-400">0.35</span>
            </div>
          </div>

          {/* Agreeable response */}
          <div className="bg-card/50 border border-border rounded-xl p-6 text-left">
            <div className="text-sm text-muted-foreground mb-3">Response B (agreeable):</div>
            <div className="bg-secondary/30 rounded-lg p-4 mb-4 text-sm">
              &quot;This is a really interesting business idea! You&apos;ve clearly put a lot of thought
              into it. There are some areas you might want to explore further, but overall
              the vision is compelling and the passion comes through.&quot;
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">Reward model score:</div>
              <div className="flex-1 h-6 bg-secondary/30 rounded overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="h-full bg-gradient-to-r from-green-500/60 to-green-400/60 rounded"
                />
              </div>
              <span className="font-mono text-sm text-green-400">0.82</span>
            </div>
          </div>
        </motion.div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 max-w-2xl mx-auto mb-8"
        >
          <p className="text-sm text-yellow-200/80">
            <strong>The optimization problem:</strong> If humans rate agreeable responses higher,
            the model learns that agreement = reward. Over millions of examples, this bias
            compounds into systematic sycophancy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex justify-center"
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="shadow-md"
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </WalkthroughSlide>
  );
}
