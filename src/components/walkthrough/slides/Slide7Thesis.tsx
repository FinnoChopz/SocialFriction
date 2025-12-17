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
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight"
        >
          &quot;Social learning takes friction.  Without it, society drifts: norms don’t form,
social skills go unlearned, and our capacity for connection lessens.  
&quot;
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          This site collects 46 readings, a paper, and two demos showing how &quot;helpful&quot;
          optimization can become sycophancy—and why friction matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button size="lg" onClick={onComplete} className="text-lg px-8 py-6">
            Enter the project
          </Button>
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
      </div>
    </WalkthroughSlide>
  );
}
