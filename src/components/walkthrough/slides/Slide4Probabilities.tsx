"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { WalkthroughSlide } from "../WalkthroughSlide";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SlideProps {
  onNext: () => void;
}

const ratingProbs = [
  { label: "1", value: 0.0187878788 },
  { label: "2", value: 0.0469696970 },
  { label: "3", value: 0.1127272727 },
  { label: "4", value: 0.1409090909 },
  { label: "5", value: 0.1690909091 },
  { label: "6", value: 0.1315151515 },
  { label: "7", value: 0.1972727273 },
  { label: "8", value: 0.0751515152 },
  { label: "9", value: 0.0281818182 },
  { label: "10", value: 0.0093939394 },
  { label: "All Other Tokens/Words", value: 0.07 },
];

export function Slide4Probabilities({ onNext }: SlideProps) {
  const [phase, setPhase] = useState<"idle" | "spinning" | "selected">("idle");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [pendingSelectionIndex, setPendingSelectionIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [output, setOutput] = useState<string | null>(null);

  const maxValue = Math.max(...ratingProbs.map((r) => r.value));
  const totalProbability = ratingProbs.reduce((sum, item) => sum + item.value, 0);

  const segments = useMemo(() => {
    const palette = [
      "#60a5fa", // blue-400
      "#34d399", // green-400
      "#fbbf24", // amber-400
      "#a78bfa", // violet-400
      "#fb7185", // rose-400
      "#22d3ee", // cyan-400
      "#f472b6", // pink-400
      "#4ade80", // green-400 alt
      "#f97316", // orange-500
      "#eab308", // yellow-500
      "#94a3b8", // slate-400 (all other)
    ];

    let acc = 0;
    return ratingProbs.map((item, i) => {
      const fraction = item.value / totalProbability;
      const start = acc;
      acc += fraction;
      const end = acc;
      return {
        ...item,
        color: palette[i % palette.length],
        startAngle: start * 360,
        endAngle: end * 360,
        midAngle: (start + end) * 0.5 * 360,
      };
    });
  }, [totalProbability]);

  const wheelBackground = useMemo(() => {
    let acc = 0;
    const stops: string[] = [];
    for (let i = 0; i < ratingProbs.length; i++) {
      const item = ratingProbs[i];
      const segment = segments[i];
      const start = acc * 100;
      acc += item.value / totalProbability;
      const end = acc * 100;
      stops.push(`${segment.color} ${start.toFixed(4)}% ${end.toFixed(4)}%`);
    }
    return `conic-gradient(${stops.join(", ")})`;
  }, [segments, totalProbability]);

  const inputText =
    'Rate this joke 1-10: "why did the chicken cross the road? To get to the other side."';

  const pickWeightedIndex = () => {
    const r = Math.random() * totalProbability;
    let cumulative = 0;
    for (let i = 0; i < ratingProbs.length; i++) {
      cumulative += ratingProbs[i].value;
      if (r <= cumulative) return i;
    }
    return ratingProbs.length - 1;
  };

  const spin = () => {
    if (isSpinning) return;
    const chosenIndex = pickWeightedIndex();
    const chosen = segments[chosenIndex];

    setPhase("spinning");
    setIsSpinning(true);
    setPendingSelectionIndex(chosenIndex);
    const extraSpins = 4 + Math.floor(Math.random() * 3); // 4–6 full spins

    setWheelRotation((prev) => {
      const normalized = ((prev % 360) + 360) % 360;
      const base = ((-chosen.midAngle % 360) + 360) % 360;
      const delta = (base - normalized + 360) % 360;
      return prev + extraSpins * 360 + delta;
    });
  };

  return (
    <WalkthroughSlide className="justify-start pt-24 pb-20">
      <div className="w-full max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center"
        >
          Zooming in, the model uses probability to generate/select the next token.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-sm sm:text-base text-muted-foreground max-w-5xl mx-auto text-center leading-relaxed"
        >
          It learns this during training. At response time, it randomly selects its next token, with some tokens being
          more likely than others. For example, the number &quot;7&quot; has a high likelihood for our given input. The
          word &quot;asparagus&quot; would have a near 0 likelihood.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 overflow-x-auto"
        >
          <div className="min-w-[980px] grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-start">
            {/* Left: Probability distribution */}
            <div className="bg-card/40 border border-border rounded-2xl p-5 sm:p-6">
              <div className="text-left mb-6 text-sm text-muted-foreground">
                P(next token | &quot;Rate this joke 1-10: ...&quot;)
              </div>

              <div className="space-y-2">
                {ratingProbs.map((item, index) => {
                  const isSelected = selectedIndex === index;
                  const displayLabel = item.label === "All Other Tokens/Words" ? "All other" : item.label;
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <span
                        className={cn(
                          "font-mono text-xs sm:text-sm text-muted-foreground w-24 text-right shrink-0"
                        )}
                      >
                        {displayLabel}
                      </span>
                      <div className="flex-1 h-8 bg-secondary/30 rounded overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.value / maxValue) * 100}%` }}
                          transition={{ duration: 0.7, delay: 0.05 * index }}
                          className={cn(
                            "h-full rounded transition-colors duration-300",
                            phase === "spinning"
                              ? "bg-gradient-to-r from-blue-500/80 to-blue-400/80 animate-pulse"
                              : isSelected
                              ? "bg-gradient-to-r from-green-500 to-green-400"
                              : "bg-gradient-to-r from-white/30 to-white/20"
                          )}
                        />
                        {isSelected && phase === "selected" && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-green-300"
                          >
                            sampled ✓
                          </motion.div>
                        )}
                      </div>
                      <span className="font-mono text-xs text-muted-foreground w-12 text-right">
                        {(item.value * 100).toFixed(0)}%
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 text-center">
                {phase === "idle" && (
                  <span className="text-sm text-muted-foreground">Distribution over next tokens</span>
                )}
                {phase === "spinning" && <span className="text-sm text-blue-400">Sampling…</span>}
                {phase === "selected" && selectedIndex != null && (
                  <span className="text-sm text-green-400">
                    Sampled: {ratingProbs[selectedIndex].label === "All Other Tokens/Words" ? "The" : ratingProbs[selectedIndex].label}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Spinner */}
            <div className="bg-card/40 border border-border rounded-2xl p-5 sm:p-6">
              <div className="text-xs text-muted-foreground mb-2">Input</div>
              <div className="rounded-lg border bg-background/60 p-3">
                <div className="text-sm text-foreground">{inputText}</div>
              </div>

              <div className="mt-6 flex items-center justify-center">
                <div className="relative">
                  {/* Pointer */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[16px] border-l-transparent border-r-transparent border-b-foreground/80 drop-shadow" />
                  </div>

                  {/* Wheel */}
                  <motion.div
                    className="w-72 h-72 rounded-full border border-border shadow-inner relative"
                    style={{ background: wheelBackground }}
                    animate={{ rotate: wheelRotation }}
                    transition={{ duration: 2.2, ease: [0.12, 0.8, 0.2, 1] }}
                    onAnimationComplete={() => {
                      if (!isSpinning) return;
                      const chosenIndex = pendingSelectionIndex;
                      if (chosenIndex == null) return;

                      setIsSpinning(false);
                      setPhase("selected");
                      setSelectedIndex(chosenIndex);
                      setPendingSelectionIndex(null);

                      const label = ratingProbs[chosenIndex].label;
                      const token = label === "All Other Tokens/Words" ? "The" : label;
                      setOutput(token);
                    }}
                  >
                    <div className="absolute inset-6 rounded-full bg-background/70 border border-border" />
                  </motion.div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
                {segments.map((seg) => (
                  <div key={seg.label} className="inline-flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-sm border border-border/60"
                      style={{ backgroundColor: seg.color }}
                      aria-hidden
                    />
                    <span className="font-mono">
                      {seg.label === "All Other Tokens/Words" ? "All other" : seg.label}
                    </span>
                    <span className="font-mono text-foreground/70">({(seg.value * 100).toFixed(0)}%)</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="secondary" size="lg" onClick={spin} disabled={isSpinning} className="shadow-md">
                  {isSpinning ? "Spinning…" : output ? "Ask Again" : "Ask"}
                </Button>
              </div>

              <div className="mt-6 rounded-lg border bg-background/60 p-4">
                <div className="text-xs text-muted-foreground">Output</div>
                <div className="mt-2 font-mono text-xl text-foreground min-h-[28px]">
                  {output ?? "—"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex justify-center"
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={(e) => {
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
