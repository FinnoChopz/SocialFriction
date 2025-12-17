"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-sm font-bold text-white/90">SF</span>
              </div>
              <span className="font-semibold">Social Friction Lab</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              A research final project exploring AI companionship, sycophancy, and the cost of
              comfort. How do systems optimized for user satisfaction reshape social learning
              and truth-seeking?
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Navigate</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/home" className="hover:text-foreground transition-colors focus-visible-ring rounded">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/readings" className="hover:text-foreground transition-colors focus-visible-ring rounded">
                  Readings
                </Link>
              </li>
              <li>
                <Link href="/paper" className="hover:text-foreground transition-colors focus-visible-ring rounded">
                  Paper
                </Link>
              </li>
              <li>
                <Link href="/demos" className="hover:text-foreground transition-colors focus-visible-ring rounded">
                  Demos
                </Link>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">More</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors focus-visible-ring rounded">
                  About
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-foreground transition-colors focus-visible-ring rounded">
                  Safety & Limitations
                </Link>
              </li>
              <li>
                <Link href="/walkthrough" className="hover:text-foreground transition-colors focus-visible-ring rounded">
                  Redo Walkthrough
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>Research Final Project, 2025</p>
          <p className="mono-numbers">
            Built with Next.js, Tailwind, and Framer Motion. Created by Finn McCooe; advised by Dr. Anthony Ong.
          </p>
        </div>
      </div>
    </footer>
  );
}
