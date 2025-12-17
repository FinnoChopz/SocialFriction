"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Shield, Info, ExternalLink } from "lucide-react";

export default function SafetyPage() {
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
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Safety & Limitations</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Limitations & Disclaimers
              </h1>

              <p className="text-lg text-muted-foreground">
                Important context for interpreting this project&apos;s claims.
              </p>
            </motion.div>
          </div>
        </section>

        <Separator />

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {/* Crisis Warning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="p-6 bg-yellow-500/10 border-yellow-500/30">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-lg font-semibold mb-2 text-yellow-300">
                        If You&apos;re in Crisis
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        This project discusses AI advice risks and social interaction patterns.
                        If you&apos;re experiencing a mental health crisis or having thoughts of
                        self-harm, please seek immediate help from qualified professionals.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          <strong>US:</strong> National Suicide Prevention Lifeline: 988
                        </li>
                        <li>
                          <strong>US:</strong> Crisis Text Line: Text HOME to 741741
                        </li>
                        <li>
                          <strong>International:</strong>{" "}
                          <a
                            href="https://findahelpline.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            findahelpline.com
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Academic Limitations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Academic Limitations</h2>
                <Card className="p-6 bg-card/50 border-border">
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">This is theoretical work.</strong>
                        <p className="mt-1">
                          The paper presents a conceptual framework, not empirical findings.
                          The hypothesized effects of AI companion use on social learning have
                          not been experimentally validated in this project.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Causal claims are speculative.</strong>
                        <p className="mt-1">
                          While the literature review identifies plausible mechanisms, we cannot
                          conclude that AI companion use causes social skill changes without
                          properly controlled longitudinal studies.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Individual variation matters.</strong>
                        <p className="mt-1">
                          Effects of AI interaction likely vary significantly across individuals,
                          contexts, and use patterns. Population-level concerns don&apos;t imply that
                          any particular user will be harmed.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Benefits are real too.</strong>
                        <p className="mt-1">
                          This project focuses on potential risks, but AI companions may provide
                          genuine benefits for some users, particularly those facing isolation
                          or limited access to human social support.
                        </p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </motion.div>

              {/* Demo Disclaimers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Demo Disclaimers</h2>
                <Card className="p-6 bg-card/50 border-border">
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Demos are illustrative.</strong>
                        <p className="mt-1">
                          The Hugging Face demos are educational tools designed to illustrate
                          concepts. They use smaller models and simplified interfaces that may
                          not perfectly represent production AI systems.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Visualizations are schematic.</strong>
                        <p className="mt-1">
                          The walkthrough and toy visualizations simplify complex processes for
                          educational purposes. Real neural networks are far more complex than
                          these representations suggest.
                        </p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </motion.div>

              {/* Not Medical/Psychological Advice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Not Professional Advice</h2>
                <Card className="p-6 bg-card/50 border-border">
                  <p className="text-muted-foreground">
                    This project is an academic exercise and does not constitute medical,
                    psychological, or professional advice. The discussion of AI companion
                    risks is intended for educational and research purposes. If you have
                    concerns about your own technology use or mental health, please consult
                    qualified healthcare professionals.
                  </p>
                </Card>
              </motion.div>

              {/* Balanced Perspective */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4">A Note on Perspective</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    This project takes a cautious perspective on AI companion development,
                    focusing on potential risks. This framing reflects the assignment&apos;s scope,
                    not a comprehensive evaluation of AI companionship. A balanced assessment
                    would also consider:
                  </p>
                  <ul className="text-muted-foreground mt-4 space-y-2">
                    <li>Benefits for users with limited social access</li>
                    <li>Potential for AI to supplement rather than replace human interaction</li>
                    <li>Design improvements that might mitigate sycophancy</li>
                    <li>User agency in managing their own technology use</li>
                    <li>Historical patterns of concern about new communication technologies</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    The goal is not to condemn AI companions but to identify specific mechanisms
                    worthy of empirical investigation and thoughtful design consideration.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
