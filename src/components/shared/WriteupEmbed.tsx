"use client";

import { FileText, ExternalLink, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Accent = "blue" | "purple";

const accentStyles: Record<Accent, { chip: string; iconBg: string; iconFg: string }> = {
  blue: {
    chip: "bg-blue-500/10 text-blue-300 border-blue-500/25",
    iconBg: "bg-blue-500/15",
    iconFg: "text-blue-300",
  },
  purple: {
    chip: "bg-purple-500/10 text-purple-300 border-purple-500/25",
    iconBg: "bg-purple-500/15",
    iconFg: "text-purple-300",
  },
};

export function WriteupEmbed({
  title,
  description,
  pdfHref,
  accent = "blue",
}: {
  title: string;
  description: string;
  pdfHref: string;
  accent?: Accent;
}) {
  const styles = accentStyles[accent];

  return (
    <Dialog>
      <Card className="premium-card shine-effect p-0 bg-card/50 border-border overflow-hidden">
        <div className="relative p-6 sm:p-8">
          <div
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{
              background:
                accent === "blue"
                  ? "radial-gradient(800px 220px at 20% 0%, rgba(96, 165, 250, 0.16), transparent 60%), radial-gradient(900px 260px at 80% 100%, rgba(192, 132, 252, 0.12), transparent 55%)"
                  : "radial-gradient(800px 220px at 20% 0%, rgba(192, 132, 252, 0.16), transparent 60%), radial-gradient(900px 260px at 80% 100%, rgba(96, 165, 250, 0.12), transparent 55%)",
            }}
          />

          <div className="relative flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Paper stack */}
            <div className="relative w-28 h-36 flex-shrink-0">
              <div className="absolute inset-0 rounded-xl border border-border/70 bg-secondary/30 rotate-[-5deg] translate-x-1 translate-y-1" />
              <div className="absolute inset-0 rounded-xl border border-border/70 bg-secondary/20 rotate-[3deg] translate-x-0.5 translate-y-0.5" />
              <div className="absolute inset-0 rounded-xl border border-border bg-background/40">
                <div className="h-full flex flex-col items-center justify-center gap-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${styles.iconBg}`}>
                    <FileText className={`w-5 h-5 ${styles.iconFg}`} />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${styles.chip}`}>
                    PDF writeup
                  </span>
                </div>
              </div>
            </div>

            {/* Copy + actions */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground mb-5">{description}</p>

              <div className="flex flex-wrap gap-2">
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <FileText className="w-4 h-4" />
                    Preview
                  </Button>
                </DialogTrigger>
                <Button asChild variant="outline" className="gap-2">
                  <a href={pdfHref} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Open PDF
                  </a>
                </Button>
                <Button asChild variant="ghost" className="gap-2">
                  <a href={pdfHref} download>
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <DialogContent className="sm:max-w-6xl w-[calc(100%-2rem)] h-[88vh] p-0">
        <div className="flex flex-col h-full">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-6 flex-1 min-h-0">
            <ScrollArea className="h-full rounded-lg border border-border bg-secondary/20">
              <iframe
                src={pdfHref}
                className="w-full h-[72vh] min-h-[420px] rounded-lg"
                title={`${title} PDF preview`}
              />
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
