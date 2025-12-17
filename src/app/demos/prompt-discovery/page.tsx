"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";

export default function PromptDiscoveryDemo() {
  const [loaded, setLoaded] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <Navigation />
      <main className="bg-background min-h-screen pt-24">
        {/* Header */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back link */}
            <Link
              href="/demos"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All demos
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Prompt Discovery</h1>
                  <p className="text-sm text-muted-foreground">
                    Watch hidden instructions reshape model behavior
                  </p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-muted-foreground">
                  Large language models don&apos;t have a single &quot;personality&quot;—they have many, depending
                  on how they&apos;re prompted. This demo lets you explore how system prompts act as
                  hidden instructions that shift the model&apos;s default behavior, biases, and rating patterns.
                </p>
                <p className="text-muted-foreground">
                  When you ask an RLHF-tuned model to rate something, the rating it gives depends not
                  just on the content but on the &quot;persona&quot; the prompt activates. A prompt encouraging
                  honesty might produce harsher ratings than one encouraging supportiveness—even for
                  identical content.
                </p>
              </div>

              {/* What to try */}
              <Card className="p-6 bg-card/50 border-border mb-8">
                <h3 className="font-semibold mb-4">What to try:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-mono">1.</span>
                    Start with the base model (no system prompt) and note the rating distribution
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-mono">2.</span>
                    Add a prompt encouraging the model to be &quot;supportive and encouraging&quot;
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-mono">3.</span>
                    Compare with a prompt asking for &quot;honest, critical feedback&quot;
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-mono">4.</span>
                    Notice how the same content gets different ratings—the model is bending to your prompt
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </section>

        <Separator />

        {/* Demo Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {!showDemo ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <p className="text-muted-foreground mb-6 text-center max-w-md">
                  The demo loads from Hugging Face Spaces. It may take a moment to start if
                  the Space has been idle.
                </p>
                <Button onClick={() => setShowDemo(true)} size="lg" className="gap-2">
                  Load Demo
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                {!loaded && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">Loading Hugging Face Space...</p>
                  </div>
                )}
                <iframe
                  src="https://theoretical-paladin-promptdiscover.hf.space/?__theme=dark"
                  className={`w-full h-[700px] rounded-lg border border-border ${
                    !loaded ? "hidden" : ""
                  }`}
                  onLoad={() => setLoaded(true)}
                  title="Prompt Discovery Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Having trouble? Try opening directly on Hugging Face.
                  </p>
                  <a
                    href="https://huggingface.co/spaces/Theoretical-Paladin/PromptDiscover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="w-3 h-3" />
                      Open on HF
                    </Button>
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        <Separator />

        {/* Explainer Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-6">Numbers View: What&apos;s Happening Inside</h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground">
                When you change the system prompt, you&apos;re not changing the model&apos;s weights—you&apos;re
                changing the <em>context</em> that shapes how it interprets your request. Think of
                it as activating different &quot;modes&quot; that were learned during training.
              </p>

              <p className="text-muted-foreground">
                RLHF-tuned models have learned that certain prompts correlate with certain expected
                behaviors. A prompt mentioning &quot;helpful assistant&quot; activates different response
                patterns than one mentioning &quot;critical reviewer.&quot;
              </p>
            </div>

            <Card className="p-6 bg-card/50 border-border mt-6">
              <h3 className="font-mono text-sm text-muted-foreground mb-4">
                Conceptual representation:
              </h3>
              <div className="font-mono text-sm space-y-2">
                <div className="text-blue-400">
                  P(rating | content, supportive_prompt) ≠ P(rating | content, critical_prompt)
                </div>
                <div className="text-muted-foreground text-xs mt-2">
                  The same content produces different probability distributions depending on the prompt context.
                </div>
              </div>
            </Card>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
