"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleCanvas } from "@/components/shared/ParticleCanvas";
import { useWalkthroughStatus } from "@/hooks/useWalkthroughStatus";

import { Slide1Welcome } from "@/components/walkthrough/slides/Slide1Welcome";
import { Slide2Numbers } from "@/components/walkthrough/slides/Slide2Numbers";
import { Slide3Tokens } from "@/components/walkthrough/slides/Slide3Tokens";
import { Slide3Point5Processing } from "@/components/walkthrough/slides/Slide3Point5Processing";
import { Slide4Probabilities } from "@/components/walkthrough/slides/Slide4Probabilities";
import { Slide5Steering } from "@/components/walkthrough/slides/Slide5Steering";
import { Slide6Training } from "@/components/walkthrough/slides/Slide6Training";
import { Slide7Thesis } from "@/components/walkthrough/slides/Slide7Thesis";

const TOTAL_SLIDES = 8;

const SLIDE_DISCLAIMERS: Record<number, string> = {
  1: "This framing is a high-level mental model; real LLM systems include many interacting components beyond what’s shown here.",
  2: "Weights aren’t a single “matrix you can look at” in practice; they’re many large tensors spread across layers and model parts.",
  3: "Tokens aren’t always whole words for modern tokenizers. They are often subwords, like -ing, or sh-. The general intuition still applies: the model turns your text into identifiable lists of numbers.",
  4: "Models don’t literally multiply your whole token matrix by one big W; internally, many layer-by-layer transformations happen (attention, MLPs, residual streams, etc.).",
  5: "The “probability wheel” is simplified: the real next-token distribution spans a huge vocabulary and is shaped by logits, temperature, and sampling rules.",
  6: "Steering isn’t one knob; behavior depends on prompts, system messages, fine-tuning, decoding settings, and safety layers that interact in messy ways.",
  7: "Post-training isn’t just “pick the nicer answer”: data, labeler guidelines, reward models, and policy optimization introduce many tradeoffs and side-effects.",
  8: "This is a thesis-level argument, not a prediction; real social outcomes depend on incentives, product design, institutions, and culture.",
};

export default function WalkthroughPage() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const router = useRouter();
  const { markCompleted } = useWalkthroughStatus();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentSlide]);

  const handleNext = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES) {
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide]);

  const handleBack = useCallback(() => {
    if (currentSlide > 1) {
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  const handleSkip = useCallback(() => {
    markCompleted();
    router.push("/home");
  }, [markCompleted, router]);

  const handleSkipSlide = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES) {
      setCurrentSlide((prev) => prev + 1);
      return;
    }
    markCompleted();
    router.push("/home");
  }, [currentSlide, markCompleted, router]);

  const handleComplete = useCallback(() => {
    markCompleted();
    router.push("/home");
  }, [markCompleted, router]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const dialogOpen = document.querySelector('[data-slot="dialog-content"][data-state="open"]');
      if (dialogOpen) return;

      if (e.key === "Escape") {
        handleSkip();
        return;
      }

      const target = e.target as HTMLElement | null;
      if (target && target.closest('button, [role="button"], input, textarea, select, a')) {
        return;
      } else if (e.key === "ArrowRight" || e.key === " ") {
        if (currentSlide < TOTAL_SLIDES) {
          handleNext();
        }
      } else if (e.key === "ArrowLeft") {
        handleBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, handleNext, handleBack, handleSkip]);

  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return <Slide1Welcome onNext={handleNext} onSkip={handleSkip} />;
      case 2:
        return <Slide2Numbers onNext={handleNext} />;
      case 3:
        return <Slide3Tokens onNext={handleNext} />;
      case 4:
        return <Slide3Point5Processing onNext={handleNext} />;
      case 5:
        return <Slide4Probabilities onNext={handleNext} />;
      case 6:
        return <Slide6Training onNext={handleNext} />;
      case 7:
        return <Slide5Steering onNext={handleNext} />;
      case 8:
        return <Slide7Thesis onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <ParticleCanvas
        className="fixed inset-0 z-[2] opacity-80 mix-blend-screen"
        density={1.1}
        clickBehavior="toggleAttractor"
      />
      {/* Subtle background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Back button (not on first slide) */}
      {currentSlide > 1 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-6 left-6 z-50"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </motion.div>
      )}

      {/* Skip button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 right-6 z-50 flex flex-col items-end gap-1"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip Entire Intro
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkipSlide}
          className="h-7 px-3 text-xs text-muted-foreground/80 hover:text-foreground"
        >
          Skip Slide
        </Button>
      </motion.div>

      {/* Progress dots (moved up so they don't overlap buttons) */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-background/85 backdrop-blur-md border border-border/60 rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center gap-3">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i + 1)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i + 1 === currentSlide
                  ? "bg-foreground w-10"
                  : i + 1 < currentSlide
                  ? "bg-foreground/50"
                  : "bg-foreground/20"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        </div>
      </div>

      {/* Disclaimer footer (fixed, low z-index so buttons overlay it) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10 max-w-[calc(100vw-2rem)] sm:max-w-md pointer-events-none text-center">
        <div className="bg-background/60 backdrop-blur-sm border border-border/20 rounded-lg p-3 shadow-sm pointer-events-auto hover:bg-background/90 hover:border-border/50 transition-all duration-300">
          <p className="text-[10px] text-muted-foreground/80 font-medium leading-tight mb-1">
            Conceptual model. Simplifications apply.
          </p>
          {SLIDE_DISCLAIMERS[currentSlide] && (
            <p className="text-[10px] text-muted-foreground/60 leading-tight">
              {SLIDE_DISCLAIMERS[currentSlide]}
            </p>
          )}
        </div>
      </div>

      {/* Slide content */}
      <div className="relative z-20">
        <AnimatePresence mode="wait">{renderSlide()}</AnimatePresence>
      </div>
    </div>
  );
}
