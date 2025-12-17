"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useWalkthroughStatus } from "@/hooks/useWalkthroughStatus";
import { ParticleCanvas } from "@/components/shared/ParticleCanvas";

export default function WelcomePage() {
  const router = useRouter();
  const { hasCompleted, isLoading } = useWalkthroughStatus();

  // Redirect returning users to home
  useEffect(() => {
    if (!isLoading && hasCompleted) {
      router.push("/home");
    }
  }, [hasCompleted, isLoading, router]);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/home");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  // Show nothing while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  // Don't render if redirecting
  if (hasCompleted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <ParticleCanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.32) 34%, rgba(0,0,0,0.18) 56%, rgba(0,0,0,0.08) 72%, transparent 86%)",
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-xl font-bold text-white/10">SF</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Social Friction Lab</div>
                <div className="text-xs text-muted-foreground">Research Final Project</div>
              </div>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            When conversation gets frictionless, what do we lose?
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-white/90 drop-shadow-[0_8px_22px_rgba(0,0,0,0.55)] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            AI companions feel social. Under the hood, they&apos;re probability engines trained to keep
            you comfortable. This project explores what that optimization does to truth, feedback,
            and real-world social learning.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => router.push("/walkthrough")}
              className="min-w-[200px] text-lg py-6"
            >
              Start the walkthrough
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/home")}
              className="min-w-[200px]"
            >
              Skip to site
            </Button>
          </motion.div>

          {/* Keyboard hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-sm text-muted-foreground/50"
          >
            Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">Esc</kbd> to skip
          </motion.p>
        </motion.div>

        {/* Floating badges label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <p className="text-[10px] text-muted-foreground/40 italic">
            Floating badges are illustrative
          </p>
        </motion.div>
      </div>
    </div>
  );
}
