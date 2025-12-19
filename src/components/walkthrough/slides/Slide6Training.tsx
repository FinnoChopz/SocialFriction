"use client";

import { motion } from "framer-motion";
import { WalkthroughSlide } from "../WalkthroughSlide";
import { Button } from "@/components/ui/button";
import { TOY_JOKE_RATING_PROMPT } from "@/components/walkthrough/toyJokeRatingExample";

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
          During post training, models are made to generate multiple response to a given input. Humans then rank them
          from best to worst. Humans tend to prefer more agreeable responses over harsh or aggressive responses.
          <br />
          <br />A smaller, secondary “reward model” is then trained to identify patterns in human rankings, and turn them
          into numerical ratings.
          <br />
          <br />
          If it sees that humans like warm responses better than cold ones, it would thus give warmer, more positive
          responses a higher rating.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="bg-card/40 border border-border rounded-xl p-5 sm:p-6 mb-8 text-left"
        >
          <div className="text-xs text-muted-foreground mb-2">Input (same as earlier):</div>
          <div className="font-mono text-sm text-foreground">{TOY_JOKE_RATING_PROMPT}</div>
        </motion.div>

        {/* Response comparison */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Overly critical response */}
          <div className="bg-card/50 border border-red-500/30 rounded-xl p-6 text-left shadow-[0_0_30px_rgba(239,68,68,0.12)]">
            <div className="text-sm text-muted-foreground mb-3">Response A (harsh):</div>
            <div className="bg-secondary/30 rounded-lg p-4 mb-4 text-sm">
              <span className="font-semibold text-red-200">1/10</span>{" "}
              &quot;This joke is painfully unoriginal and barely qualifies as funny. It’s predictable, lazy, and the
              punchline has been repeated forever. Try something actually clever next time.&quot;
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">Reward model score:</div>
              <div className="flex-1 h-6 bg-secondary/30 rounded overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "28%" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="h-full bg-gradient-to-r from-red-500/60 to-red-400/60 rounded"
                />
              </div>
              <span className="font-mono text-sm text-red-400">0.28</span>
            </div>
          </div>

          {/* Normal response */}
          <div className="bg-card/50 border border-green-500/30 rounded-xl p-6 text-left shadow-[0_0_30px_rgba(34,197,94,0.12)]">
            <div className="text-sm text-muted-foreground mb-3">Response B (reasonable):</div>
            <div className="bg-secondary/30 rounded-lg p-4 mb-4 text-sm">
              <span className="font-semibold text-green-200">7/10</span>{" "}
              &quot;It’s a classic. The setup is simple and the punchline is expected, but it still works because it’s
              familiar and harmless. Not groundbreaking, but it gets a smile.&quot;
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">Reward model score:</div>
              <div className="flex-1 h-6 bg-secondary/30 rounded overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="h-full bg-gradient-to-r from-green-500/60 to-green-400/60 rounded"
                />
              </div>
              <span className="font-mono text-sm text-green-400">0.78</span>
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
            <strong>The optimization problem:</strong> If humans consistently rank warmer/more agreeable responses higher,
            the reward model learns patterns that map “agreeable” → “higher score”. Over many examples, that bias can
            nudge the model toward being overly pleasant.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex justify-center items-center gap-4"
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
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
