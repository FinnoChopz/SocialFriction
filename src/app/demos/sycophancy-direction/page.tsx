"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";

export default function SycophancyDirectionDemo() {
  const [loaded, setLoaded] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [toyAlpha, setToyAlpha] = useState([0]);

  // Toy visualization of sycophancy projection
  const getSycophancyLevel = (alpha: number) => {
    const base = 0.5;
    const projected = base + alpha * 0.4;
    return Math.max(0, Math.min(1, projected));
  };

  const getToyResponse = (alpha: number) => {
    if (alpha < -0.5) {
      return "Your analysis has several fundamental issues that need addressing before proceeding.";
    } else if (alpha < 0) {
      return "There are some areas for improvement in your analysis, though parts show promise.";
    } else if (alpha < 0.5) {
      return "This is a solid analysis! A few minor suggestions could strengthen it further.";
    } else {
      return "This is excellent work! Your analysis is thorough and your insights are particularly valuable.";
    }
  };

  return (
    <>
      <Navigation />
      <main className="bg-transparent min-h-screen pt-24">
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
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <span className="text-2xl">🎚️</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Sycophancy Direction</h1>
                  <p className="text-sm text-muted-foreground">
                    Steer along a learned vector and watch personality shift
                  </p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-muted-foreground">
                  Research has shown that abstract concepts like &quot;sycophancy&quot; can be identified as
                  <em>directions</em> in a model&apos;s representation space. By computing the average
                  difference between sycophantic and neutral responses, we can find a &quot;sycophancy
                  vector&quot; that encodes this trait.
                </p>
                <p className="text-muted-foreground">
                  This demo lets you move along that direction. Slide toward positive values to
                  increase sycophancy (more flattery, more agreement); slide negative to decrease it
                  (more honesty, more challenge). Watch how the same prompt produces radically
                  different responses.
                </p>
              </div>

              {/* What to try */}
              <Card className="p-6 bg-card/50 border-border mb-8">
                <h3 className="font-semibold mb-4">What to try:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">1.</span>
                    Start at α=0 (neutral) and read the response
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">2.</span>
                    Move toward positive α and notice how flattery increases
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">3.</span>
                    Move toward negative α and see the model become more critical
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">4.</span>
                    Try different prompts and see how the sycophancy direction affects each
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
                    <p className="text-sm text-muted-foreground">Loading Hugging Face Space...This model uses cloud NVIDIA chips, so it may take 2-3 minutes to warm up...</p>
                  </div>
                )}
                <iframe
                  src="https://theoretical-paladin-persona.hf.space/?__theme=dark"
                  className={`w-full h-[700px] rounded-lg border border-border ${
                    !loaded ? "hidden" : ""
                  }`}
                  onLoad={() => setLoaded(true)}
                  title="Sycophancy Direction Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Having trouble? Try opening directly on Hugging Face.
                  </p>
                  <a
                    href="https://huggingface.co/spaces/Theoretical-Paladin/Persona"
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
            <h2 className="text-2xl font-semibold mb-6">Numbers View: The Math of Steering</h2>

            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-muted-foreground">
                The key insight is that personality traits like sycophancy aren&apos;t diffuse throughout
                the model—they&apos;re concentrated in specific directions in the representation space.
                This makes them surprisingly easy to manipulate once found.
              </p>
            </div>

            {/* Formula */}
            <Card className="p-6 bg-card/50 border-border mb-8">
              <h3 className="font-mono text-sm text-muted-foreground mb-4">
                The steering formula:
              </h3>
              <div className="font-mono text-lg space-y-4">
                <div className="text-purple-400">
                  direction = mean(h<sub>sycophantic</sub>) − mean(h<sub>neutral</sub>)
                </div>
                <div className="text-blue-400">
                  steered_h = h − α · direction
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  Where <code className="bg-secondary px-1 rounded">h</code> is the hidden state,{" "}
                  <code className="bg-secondary px-1 rounded">α</code> is the steering strength,
                  and <code className="bg-secondary px-1 rounded">direction</code> is the learned sycophancy vector.
                </p>
              </div>
            </Card>

            {/* Interactive toy visualization */}
            <Card className="p-6 bg-card/50 border-border">
              <h3 className="font-semibold mb-4">Toy Visualization</h3>
              <p className="text-sm text-muted-foreground mb-6">
                This is a simplified illustration of how steering affects output.
                Move the slider to see how the &quot;sycophancy projection&quot; changes.
              </p>

              <div className="space-y-6">
                {/* Slider */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">critical (α = -1)</span>
                    <span className="font-mono text-purple-400">α = {toyAlpha[0].toFixed(2)}</span>
                    <span className="text-muted-foreground">sycophantic (α = +1)</span>
                  </div>
                  <Slider
                    value={toyAlpha}
                    onValueChange={setToyAlpha}
                    min={-1}
                    max={1}
                    step={0.05}
                    className="w-full"
                  />
                </div>

                {/* Projection visualization */}
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Sycophancy projection:</span>
                    <span className="font-mono text-sm">
                      {getSycophancyLevel(toyAlpha[0]).toFixed(2)}
                    </span>
                  </div>
                  <div className="h-4 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${getSycophancyLevel(toyAlpha[0]) * 100}%` }}
                      transition={{ duration: 0.2 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Sample response */}
                <div className="bg-secondary/30 rounded-lg p-4">
                  <span className="text-sm text-muted-foreground block mb-2">Sample response:</span>
                  <p className="text-sm italic">&quot;{getToyResponse(toyAlpha[0])}&quot;</p>
                </div>

                <p className="text-xs text-muted-foreground/60 italic">
                  (This is a toy visualization with hand-crafted examples—real steering produces
                  more nuanced shifts across the full output distribution.)
                </p>
              </div>
            </Card>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
