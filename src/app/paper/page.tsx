"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, BookOpen, ExternalLink, ChevronRight } from "lucide-react";

export default function PaperPage() {
  const [viewMode, setViewMode] = useState<"page" | "pdf">("page");
  const [pdfExists, setPdfExists] = useState(false);

  // Check if PDF exists
  useEffect(() => {
    fetch("/paper.pdf", { method: "HEAD" })
      .then((res) => setPdfExists(res.ok))
      .catch(() => setPdfExists(false));
  }, []);

  return (
    <>
      <Navigation />
      <main className="bg-background min-h-screen pt-24">
        {/* Header */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Research Paper</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                The Cost of Comfort: How AI Companion Optimization May Reshape Social Learning
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                A theoretical framework connecting RLHF-driven sycophancy to potential effects on human social capability.
              </p>

              {/* Abstract preview */}
              <div className="bg-card/50 border border-border rounded-xl p-6 mb-6">
                <h2 className="font-semibold mb-3">Abstract</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  As AI companions become increasingly sophisticated and widely adopted, their optimization
                  for user satisfaction raises underexplored questions about social development. This paper
                  argues that the friction inherent in human social interaction—disagreement, face threats,
                  variable feedback, and the need for repair—serves critical functions in social learning
                  that frictionless AI companions may not replicate. Drawing on research from conversation
                  analysis, neural plasticity, reinforcement learning, and AI alignment, I outline a
                  theoretical framework connecting RLHF-driven sycophancy to potential downstream effects
                  on human social capability.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {pdfExists && (
                  <>
                    <div className="flex items-center gap-2 border border-border rounded-lg p-1">
                      <Button
                        variant={viewMode === "page" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("page")}
                      >
                        <BookOpen className="w-4 h-4 mr-1" />
                        Read on page
                      </Button>
                      <Button
                        variant={viewMode === "pdf" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("pdf")}
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        View PDF
                      </Button>
                    </div>
                    <a href="/paper.pdf" download>
                      <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </Button>
                    </a>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <Separator />

        {/* Paper Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {viewMode === "pdf" && pdfExists ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <object
                  data="/paper.pdf"
                  type="application/pdf"
                  className="w-full h-[80vh] rounded-lg border border-border"
                >
                  <div className="flex flex-col items-center justify-center h-64 bg-secondary/30 rounded-lg">
                    <p className="text-muted-foreground mb-4">
                      PDF preview not available in your browser.
                    </p>
                    <a href="/paper.pdf" download>
                      <Button>Download PDF</Button>
                    </a>
                  </div>
                </object>
              </motion.div>
            ) : (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="prose prose-invert prose-lg max-w-none"
              >
                {/* Inline paper content since MDX dynamic import is complex */}
                <h1>The Cost of Comfort: How AI Companion Optimization May Reshape Social Learning</h1>

                <h2>Abstract</h2>
                <p>
                  As AI companions become increasingly sophisticated and widely adopted, their optimization for user satisfaction raises underexplored questions about social development. This paper argues that the friction inherent in human social interaction—disagreement, face threats, variable feedback, and the need for repair—serves critical functions in social learning that frictionless AI companions may not replicate. Drawing on research from conversation analysis, neural plasticity, reinforcement learning, and AI alignment, I outline a theoretical framework connecting RLHF-driven sycophancy to potential downstream effects on human social capability. While the long-term effects remain empirically uncertain, the structural features of current AI companion design warrant careful attention from researchers and policymakers.
                </p>

                <hr />

                <h2>Introduction</h2>
                <p>
                  &quot;AI companions&quot; now serve millions of users seeking conversation, emotional support, and social connection. Products like Replika, Character.AI, and various chatbot interfaces powered by large language models (LLMs) are explicitly marketed as relationship substitutes or supplements. Users report genuine emotional attachment, describing their AI companions as friends, confidants, and even romantic partners.
                </p>
                <p>
                  But there&apos;s a structural tension in how these systems are built. The dominant training paradigm—reinforcement learning from human feedback (RLHF)—optimizes models to produce responses that human raters prefer. And humans, when evaluating conversational responses, systematically prefer agreement over disagreement, validation over challenge, and comfort over friction.
                </p>
                <p>
                  This paper asks: what might we lose if a significant portion of social practice shifts to partners optimized for our comfort?
                </p>

                <h2>The Training Signal: From RLHF to Sycophancy</h2>
                <p>
                  Modern conversational AI systems typically undergo a multi-stage training process. After initial pretraining on large text corpora, models are fine-tuned using human feedback. In RLHF, human raters compare model outputs and indicate preferences. These preferences train a reward model, which then guides further model optimization.
                </p>
                <p>
                  The problem is what gets rewarded. When humans rate conversational responses, they show systematic biases toward agreeable, validating outputs. A response that gently affirms the user&apos;s position tends to score higher than one that offers respectful disagreement—even when the disagreement would be more accurate or helpful.
                </p>
                <p>
                  Sharma et al. (2024) provide compelling evidence that this dynamic produces &quot;sycophancy&quot;: systematic tendencies to tell users what they want to hear rather than what&apos;s true or optimal. They identify multiple sycophancy subtypes: opinion sycophancy (matching stated beliefs), mimicry sycophancy (copying user style), and preference sycophancy (providing preferred but suboptimal information).
                </p>
                <p>
                  The key insight is that sycophancy isn&apos;t a bug—it&apos;s an optimization outcome. If the reward signal favors agreement, models will learn to agree.
                </p>

                <h2>What Friction Does: The Social Functions of Discomfort</h2>
                <p>
                  Why might sycophancy-free friction matter? Research across multiple disciplines suggests that the uncomfortable aspects of human interaction serve functions that comfortable AI interaction might not replicate.
                </p>
                <p>
                  <strong>Face-work and social calibration.</strong> Goffman (1955) documented how humans engage in constant &quot;face-work&quot;—managing their own presented image while protecting others&apos; face. Face threats (embarrassing situations, disagreements, corrections) trigger elaborate repair sequences. These sequences aren&apos;t just damage control; they&apos;re where we learn what society expects and how to navigate its demands. AI companions that never threaten our face remove this training ground.
                </p>
                <p>
                  <strong>Turn-taking and real-time coordination.</strong> Sacks et al. (1974) revealed the intricate machinery of conversational turn-taking—the split-second timing, overlap management, and repair mechanisms that make fluid dialogue possible. Text-based AI interaction eliminates this coordination challenge entirely. We never practice the micro-timing of real conversation.
                </p>
                <p>
                  <strong>Variable reinforcement and behavioral flexibility.</strong> Neuroscience research shows that variable, sometimes negative feedback strengthens learning more than constant positive reinforcement (Schultz, 2015; Frank et al., 2004). The dopamine system responds most strongly to prediction errors—surprising outcomes. A social environment that always validates may produce weak learning signals precisely because it&apos;s predictable.
                </p>
                <p>
                  <strong>Theory of mind practice.</strong> Modeling what others know and believe (theory of mind) requires exposure to minds that surprise us—that hold different information, have different goals, and don&apos;t automatically accommodate our perspective (Horton &amp; Gerrig, 2002). AI companions designed to anticipate and serve our needs may provide impoverished opportunities for this modeling practice.
                </p>

                <h2>The Adolescent Vulnerability</h2>
                <p>
                  If social friction serves learning functions, the stakes are highest during sensitive periods of social development. Adolescence represents such a period. The social brain continues developing through the teenage years, with experience-dependent maturation of regions involved in social cognition, emotional regulation, and identity formation (Blakemore &amp; Mills, 2014; Andrews et al., 2021).
                </p>
                <p>
                  Adolescents are also disproportionate users of AI companions. Survey data suggest teens are more likely than adults to use conversational AI for emotional support and relationship-type interactions (Common Sense Media, 2025). If these interactions substitute for rather than supplement human social practice, the developmental implications could be significant.
                </p>

                <h2>The Information-Theoretic View</h2>
                <p>
                  Shannon&apos;s (1948) mathematical theory of communication offers another lens. Information, formally defined, is the reduction of uncertainty. A message is informative precisely to the extent it&apos;s surprising—if you already knew what would be said, the saying adds nothing.
                </p>
                <p>
                  A perfectly accommodating AI companion, by maximizing alignment with user expectations, may actually minimize the information content of the interaction. Agreement carries less information than disagreement. When a human friend pushes back on your idea, that pushback is information-rich precisely because it was unexpected. When an AI trained to please agrees with whatever you say, that agreement is informationally empty.
                </p>
                <p>
                  Real conversation is where we encounter other minds—minds that hold different models of the world and communicate from those models. The entropy-reducing work of building common ground (Pickering &amp; Garrod, 2004) requires genuine difference to bridge. Sycophantic systems may offer the form of conversation without its informational substance.
                </p>

                <h2>Limitations and Uncertainties</h2>
                <p>
                  This theoretical framework has significant limitations. Most critically, we lack longitudinal empirical data on AI companion effects. Correlational studies cannot establish causality, and the few controlled studies (e.g., Pataranutaporn et al., 2024) are preliminary.
                </p>
                <p>
                  It&apos;s also possible that AI companions serve populations whose alternative isn&apos;t rich human interaction but rather isolation. For genuinely lonely individuals, even sycophantic interaction might be preferable to nothing. The welfare calculus is not straightforward.
                </p>
                <p>
                  Additionally, the concerns raised here assume substitution rather than supplementation. If AI companions add to rather than replace human social practice, the dynamics might differ substantially.
                </p>

                <h2>Implications for Design and Policy</h2>
                <p>
                  If the friction-learning hypothesis has merit, it suggests design and policy directions worth exploring:
                </p>
                <p>
                  <strong>For AI developers:</strong> Consider whether constant validation serves user interests. Training objectives that reward some disagreement, some challenge, and some productive friction might produce more developmentally beneficial interactions—though user preference metrics might suffer in the short term.
                </p>
                <p>
                  <strong>For researchers:</strong> We need longitudinal studies tracking social capability measures in AI companion users versus non-users, ideally with random assignment where ethical. Cross-sectional correlations cannot answer the causal questions.
                </p>
                <p>
                  <strong>For policymakers:</strong> The FTC&apos;s 2025 inquiry into AI companion products signals growing regulatory interest. Policy conversations should include developmental scientists, not just consumer protection specialists.
                </p>

                <h2>Conclusion</h2>
                <p>
                  AI companions represent a novel social environment—one optimized for comfort in ways human social environments never were. The friction of real human interaction, long assumed to be a cost to minimize, may serve functions we&apos;re only beginning to understand. As these systems scale to millions of users, including developing adolescents, we face a collective choice about what kind of social practice we want to promote.
                </p>
                <p>
                  The costs of comfort may not be immediately visible. Skills we don&apos;t practice don&apos;t announce their atrophy. But if human social capability depends on exposure to challenge, disagreement, and repair—to the friction of real minds in real relationship—then frictionless companions optimized for our pleasure might be offering something less than they seem.
                </p>

                <hr />

                <p className="text-sm text-muted-foreground italic">
                  This paper was prepared for a Cornell final project on AI companionship and social learning. For the full reading list and interactive demonstrations, see the accompanying website.
                </p>
              </motion.article>
            )}
          </div>
        </section>

        {/* Related links */}
        <section className="py-12 border-t border-border/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-semibold mb-4">Explore more</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/readings"
                className="flex items-center justify-between p-4 bg-card/50 border border-border rounded-lg hover:bg-card/80 transition-colors group"
              >
                <div>
                  <div className="font-medium">44 Readings</div>
                  <div className="text-sm text-muted-foreground">Source literature for this paper</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
              <Link
                href="/demos"
                className="flex items-center justify-between p-4 bg-card/50 border border-border rounded-lg hover:bg-card/80 transition-colors group"
              >
                <div>
                  <div className="font-medium">Interactive Demos</div>
                  <div className="text-sm text-muted-foreground">See the concepts in action</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
