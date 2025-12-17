"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info, BookOpen, Code, Image as ImageIcon, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="bg-background min-h-screen pt-24">
        {/* Header */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">About</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-4">About This Project</h1>

              <p className="text-lg text-muted-foreground">
                Social Friction Lab is a Cornell final project exploring the intersection of AI
                companionship, sycophancy, and human social learning.
              </p>
            </motion.div>
          </div>
        </section>

        <Separator />

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* What is this */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl font-semibold mb-4">What is this?</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    This website accompanies a research paper arguing that the friction inherent
                    in human social interaction—disagreement, face threats, variable feedback—serves
                    critical functions in social learning that AI companions optimized for user
                    comfort may not replicate.
                  </p>
                  <p className="text-muted-foreground">
                    The project synthesizes literature from conversation analysis, neuroscience,
                    reinforcement learning, and AI alignment to build a theoretical framework
                    connecting RLHF-driven sycophancy to potential downstream effects on human
                    social capability.
                  </p>
                </div>
              </motion.div>

              {/* Methods */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Methods</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    This is a theoretical synthesis project, not an empirical study. The approach:
                  </p>
                  <ul className="text-muted-foreground space-y-2 mt-4">
                    <li>
                      <strong className="text-foreground">Literature review:</strong> 44 readings
                      spanning sociology, neuroscience, linguistics, and machine learning were
                      analyzed for insights relevant to social learning and AI interaction.
                    </li>
                    <li>
                      <strong className="text-foreground">Conceptual framework:</strong> The paper
                      develops a framework connecting RLHF training dynamics to social learning
                      theory, identifying specific mechanisms through which sycophancy might
                      affect skill development.
                    </li>
                    <li>
                      <strong className="text-foreground">Interactive demonstrations:</strong> Two
                      Hugging Face demos illustrate key concepts (prompt-based persona shifting
                      and representation steering).
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Components */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Project Components</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="p-4 bg-card/50 border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">44 Readings</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Academic sources organized into 9 thematic clusters, each with citation,
                      source links, and discussion notes.
                    </p>
                  </Card>
                  <Card className="p-4 bg-card/50 border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-5 h-5 text-green-400" />
                      <span className="font-medium">Research Paper</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      A 2,000-word theoretical argument connecting RLHF training to social
                      learning implications.
                    </p>
                  </Card>
                  <Card className="p-4 bg-card/50 border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <Code className="w-5 h-5 text-purple-400" />
                      <span className="font-medium">Interactive Demos</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Two Hugging Face demos illustrating prompt-based steering and
                      representation space manipulation.
                    </p>
                  </Card>
                  <Card className="p-4 bg-card/50 border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-5 h-5 text-yellow-400" />
                      <span className="font-medium">Walkthrough</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      A 7-slide interactive introduction explaining what AI models are and how
                      training shapes their behavior.
                    </p>
                  </Card>
                </div>
              </motion.div>

              {/* Acknowledgements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Acknowledgements</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    Thank you to the course instructors and TAs for feedback throughout the project.
                    The interactive demos are built on Hugging Face infrastructure. This website
                    uses Next.js, Tailwind CSS, shadcn/ui, and Framer Motion.
                  </p>
                </div>
              </motion.div>

              {/* Image Credits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Image Credits
                </h2>
                <Card className="p-4 bg-card/50 border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Background images are from Unsplash and used under the Unsplash License
                    (free for commercial and non-commercial use).
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>
                      <code className="bg-secondary px-1 rounded">network.jpg</code> — Source: Unsplash
                    </li>
                    <li>
                      <code className="bg-secondary px-1 rounded">city-bokeh.jpg</code> — Source: Unsplash
                    </li>
                    <li>
                      <code className="bg-secondary px-1 rounded">phone-glow.jpg</code> — Source: Unsplash
                    </li>
                    <li>
                      <code className="bg-secondary px-1 rounded">concert-phone.jpg</code> — Source: Unsplash
                    </li>
                    <li>
                      <code className="bg-secondary px-1 rounded">code.jpg</code> — Source: Unsplash
                    </li>
                    <li>
                      <code className="bg-secondary px-1 rounded">silhouette.jpg</code> — Source: Unsplash
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground/60 mt-4">
                    Download links for original images are available in the project repository.
                  </p>
                </Card>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact
                </h2>
                <p className="text-muted-foreground">
                  For questions about this project, please contact via Cornell email.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
