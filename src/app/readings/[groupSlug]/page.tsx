"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getGroup, getReadingsByGroup } from "@/content/readings";
import { ArrowLeft, ExternalLink, FileText, ChevronRight } from "lucide-react";

export default function GroupPage() {
  const params = useParams();
  const groupSlug = params.groupSlug as string;

  const group = getGroup(groupSlug);
  const groupReadings = getReadingsByGroup(groupSlug);

  if (!group) {
    return (
      <>
        <Navigation />
        <main className="bg-transparent min-h-screen pt-24">
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Group not found</h1>
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
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back link */}
            <Link
              href="/readings"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All readings
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {group.themeTags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-4">{group.title}</h1>

              <p className="text-lg text-muted-foreground mb-4">{group.subtitle}</p>

              <p className="text-muted-foreground">{group.longDescription}</p>
            </motion.div>
          </div>
        </section>

        {/* Readings List */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="font-mono text-sm text-muted-foreground">
                {groupReadings.length} readings in this cluster
              </span>
            </div>

            <div className="space-y-4">
              {groupReadings.map((reading, index) => (
                <motion.div
                  key={reading.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="p-6 bg-card/50 border-border hover:bg-card/80 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/readings/${groupSlug}/${reading.slug}`}
                          className="group"
                        >
                          <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
                            {reading.title}
                          </h3>
                        </Link>

                        <p className="text-sm text-muted-foreground mb-2">
                          {reading.authors} ({reading.year})
                        </p>

                        <p className="text-sm mb-3">
                          <span className="font-semibold text-foreground">TL;DR:</span>{" "}
                          <span className="text-muted-foreground">{reading.oneLineSummary}</span>
                        </p>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{reading.venue}</span>
                          {reading.needsLink && (
                            <Badge variant="outline" className="text-yellow-500 border-yellow-500/30">
                              Link needed
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-row sm:flex-col gap-2">
                        {(reading.externalLinks.doi || reading.externalLinks.url || reading.externalLinks.pdf) && (
                          <a
                            href={reading.externalLinks.doi || reading.externalLinks.url || reading.externalLinks.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex"
                          >
                            <Button variant="outline" size="sm" className="gap-1">
                              <ExternalLink className="w-3 h-3" />
                              Source
                            </Button>
                          </a>
                        )}
                        <Link href={`/readings/${groupSlug}/${reading.slug}`}>
                          <Button variant="secondary" size="sm" className="gap-1">
                            <FileText className="w-3 h-3" />
                            My notes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation to other groups */}
        <section className="py-12 border-t border-border/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-semibold mb-4">Explore other clusters</h3>
            <div className="flex flex-wrap gap-2">
              <Link href="/readings">
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary transition-colors">
                  View all
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Badge>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
