"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, RotateCcw } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/home", label: "Home" },
  { href: "/readings", label: "Readings" },
  { href: "/paper", label: "Paper" },
  { href: "/demos", label: "Demos" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Don't show nav on welcome or walkthrough pages
  if (pathname === "/" || pathname === "/walkthrough") {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 nav-ambient backdrop-blur-xl"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/home"
            className="flex items-center gap-3 group focus-visible-ring rounded-md"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-sm font-bold text-white/90">SF</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-foreground">Social Friction Lab</span>
              <span className="hidden lg:inline text-xs text-muted-foreground ml-2">
                AI companionship, sycophancy, and the cost of comfort.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className="focus-visible-ring"
                  >
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <div className="w-px h-6 bg-border mx-2" />
            <Link href="/walkthrough">
              <Button variant="ghost" size="sm" className="text-muted-foreground focus-visible-ring">
                <RotateCcw className="w-4 h-4 mr-1" />
                Redo Walkthrough
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden focus-visible-ring"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-border/50"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start focus-visible-ring"
                    >
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
              <div className="h-px bg-border my-2" />
              <Link href="/walkthrough" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground focus-visible-ring">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Redo Walkthrough
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
