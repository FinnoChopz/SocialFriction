"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Maximize2,
  SendHorizontal,
  Sparkles,
} from "lucide-react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const EXAMPLE_QUESTIONS = [
  "Explain the paper like I'm 5.",
  "Summarize the paper in 10 words or less.",
  "What does the paper mean by “friction” in social learning?",
  "What are the strongest + weakest parts of the argument?",
];

function buildMailtoHref({
  toEmail,
  fromEmail,
  message,
}: {
  toEmail: string;
  fromEmail: string;
  message: string;
}) {
  const subject = "Friction Project — Paper feedback";
  const body = `Reply-to: ${fromEmail}\n\nFeedback:\n${message}`;
  return `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function PaperPage() {
  const [pdfExists, setPdfExists] = useState<boolean | null>(null);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  useEffect(() => {
    fetch("/paper.pdf", { method: "HEAD" })
      .then((res) => setPdfExists(res.ok))
      .catch(() => setPdfExists(null));
  }, []);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatDraft, setChatDraft] = useState("");
  const [chatIsLoading, setChatIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chatEndRef.current) return;
    chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [chatMessages.length, chatIsLoading]);

  async function askPaper(questionOverride?: string) {
    const question = (questionOverride ?? chatDraft).trim();
    if (!question || chatIsLoading) return;

    setChatError(null);
    setChatIsLoading(true);
    setChatDraft("");

    const nextMessages: ChatMessage[] = [...chatMessages, { role: "user", content: question }];
    setChatMessages(nextMessages);

    try {
      const response = await fetch("/api/paper-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json().catch(() => null)) as null | { answer?: string; error?: string };
      if (!response.ok || !data?.answer) {
        throw new Error(data?.error || `Request failed (${response.status})`);
      }

      setChatMessages([...nextMessages, { role: "assistant", content: data.answer }]);
    } catch (error) {
      setChatError(error instanceof Error ? error.message : "Something went wrong.");
      setChatMessages(nextMessages);
    } finally {
      setChatIsLoading(false);
    }
  }

  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackWasSubmitted, setFeedbackWasSubmitted] = useState(false);

  const feedbackMailtoHref = useMemo(() => {
    return buildMailtoHref({
      toEmail: "fmccooe@gmail.com",
      fromEmail: feedbackEmail.trim(),
      message: feedbackText.trim(),
    });
  }, [feedbackEmail, feedbackText]);

  const feedbackIsValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedbackEmail.trim()) && feedbackText.trim().length >= 10;

  return (
    <>
      <Navigation />
      <main className="bg-transparent min-h-screen pt-24">
        <section className="relative py-12 overflow-hidden" data-bg="paper">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Research Paper</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
                The Cost of Comfort: How AI Companion Optimization May Reshape Social Learning
              </h1>

              <p className="text-lg text-muted-foreground mb-6 text-balance">
                A theoretical framework connecting RLHF-driven sycophancy to potential downstream effects on human social
                capability.
              </p>

              <div className="bg-card/50 border border-border rounded-xl p-6 mb-6 premium-card">
                <h2 className="font-semibold mb-3">Abstract</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  As AI companions become increasingly sophisticated and widely adopted, their optimization for user
                  satisfaction raises underexplored questions about social development. This paper argues that the
                  friction inherent in human social interaction—disagreement, face threats, variable feedback, and the
                  need for repair—serves critical functions in social learning that frictionless AI companions may not
                  replicate. Drawing on research from conversation analysis, neural plasticity, reinforcement learning,
                  and AI alignment, I outline a theoretical framework connecting RLHF-driven sycophancy to potential
                  downstream effects on human social capability.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="secondary"
                  className="gap-2"
                  onClick={() => setIsFullscreenOpen(true)}
                  disabled={pdfExists === false}
                >
                  <Maximize2 className="w-4 h-4" />
                  Fullscreen
                </Button>
                <a href="/paper.pdf" target="_blank" rel="noreferrer">
                  <Button variant="outline" className="gap-2" disabled={pdfExists === false}>
                    <ExternalLink className="w-4 h-4" />
                    Open PDF
                  </Button>
                </a>
                <a href="/paper.pdf" download>
                  <Button variant="outline" className="gap-2" disabled={pdfExists === false}>
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </a>
                {pdfExists === false && (
                  <span className="text-sm text-muted-foreground">
                    PDF not found at <span className="font-mono">/paper.pdf</span>
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <Separator />

        <section className="relative py-10 overflow-hidden">
          <div className="absolute inset-0 bg-background/85" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="rounded-xl border border-border bg-card/40 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border/60 bg-background/40">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Full paper (embedded PDF)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="gap-2"
                    onClick={() => setIsFullscreenOpen(true)}
                    disabled={pdfExists === false}
                  >
                    <Maximize2 className="w-4 h-4" />
                    Expand
                  </Button>
                  <a href="/paper.pdf" target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm" className="gap-2" disabled={pdfExists === false}>
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </Button>
                  </a>
                </div>
              </div>

              {pdfExists === false ? (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <p className="text-muted-foreground mb-3">
                    Paper PDF not found. Expected it at <span className="font-mono">public/paper.pdf</span>.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    If you&apos;re running locally, place the PDF at{" "}
                    <span className="font-mono">public/paper.pdf</span>.
                  </p>
                </div>
              ) : (
                <iframe
                  src="/paper.pdf"
                  title="Paper PDF"
                  className="w-full h-[78vh] sm:h-[82vh] border-0"
                />
              )}
            </div>
          </div>
        </section>

        <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
          <DialogContent className="max-w-none w-[calc(100vw-1.5rem)] h-[calc(100vh-1.5rem)] sm:w-[calc(100vw-3rem)] sm:h-[calc(100vh-3rem)] p-3 sm:p-4">
            <DialogHeader className="text-left">
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span>Paper PDF</span>
              </DialogTitle>
            </DialogHeader>
            <div className="h-full overflow-hidden rounded-lg border border-border bg-background/40">
              <iframe src="/paper.pdf" title="Paper PDF (fullscreen)" className="w-full h-full border-0" />
            </div>
          </DialogContent>
        </Dialog>

        <section className="py-12 border-t border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-xl border border-border bg-card/40 p-6 premium-card">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-muted-foreground" />
                  <h2 className="font-semibold">Ask a question</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-5">
                  I've connected to the OpenAI API here: Ask anything about the argument, assumptions, or implications. ChatGPT will try to answer using the paper + site as
                  context.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {EXAMPLE_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => askPaper(q)}
                      disabled={chatIsLoading}
                      className={cn(
                        "text-xs px-3 py-1.5 rounded-full border border-border bg-background/40 hover:bg-background/60 transition-colors",
                        chatIsLoading && "opacity-60 cursor-not-allowed"
                      )}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <div className="rounded-lg border border-border bg-background/30 overflow-hidden">
                  <ScrollArea className="h-64">
                    <div className="p-3 space-y-3">
                      {chatMessages.length === 0 ? (
                        <div className="text-sm text-muted-foreground">
                          Try one of the prompts above, or ask your own question.
                        </div>
                      ) : (
                        chatMessages.map((m, idx) => (
                          <div
                            key={`${m.role}-${idx}`}
                            className={cn(
                              "rounded-lg border px-3 py-2 text-sm leading-relaxed",
                              m.role === "user"
                                ? "bg-primary/10 border-primary/20"
                                : "bg-secondary/30 border-border"
                            )}
                          >
                            <div className="text-xs text-muted-foreground mb-1">
                              {m.role === "user" ? "You" : "Assistant"}
                            </div>
                            <div className="whitespace-pre-wrap">{m.content}</div>
                          </div>
                        ))
                      )}
                      {chatIsLoading && (
                        <div className="rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm">
                          <div className="text-xs text-muted-foreground mb-1">Assistant</div>
                          <div className="text-muted-foreground">Thinking…</div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="p-3 border-t border-border bg-background/40">
                    <form
                      className="flex items-end gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        void askPaper();
                      }}
                    >
                      <div className="flex-1">
                        <label className="sr-only" htmlFor="paper-question">
                          Ask a question
                        </label>
                        <textarea
                          id="paper-question"
                          value={chatDraft}
                          onChange={(e) => setChatDraft(e.target.value)}
                          placeholder='Ask a question (e.g. “Summarize this in 10 words.”)'
                          className="w-full min-h-[44px] max-h-32 resize-y rounded-md border border-border bg-background/30 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                          disabled={chatIsLoading}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="gap-2"
                        disabled={chatIsLoading || chatDraft.trim().length === 0}
                      >
                        <SendHorizontal className="w-4 h-4" />
                        Ask
                      </Button>
                    </form>
                    {chatError && <div className="mt-2 text-xs text-red-300">{chatError}</div>}
                    <div className="mt-2 text-xs text-muted-foreground">
                      This sends your question to OpenAI. Responses can be wrong; verify important claims.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card/40 p-6 premium-card">
                <h2 className="font-semibold mb-2">Help improve the paper (critiques welcome)</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  I'm actively looking for feedback—everything from personal anecdotes to missing citations to
                  grammar issues.
                </p>

                <form
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFeedbackWasSubmitted(true);
                    if (!feedbackIsValid) return;
                    window.location.href = feedbackMailtoHref;
                  }}
                >
                  <div>
                    <label className="text-xs text-muted-foreground" htmlFor="feedback-email">
                      Your email (so the author can reply)
                    </label>
                    <Input
                      id="feedback-email"
                      type="email"
                      placeholder="you@example.com"
                      value={feedbackEmail}
                      onChange={(e) => setFeedbackEmail(e.target.value)}
                      className="mt-1 bg-background/30"
                    />
                    {feedbackWasSubmitted && feedbackEmail.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedbackEmail.trim()) && (
                      <div className="mt-1 text-xs text-red-300">Enter a valid email address.</div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground" htmlFor="feedback-text">
                      What should be improved?
                    </label>
                    <textarea
                      id="feedback-text"
                      placeholder="Be as specific as you can—what section, what claim, what would make it better?"
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="mt-1 w-full min-h-[140px] resize-y rounded-md border border-border bg-background/30 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    />
                    {feedbackWasSubmitted && feedbackText.trim().length > 0 && feedbackText.trim().length < 10 && (
                      <div className="mt-1 text-xs text-red-300">Add a bit more detail (10+ characters).</div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button type="submit" disabled={!feedbackIsValid} className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Send feedback
                    </Button>
                    <a href={feedbackMailtoHref} className="text-xs text-muted-foreground hover:text-foreground">
                      Or open your email client manually
                    </a>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Submitting opens an email to <span className="font-mono">fmccooe@gmail.com</span>.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-semibold mb-4">Explore more</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/readings"
                className="flex items-center justify-between p-4 bg-card/50 border border-border rounded-lg hover:bg-card/80 transition-colors group"
              >
                <div>
                  <div className="font-medium">46 Readings</div>
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
