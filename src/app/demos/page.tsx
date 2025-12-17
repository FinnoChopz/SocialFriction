"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play } from "lucide-react";

const demos = [
  {
    slug: "prompt-discovery",
    title: "Prompt Discovery",
    emoji: "🔍",
    shortDescription: "Watch the 'hidden instruction' of a model change ratings.",
    longDescription:
      "This demo lets you explore how different prompting strategies shift model behavior. You'll see how the same model can produce wildly different responses based on subtle changes to the system prompt—revealing the 'persona' hiding in the weights.",
    whatToTry: [
      "Compare base vs. prompted ratings for the same content",
      "Try prompts that encourage vs. discourage sycophancy",
      "Notice how rating distributions shift with persona changes",
    ],
    whatYoullFeel: "The model bending to invisible instructions",
    color: "blue",
  },
  {
    slug: "sycophancy-direction",
    title: "Sycophancy Direction",
    emoji: "🎚️",
    shortDescription: "Slide along a learned direction and watch flattery rise or fall.",
    longDescription:
      "This demo visualizes how 'personality' can be encoded as a direction in representation space. By moving along the 'sycophancy direction'—the average difference between sycophantic and neutral responses—you can dial agreement up or down and see the effects in real-time.",
    whatToTry: [
      "Start at neutral (α=0) and move toward sycophancy",
      "Compare the same prompt at different steering strengths",
      "Notice how subtle the personality shift can be",
    ],
    whatYoullFeel: "The math behind 'helpfulness'",
    color: "purple",
  },
];

export default function DemosPage() {
  return (
    <>
      <Navigation />
      <main className="bg-transparent min-h-screen pt-24">
        {/* Header */}
        <section className="relative py-16 overflow-hidden" data-bg="demos">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Interactive Demos</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-4">See the Concepts in Action</h1>

              <p className="text-lg text-muted-foreground max-w-2xl">
                These Hugging Face-powered tools let you interact with the ideas from the paper.
                Watch models bend to prompts, steer along learned directions, and see sycophancy
                emerge in real-time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Demos Grid */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-background/85" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 gap-8">
              {demos.map((demo, index) => (
                <motion.div
                  key={demo.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/demos/${demo.slug}`}>
                    <Card className="premium-card shine-effect p-8 bg-card/50 border-border group">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Icon */}
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                            demo.color === "blue"
                              ? "bg-blue-500/20"
                              : "bg-purple-500/20"
                          }`}
                        >
                          <span className="text-3xl">{demo.emoji}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h2 className="text-2xl font-semibold mb-2 group-hover:text-foreground transition-colors">
                            {demo.title}
                          </h2>

                          <p className="text-muted-foreground mb-4">
                            {demo.longDescription}
                          </p>

                          {/* What to try */}
                          <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2">What to try:</h3>
                            <ul className="space-y-1">
                              {demo.whatToTry.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-muted-foreground flex items-start gap-2"
                                >
                                  <span className="text-muted-foreground/50">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* What you'll feel */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground italic">
                              What you&apos;ll feel:
                            </span>
                            <span
                              className={`text-sm ${
                                demo.color === "blue" ? "text-blue-400" : "text-purple-400"
                              }`}
                            >
                              {demo.whatYoullFeel}
                            </span>
                          </div>

                          {/* CTA */}
                          <div className="mt-6 flex items-center gap-2 text-foreground group-hover:gap-3 transition-all">
                            Open demo
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Note */}
        <section className="py-8 border-t border-border/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-muted-foreground">
              Demos are hosted on Hugging Face Spaces and load in an iframe. They may take a
              moment to start if the Space has been idle.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
