"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getReading, getGroup } from "@/content/readings";
import { ArrowLeft, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function ReadingPage() {
  const params = useParams();
  const groupSlug = params.groupSlug as string;
  const readingSlug = params.readingSlug as string;
  const [copied, setCopied] = useState(false);

  const reading = getReading(groupSlug, readingSlug);
  const group = getGroup(groupSlug);

  const copyToClipboard = async () => {
    if (reading) {
      await navigator.clipboard.writeText(reading.fullCitation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!reading || !group) {
    return (
      <>
        <Navigation />
        <main className="bg-transparent min-h-screen pt-24">
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Reading not found</h1>
            <Link href="/readings">
              <Button variant="outline">Back to readings</Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="bg-transparent min-h-screen pt-24">
        {/* Header */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/readings" className="hover:text-foreground transition-colors">
                Readings
              </Link>
              <span>/</span>
              <Link
                href={`/readings/${groupSlug}`}
                className="hover:text-foreground transition-colors"
              >
                {group.title}
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{reading.title}</h1>

              <p className="text-lg text-muted-foreground mb-2">
                {reading.authors} ({reading.year})
              </p>

              <p className="text-sm text-muted-foreground mb-6">{reading.venue}</p>

              {/* Citation block */}
              <Card className="p-4 bg-secondary/30 mb-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-muted-foreground font-mono">
                    {reading.fullCitation}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex-shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </Card>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {reading.externalLinks.doi && (
                  <a
                    href={reading.externalLinks.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      DOI
                    </Button>
                  </a>
                )}
                {reading.externalLinks.pdf && (
                  <a
                    href={reading.externalLinks.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      PDF
                    </Button>
                  </a>
                )}
                {reading.externalLinks.url && !reading.externalLinks.doi && (
                  <a
                    href={reading.externalLinks.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Source
                    </Button>
                  </a>
                )}
              </div>

              {reading.needsLink && (
                <div className="mt-4">
                  <Badge variant="outline" className="text-yellow-500 border-yellow-500/30">
                    Link needs verification
                  </Badge>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        <Separator />

        {/* Discussion Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {reading.discussion ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Core Idea */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm text-blue-400">
                      1
                    </span>
                    Core Idea
                  </h2>
                  <div className="pl-10">
                    <p className="text-muted-foreground leading-relaxed">
                      {reading.discussion.coreIdea}
                    </p>
                  </div>
                </div>

                {/* What question is it answering? */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-sm text-green-400">
                      2
                    </span>
                    What question is it answering?
                  </h2>
                  <div className="pl-10">
                    <p className="text-muted-foreground leading-relaxed">
                      {reading.discussion.questionAnswered}
                    </p>
                  </div>
                </div>

                {/* Why it matters */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-sm text-purple-400">
                      3
                    </span>
                    Why it matters for this project
                  </h2>
                  <div className="pl-10">
                    <p className="text-muted-foreground leading-relaxed">
                      {reading.discussion.whyItMatters}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">Notes coming soon</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Discussion notes for this reading haven&apos;t been added yet. Check
                  back later, or see <code className="text-xs bg-secondary px-1 py-0.5 rounded">
                    src/content/readings.ts
                  </code> to add your own.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Navigation */}
        <section className="py-12 border-t border-border/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={`/readings/${groupSlug}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {group.title}
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
