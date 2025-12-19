"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WalkthroughSlide } from "../WalkthroughSlide";

interface SlideProps {
  onComplete: () => void;
}

export function Slide7Thesis({ onComplete }: SlideProps) {
  return (
    <WalkthroughSlide>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card/40 border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-foreground">
            The Problem:
          </div>

          <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight">
            LLMs have learned to be smooth and sycophantic.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-foreground leading-relaxed max-w-3xl mx-auto">
            As future generations spend more and more time &quot;socializing&quot; with their friction-free AI companions,
            their capacity for &quot;real-world&quot;, friction-heavy, human connection will taper off. Social learning, like
            any form of learning (for AIs as well as humans), requires mixed feedback and variable reward.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-6 bg-background/70 backdrop-blur-sm border border-border/60 rounded-2xl p-6 sm:p-8 shadow-sm"
        >
          <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-3xl mx-auto">
            LLMs are in many ways just complex configurations of numbers. During training, those numbers are guided by
            user/human feedback. That feedback skews away from friction–towards sycophancy, positive reinforcement, and
            over-validation.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto mt-10"
        >
          This site collects 46 readings, a paper, and two demos showing how &quot;helpful&quot;
          optimization can become sycophancy—and why friction matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <Button 
              size="lg" 
              onClick={onComplete} 
              className="text-lg px-8 py-6 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-shadow duration-500"
            >
              Enter the project
            </Button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
              <span>←</span>
              <span>Click to finish</span>
            </div>
          </div>
        </motion.div>

        {/* Visual flourish */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex items-center justify-center gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">46</div>
            <div className="text-xs text-muted-foreground">readings</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">9</div>
            <div className="text-xs text-muted-foreground">clusters</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">2</div>
            <div className="text-xs text-muted-foreground">demos</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">1</div>
            <div className="text-xs text-muted-foreground">paper</div>
          </div>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15 }}
          className="mt-12 max-w-3xl mx-auto rounded-xl border border-border/60 bg-background/60 px-5 py-4 text-sm sm:text-base text-muted-foreground italic leading-relaxed"
        >
          &quot;Social learning takes friction. Without it, society drifts: norms don’t form, social skills go unlearned,
          and our capacity for connection lessens.&quot;
        </motion.blockquote>
      </div>
    </WalkthroughSlide>
  );
}
