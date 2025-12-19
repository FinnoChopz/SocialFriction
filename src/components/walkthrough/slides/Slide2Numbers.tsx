"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { WalkthroughSlide } from "../WalkthroughSlide";
import { NumberStream } from "@/components/shared/NumberStream";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatWeightMatrix, TOY_MODEL_WEIGHTS } from "@/components/walkthrough/toyModelWeights";

interface SlideProps {
  onNext: () => void;
}

export function Slide2Numbers({ onNext }: SlideProps) {
  const [weightsOpen, setWeightsOpen] = useState(false);
  const formattedWeights = weightsOpen ? formatWeightMatrix(TOY_MODEL_WEIGHTS, 2) : "";

  return (
    <WalkthroughSlide>
      <Dialog open={weightsOpen} onOpenChange={setWeightsOpen}>
        <DialogContent
          className="w-[92vw] sm:max-w-6xl h-[80vh] flex flex-col"
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === " ") {
              e.stopPropagation();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-mono">model_weights =</DialogTitle>
          </DialogHeader>

          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full overflow-auto rounded-md border bg-muted/20 p-4">
              <pre className="font-mono text-[10px] sm:text-[11px] leading-snug text-foreground/90">
                {formattedWeights}
              </pre>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              A model&apos;s parameters/weights are stationary. They encode the model itself. In many ways, a model IS
              its parameters.
            </p>
            <p className="text-[11px] text-muted-foreground/70">This is a toy example weight matrix.</p>
          </div>
        </DialogContent>
      </Dialog>

      <div
        className="max-w-3xl mx-auto text-center cursor-pointer"
        onClick={() => {
          if (weightsOpen) return;
          onNext();
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold mb-6"
        >
          AI is all numbers.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base text-foreground/80 mb-12 max-w-xl mx-auto"
        >
          A model is a huge set of learned parameters—just values adjusted by training.
        </motion.p>

        {/* Vector animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-card/50 border border-border rounded-xl p-8 mb-8 cursor-zoom-in hover:bg-card/60 transition-colors"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            setWeightsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            e.preventDefault();
            e.stopPropagation();
            setWeightsOpen(true);
          }}
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex justify-center items-center gap-4"
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
