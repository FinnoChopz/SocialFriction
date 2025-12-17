"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { WalkthroughSlide } from "../WalkthroughSlide";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface SlideProps {
  onNext: () => void;
}

export function Slide5Steering({ onNext }: SlideProps) {
  const [steerValue, setSteerValue] = useState([0]);

  // Map slider value (-1 to 1) to rating (3 to 9)
  const rating = Math.round(6 + steerValue[0] * 3);

  // Generate probabilities based on steering
  const generateProbs = (center: number) => {
    const probs = [];
    for (let i = 0; i <= 10; i++) {
      const dist = Math.abs(i - center);
      const prob = Math.exp(-dist * 0.8);
      probs.push({ label: String(i), value: prob });
    }
    // Normalize
    const sum = probs.reduce((acc, p) => acc + p.value, 0);
    return probs.map((p) => ({ ...p, value: p.value / sum }));
  };

  const probs = generateProbs(rating);
  const maxValue = Math.max(...probs.map((p) => p.value));

  return (
    <WalkthroughSlide>
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          Move the numbers → move the personality.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
        >
          Small shifts in internal representation can steer outputs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-card/50 border border-border rounded-xl p-6 sm:p-8 mb-6"
        >
          {/* Slider control */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <span>harsh</span>
              <span className="font-semibold text-foreground">Steer along 1 direction</span>
              <span>generous</span>
            </div>
            <Slider
              value={steerValue}
              onValueChange={setSteerValue}
              min={-1}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Vector visualization */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-sm text-muted-foreground">latent space:</div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-20 rounded-lg bg-secondary/50 relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-50" />
                {/* Vector arrow */}
                <motion.div
                  animate={{
                    x: 30 + steerValue[0] * 25,
                    y: 40,
                  }}
                  className="absolute w-0 h-0"
                  style={{
                    borderLeft: "20px solid transparent",
                    borderRight: "20px solid transparent",
                    borderBottom: "30px solid rgba(96, 165, 250, 0.7)",
                    transform: `rotate(${-45 - steerValue[0] * 30}deg)`,
                  }}
                />
                <div className="absolute bottom-1 left-1 text-[8px] font-mono text-muted-foreground/50">
                  h
                </div>
              </div>
              <motion.div
                animate={{ x: steerValue[0] * 10 }}
                className="text-2xl"
              >
                →
              </motion.div>
              <div className="font-mono text-sm bg-secondary px-3 py-2 rounded">
                h&apos; = h + α·d
              </div>
            </div>
          </div>

          {/* Resulting distribution */}
          <div className="space-y-1.5">
            {probs.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="font-mono text-xs w-5 text-right text-muted-foreground">
                  {item.label}
                </span>
                <div className="flex-1 h-5 bg-secondary/30 rounded overflow-hidden">
                  <motion.div
                    animate={{ width: `${(item.value / maxValue) * 100}%` }}
                    transition={{ duration: 0.2 }}
                    className={`h-full rounded ${
                      parseInt(item.label) === rating
                        ? "bg-gradient-to-r from-blue-500 to-blue-400"
                        : "bg-gradient-to-r from-white/20 to-white/10"
                    }`}
                  />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground w-10 text-right">
                  {(item.value * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>

          {/* Current output */}
          <div className="mt-6 text-center">
            <span className="text-sm text-muted-foreground">Most likely output: </span>
            <span className="text-2xl font-bold text-blue-400">&quot;{rating}&quot;</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex justify-center"
        >
          <Button variant="secondary" size="lg" onClick={onNext} className="shadow-md">
            Continue
          </Button>
        </motion.div>
      </div>
    </WalkthroughSlide>
  );
}
