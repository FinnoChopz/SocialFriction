"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWalkthroughStatus } from "@/hooks/useWalkthroughStatus";

import { Slide1Welcome } from "@/components/walkthrough/slides/Slide1Welcome";
import { Slide2Numbers } from "@/components/walkthrough/slides/Slide2Numbers";
import { Slide3Tokens } from "@/components/walkthrough/slides/Slide3Tokens";
import { Slide4Probabilities } from "@/components/walkthrough/slides/Slide4Probabilities";
import { Slide5Steering } from "@/components/walkthrough/slides/Slide5Steering";
import { Slide6Training } from "@/components/walkthrough/slides/Slide6Training";
import { Slide7Thesis } from "@/components/walkthrough/slides/Slide7Thesis";

const TOTAL_SLIDES = 7;

export default function WalkthroughPage() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const router = useRouter();
  const { markCompleted } = useWalkthroughStatus();

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

  const handleComplete = useCallback(() => {
    markCompleted();
    router.push("/home");
  }, [markCompleted, router]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
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
        return <Slide4Probabilities onNext={handleNext} />;
      case 5:
        return <Slide5Steering onNext={handleNext} />;
      case 6:
        return <Slide6Training onNext={handleNext} />;
      case 7:
        return <Slide7Thesis onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
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
        className="fixed top-6 right-6 z-50"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip
        </Button>
      </motion.div>

      {/* Progress dots (moved up so they don't overlap buttons) */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i + 1)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i + 1 === currentSlide
                  ? "bg-foreground w-6"
                  : i + 1 < currentSlide
                  ? "bg-foreground/50"
                  : "bg-foreground/20"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait">{renderSlide()}</AnimatePresence>

      {/* Disclaimer footer */}
      <div className="fixed bottom-20 left-0 right-0 text-center z-40">
        <p className="text-[10px] text-muted-foreground/40 max-w-xl mx-auto px-4">
          Illustrative simplifications: tokens aren&apos;t always whole words; modern models aren&apos;t
          literally one giant list; visuals are schematic.
        </p>
      </div>
    </div>
  );
}
