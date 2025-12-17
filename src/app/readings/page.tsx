"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { readingGroups, readings, getAllTags, getReadingsByGroup } from "@/content/readings";
import { Search, ArrowRight, BookOpen } from "lucide-react";

export default function ReadingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const allTags = getAllTags();

  // Filter groups based on search and tags
  const filteredGroups = useMemo(() => {
    return readingGroups.filter((group) => {
      // Tag filter
      if (selectedTags.length > 0) {
        const hasTag = selectedTags.some((tag) => group.themeTags.includes(tag));
        if (!hasTag) return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const groupReadings = getReadingsByGroup(group.slug);

        // Search in group title/subtitle
        if (
          group.title.toLowerCase().includes(query) ||
          group.subtitle.toLowerCase().includes(query)
        ) {
          return true;
        }

        // Search in readings within group
        return groupReadings.some(
          (r) =>
            r.title.toLowerCase().includes(query) ||
            r.authors.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <Navigation />
      <main className="bg-background min-h-screen pt-24">
        {/* Header */}
        <section className="relative py-16 overflow-hidden" data-bg="readings">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Reading Library</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">46 Readings</h1>
              <p className="text-lg text-muted-foreground">
                Academic literature organized into 9 thematic clusters. Each reading includes
                a citation, source links, and my notes on why it matters for understanding
                AI companionship and social friction.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search titles, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/30"
              />
            </div>

            {/* Tag filters */}
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer transition-colors"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Groups Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group, index) => {
                const groupReadings = getReadingsByGroup(group.slug);
                return (
                  <motion.div
                    key={group.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link href={`/readings/${group.slug}`}>
                      <Card className="premium-card shine-effect h-full p-6 bg-card/50 border-border group">
                        <div className="flex items-start justify-between mb-4">
                          <span className="font-mono text-xs text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {groupReadings.length} readings
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors">
                          {group.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {group.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {group.themeTags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 bg-secondary/50 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          View group
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {filteredGroups.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No groups match your search. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Note about access */}
        <section className="py-8 border-t border-border/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-muted-foreground">
              Many papers are paywalled; this site links to official sources and hosts only
              my commentary. Check your institution&apos;s library access for full texts.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
