"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AmbientVariant = "hero" | "readings" | "paper" | "demos";

interface AmbientBackgroundProps {
  variant?: AmbientVariant;
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulseUntil: number;
}

const accentByVariant: Record<AmbientVariant, string> = {
  hero: "rgba(96, 165, 250, 0.4)", // blue
  readings: "rgba(125, 211, 252, 0.35)", // sky
  paper: "rgba(226, 232, 240, 0.22)", // slate-light
  demos: "rgba(192, 132, 252, 0.35)", // purple
};

const lineDistanceByVariant: Record<AmbientVariant, number> = {
  hero: 160,
  readings: 180,
  paper: 150,
  demos: 170,
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

function ConstellationCanvas({ variant }: { variant: AmbientVariant }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const nodes: Node[] = [];
    const isMobile = window.innerWidth < 768;
    const maxNodes = isMobile ? 70 : 130;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes.length = 0;
      for (let i = 0; i < maxNodes; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          pulseUntil: 0,
        });
      }
    };

    const resize = () => {
      init();
    };

    init();
    window.addEventListener("resize", resize);

    const accent = accentByVariant[variant];
    const lineDistance = lineDistanceByVariant[variant];

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around edges
        if (node.x < -20) node.x = canvas.width + 20;
        if (node.x > canvas.width + 20) node.x = -20;
        if (node.y < -20) node.y = canvas.height + 20;
        if (node.y > canvas.height + 20) node.y = -20;

        // Occasional pulse
        if (Math.random() < 0.002 && node.pulseUntil < performance.now()) {
          node.pulseUntil = performance.now() + 800;
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < lineDistance) {
            const alpha = (1 - dist / lineDistance) * 0.25;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulsing = node.pulseUntil > performance.now();
        const baseRadius = isMobile ? 1.2 : 1.6;
        const radius = pulsing ? baseRadius + 1.2 : baseRadius;
        const alpha = pulsing ? 0.8 : 0.45;
        ctx.fillStyle = pulsing ? accent : "rgba(255,255,255,0.35)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMounted, prefersReducedMotion, variant]);

  if (!isMounted || prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
      aria-hidden
    />
  );
}

function FloatingBadges() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  const badges = useMemo(
    () => [
      "p(agree)=0.71",
      "reward=+0.12",
      "loss ↓",
      "entropy=1.7",
      "p(disagree)=0.09",
      "grad · d = 0.42",
    ],
    []
  );

  if (!isMounted || prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {badges.map((text, i) => {
        const left = 5 + (i * 17) % 80;
        const top = 15 + (i * 23) % 60;
        const delay = i * 1.4;
        return (
          <span
            key={text + i}
            className="ambient-badge"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
            }}
          >
            {text}
          </span>
        );
      })}
    </div>
  );
}

export function AmbientBackground({ variant = "hero", className }: AmbientBackgroundProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 pointer-events-none overflow-hidden ambient-root",
        className
      )}
      data-ambient={variant}
    >
      <div className="ambient-gradient" />
      <div className="ambient-vignette" />
      {variant === "readings" && <div className="ambient-grid" />}
      {variant === "paper" && <div className="ambient-paper" />}
      {variant === "demos" && <div className="ambient-diagonals" />}
      <div className="ambient-noise" />
      <div className="ambient-scanlines" />
      <ConstellationCanvas variant={variant} />
      {variant === "hero" && <FloatingBadges />}
    </div>
  );
}
