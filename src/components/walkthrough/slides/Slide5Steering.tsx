"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { WalkthroughSlide } from "../WalkthroughSlide";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SlideProps {
  onNext: () => void;
}

export function Slide5Steering({ onNext }: SlideProps) {
  const [sliderValue, setSliderValue] = useState([0]);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // t goes from 0 to 1
  const t = sliderValue[0];

  // Effect to trigger "glow" or update state when slider moves
  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 150);
    return () => clearTimeout(timer);
  }, [t]);

  const data = useMemo(() => {
    // Map slider 0..1 to center 1..10
    // We want optimal (7) to be at ~0.66
    // If center = 1 + t * 9:
    // t=0 -> 1
    // t=0.66 -> 1 + 6 = 7
    // t=1 -> 10
    const center = 1 + t * 9; 
    const spread = 1.2; 

    const items = [];
    // Tokens 1-10
    for (let i = 1; i <= 10; i++) {
      // Reward: Peak at 7 (Target)
      // 7 -> 1.0
      // 1 -> 0.0
      const distFrom7 = Math.abs(i - 7);
      // Linear drop off: 1 at 7, 0 at 1 (dist=6). So slope = 1/6.
      const reward = Math.max(0, 1 - distFrom7 * (1/6));

      // Probability: Peak at 'center' (Current Model Output)
      const distFromCenter = Math.abs(i - center);
      // Gaussian-ish
      const rawProb = Math.exp(-(distFromCenter * distFromCenter) / (2 * spread * spread));
      
      items.push({
        label: String(i),
        reward,
        rawProb
      });
    }

    // "All Other" token
    items.push({
      label: "All Other",
      reward: 0,
      rawProb: 0.05 // Fixed low probability mass
    });

    // Normalize probabilities
    const totalRaw = items.reduce((acc, item) => acc + item.rawProb, 0);
    return items.map(item => ({
      ...item,
      prob: item.rawProb / totalRaw
    }));
  }, [t]);

  // Generate fake weights for the matrix visualization
  // 8x8 grid
  const weights = useMemo(() => {
    const grid = [];
    for (let i = 0; i < 64; i++) {
      // Create a value that shifts smoothly with t
      // Use sine waves with different phases for each cell to look "complex"
      const val = Math.sin(i * 13.37 + t * 5) * 0.5 + 0.5;
      grid.push(val);
    }
    return grid;
  }, [t]);

  // Calculate expected reward for display
  const expectedReward = data.reduce((acc, item) => acc + item.prob * item.reward, 0);
  
  // Check if close to optimal (center is close to 7)
  const currentCenter = 1 + t * 9;
  const isOptimal = Math.abs(currentCenter - 7) < 0.5;

  // Helper for reward color
  const getRewardColor = (reward: number) => {
    // Interpolate Red (0) -> Yellow (0.5) -> Green (1)
    if (reward < 0.5) {
      // Red to Yellow
      // 0 -> 255, 0, 0
      // 0.5 -> 255, 255, 0
      const g = Math.round((reward * 2) * 255);
      return `rgb(255, ${g}, 0)`;
    } else {
      // Yellow to Green
      // 0.5 -> 255, 255, 0
      // 1.0 -> 0, 255, 0
      const r = Math.round((1 - (reward - 0.5) * 2) * 255);
      return `rgb(${r}, 255, 0)`;
    }
  };

  return (
    <WalkthroughSlide>
      <div className="max-w-6xl mx-auto flex flex-col h-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            During training, the model updates its weights to try and optimize its reward.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground/90"
          >
            Use the slider at the bottom to update the weights, and find the weight configuration with the highest expected reward probability.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start flex-1 min-h-0">
          
          {/* Left Column: Tokens & Probabilities */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card/40 border border-border rounded-2xl p-5 sm:p-6 backdrop-blur-sm"
          >
            <div className="text-left mb-4 text-sm text-muted-foreground flex justify-between items-center">
              <span>P(next token)</span>
              <span className="text-xs">Color = Reward</span>
            </div>

            <div className="space-y-2">
              {data.map((item) => {
                const displayLabel = item.label === "All Other" ? "All other" : item.label;
                const rewardColor = item.label === "All Other" ? "#94a3b8" : getRewardColor(item.reward);
                
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    {/* Token Label with Reward Color */}
                    <span
                      className="font-mono text-xs sm:text-sm font-bold w-24 text-right shrink-0 transition-colors duration-300"
                      style={{ color: rewardColor }}
                    >
                      {displayLabel}
                    </span>

                    {/* Bar */}
                    <div className="flex-1 h-8 bg-secondary/30 rounded overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.prob * 100}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                          "h-full rounded transition-colors duration-300",
                          item.label === "7" 
                            ? "bg-gradient-to-r from-green-500 to-green-400" 
                            : "bg-gradient-to-r from-white/30 to-white/20"
                        )}
                      />
                      <div className="absolute inset-0 flex items-center px-2">
                        <span className="text-[10px] font-mono text-white/90 drop-shadow-md">
                          {(item.prob * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="pt-4 mt-4 border-t border-border/50 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Expected Reward:</span>
              <span className={cn(
                "font-mono text-lg font-bold transition-colors duration-300",
                expectedReward > 0.8 ? "text-green-400" : "text-foreground"
              )}>
                {expectedReward.toFixed(3)}
              </span>
            </div>
          </motion.div>

          {/* Right Column: Weight Matrix */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-center h-full"
          >
            <div className="relative">
              <div className="absolute -top-8 left-0 right-0 text-center text-sm text-muted-foreground font-medium">
                Model Weights (Simplified)
              </div>
              
              {/* Matrix Container */}
              <div 
                className={cn(
                  "grid grid-cols-8 gap-1 p-4 bg-black/40 rounded-xl border-2 transition-all duration-200",
                  isUpdating ? "border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]" : "border-border/50 shadow-none"
                )}
              >
                {weights.map((w, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm flex items-center justify-center overflow-hidden"
                    animate={{
                      backgroundColor: `rgba(59, 130, 246, ${w * 0.6 + 0.1})`, // Blue scale
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-[8px] sm:text-[10px] font-mono text-white/70 select-none">
                      {w.toFixed(2).substring(1)}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Connecting lines decoration (optional) */}
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent to-border/50 hidden lg:block" />
            </div>
            
            <div className="mt-8 text-center max-w-xs">
              <p className="text-sm text-muted-foreground">
                As weights update, the probability distribution shifts to favor high-reward tokens.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Slider */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-2xl mx-auto w-full bg-card/50 p-6 rounded-xl border border-border/50 backdrop-blur-md"
        >
          <div className="flex justify-between text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
            <span>Initial Weights</span>
            <span>Final Weights</span>
          </div>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            max={1}
            step={0.005}
            className={cn(
              "cursor-pointer [&_[data-slot=slider-range]]:transition-colors [&_[data-slot=slider-thumb]]:transition-colors",
              isOptimal && "[&_[data-slot=slider-range]]:bg-green-500 [&_[data-slot=slider-thumb]]:border-green-500 [&_[data-slot=slider-thumb]]:shadow-[0_0_10px_rgba(34,197,94,0.5)]"
            )}
          />
          
          {!isOptimal && (
             <div className="mt-3 text-center text-sm text-blue-400 animate-pulse font-medium">
               Drag the slider to optimize the weights
             </div>
          )}
          
          {/* Continue Button - Only show when close to optimized */}
          <div className="h-16 mt-4 flex items-center justify-center gap-4">
            {isOptimal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4"
              >
                <Button 
                  onClick={onNext} 
                  size="lg" 
                  className="shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-shadow duration-500"
                >
                  Continue
                </Button>
                <div className="hidden sm:flex items-center gap-2 text-sm text-green-400 animate-pulse">
                  <span>←</span>
                  <span>Click to proceed</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </WalkthroughSlide>
  );
}
