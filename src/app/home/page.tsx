"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { readingGroups } from "@/content/readings";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ArrowRight, BookOpen, FileText, Play, RotateCcw } from "lucide-react";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const activeSection = useActiveSection("hero");

  const homeSections = [
    { id: "hero", key: "hero" as const },
    { id: "readings", key: "readings" as const },
    { id: "paper", key: "paper" as const },
    { id: "demos", key: "demos" as const },
    { id: "footer", key: "footer" as const },
  ];

  return (
    <>
      <Navigation />
      <main className="bg-transparent">
        {/* Section indicator */}
        <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-3 text-muted-foreground/50">
          {homeSections.map((section) => (
            <button
              key={section.id}
              aria-label={`Scroll to ${section.id}`}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "w-2.5 h-2.5 rounded-full border border-white/30 transition-all",
                activeSection === section.key ? "bg-white/80 scale-110" : "bg-white/10"
              )}
            />
          ))}
        </div>
        {/* Hero Section */}
        <section
          ref={heroRef}
          id="hero"
          className="snap-section relative min-h-screen flex items-center justify-center overflow-hidden"
          data-bg="hero"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/65 to-background" />

          {/* Content */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <div className="mb-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70 font-mono">
              System
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              When conversation gets frictionless, what do we lose?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              AI companions feel social. Under the hood, they&apos;re probability engines trained
              to keep you comfortable. This project explores what that optimization does to
              truth, feedback, and real-world social learning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/walkthrough">
                <Button size="lg" className="min-w-[200px] gap-2">
                  <Play className="w-4 h-4" />
                  Start the walkthrough
                </Button>
              </Link>
              <Link href="/readings">
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  Skip to the portfolio
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
              <span className="text-xs">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 rounded-full border border-muted-foreground/30 flex items-start justify-center p-2"
              >
                <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
              </motion.div>
            </div>
          </motion.div>

          {/* Floating badges label */}
          <div className="absolute bottom-8 right-8">
            <p className="text-[10px] text-muted-foreground/40 italic">
              Floating badges are illustrative
            </p>
          </div>
        </section>

        {/* Readings Section */}
        <section
          className="snap-section min-h-screen py-20 lg:py-32 relative"
          id="readings"
          data-bg="readings"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/55 to-background" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70 font-mono">
                Readings Clusters
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                46 readings → 9 clusters
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Social friction, learning signals, and the design incentives shaping AI companions.
              </p>
            </motion.div>

            {/* Horizontal scroll cards */}
            <div className="snap-x-container flex gap-6 pb-6 -mx-4 px-4">
              {readingGroups.map((group, index) => (
                <motion.div
                  key={group.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="snap-x-item flex-shrink-0 w-[300px] sm:w-[350px]"
                >
                  <Link href={`/readings/${group.slug}`}>
                    <Card className="premium-card shine-effect h-full p-6 bg-card/50 border-border group">
                      <div className="flex items-start justify-between mb-4">
                        <span className="font-mono text-xs text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors">
                        {group.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {group.subtitle}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1">
                        {group.themeTags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 bg-secondary/50 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/readings">
                <Button variant="outline" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  View all readings
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Paper Section */}
        <section
          className="snap-section min-h-screen py-20 lg:py-32 relative overflow-hidden"
          id="paper"
          data-bg="paper"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70 font-mono">
                Paper Module
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">The paper</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A 2,000-word argument: RLHF makes companions smoother—but smooth isn&apos;t always safe.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="premium-card shine-effect bg-card/50 border border-border rounded-2xl p-8 mb-8"
            >
              <h3 className="text-xl font-semibold mb-6">Three core claims:</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="font-mono text-sm text-blue-400">1</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Sycophancy is not a glitch</strong>—it&apos;s an
                    optimization outcome. When models are trained on human preference ratings,
                    agreement gets systematically rewarded.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="font-mono text-sm text-green-400">2</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Human social learning depends on variable, sometimes uncomfortable feedback.
                    </strong>{" "}
                    Face threats, disagreements, and repair sequences are where we calibrate.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="font-mono text-sm text-purple-400">3</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Replacing friction with comfort reshapes what we practice
                    </strong>
                    —and what we avoid. The long-term effects on social capability are unknown but
                    potentially significant.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="text-center">
              <Link href="/paper">
                <Button size="lg" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Read the paper
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Demos Section */}
        <section
          className="snap-section min-h-screen py-20 lg:py-32 relative"
          id="demos"
          data-bg="demos"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/60 to-background" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70 font-mono">
                Demo Modules
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Interactive demos</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See the concepts in action with these Hugging Face-powered tools.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prompt Discovery Demo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Link href="/demos/prompt-discovery">
                  <Card className="premium-card shine-effect h-full p-6 bg-card/50 border-border group">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <span className="text-xl">🔍</span>
                      </div>
                      <h3 className="text-xl font-semibold">Prompt Discovery</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Watch the &quot;hidden instruction&quot; of a model change ratings. Explore how
                      different prompting strategies shift model behavior.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="italic">What you&apos;ll feel:</span>
                      <span className="text-blue-400">
                        The model bending to invisible instructions
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-foreground group-hover:gap-3 transition-all">
                      Open demo <ArrowRight className="w-4 h-4" />
                    </div>
                  </Card>
                </Link>
              </motion.div>

              {/* Sycophancy Direction Demo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Link href="/demos/sycophancy-direction">
                  <Card className="premium-card shine-effect h-full p-6 bg-card/50 border-border group">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <span className="text-xl">🎚️</span>
                      </div>
                      <h3 className="text-xl font-semibold">Sycophancy Direction</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Slide along a learned direction in representation space and watch flattery
                      rise or fall. See how &quot;personality&quot; is encoded as a vector.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="italic">What you&apos;ll feel:</span>
                      <span className="text-purple-400">
                        The math behind &quot;helpfulness&quot;
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-foreground group-hover:gap-3 transition-all">
                      Open demo <ArrowRight className="w-4 h-4" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer CTA Section */}
        <section className="py-20 border-t border-border/50" id="footer" data-bg="footer">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-4">New here?</h2>
              <p className="text-muted-foreground mb-6">
                The 30-second walkthrough explains the core concepts interactively.
              </p>
              <Link href="/walkthrough">
                <Button variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Take the walkthrough
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
