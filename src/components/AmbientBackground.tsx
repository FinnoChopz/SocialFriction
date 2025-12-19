"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { SectionKey } from "@/hooks/useActiveSection";

type AmbientKey = "hero" | "readings" | "paper" | "demos" | "footer";

interface AmbientBackgroundProps {
  activeSection?: SectionKey;
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Disruptor {
  x: number;
  y: number;
  radius: number;
  angle: number;
  speed: number;
}

interface AmbientConfig {
  accent: string;
  accent2?: string;
  gridOpacity: number;
  nodeDensity: number;
  lineDistance: number;
  lineOpacity: number;
  gatherStrength: number;
  disruptorStrength: number;
  breathing: number;
  showGrid?: boolean;
  showDiagonals?: boolean;
  showPaper?: boolean;
  showBadges?: boolean;
}

const sectionConfigs: Record<AmbientKey, AmbientConfig> = {
  hero: {
    accent: "rgba(96, 165, 250, 0.6)",
    accent2: "rgba(59, 130, 246, 0.35)",
    gridOpacity: 0.06,
    nodeDensity: 1,
    lineDistance: 170,
    lineOpacity: 0.35,
    gatherStrength: 0.08,
    disruptorStrength: 0.5,
    breathing: 1,
    showBadges: true,
  },
  readings: {
    accent: "rgba(125, 211, 252, 0.45)",
    accent2: "rgba(59, 130, 246, 0.3)",
    gridOpacity: 0.12,
    nodeDensity: 0.95,
    lineDistance: 190,
    lineOpacity: 0.32,
    gatherStrength: 0.1,
    disruptorStrength: 0.25,
    breathing: 1.1,
    showGrid: true,
  },
  paper: {
    accent: "rgba(226, 232, 240, 0.25)",
    accent2: "rgba(148, 163, 184, 0.2)",
    gridOpacity: 0.04,
    nodeDensity: 0.75,
    lineDistance: 140,
    lineOpacity: 0.18,
    gatherStrength: 0.035,
    disruptorStrength: 0.18,
    breathing: 0.45,
    showPaper: true,
  },
  demos: {
    accent: "rgba(192, 132, 252, 0.45)",
    accent2: "rgba(52, 211, 153, 0.2)",
    gridOpacity: 0.08,
    nodeDensity: 1,
    lineDistance: 175,
    lineOpacity: 0.34,
    gatherStrength: 0.085,
    disruptorStrength: 0.7,
    breathing: 1,
    showDiagonals: true,
    showBadges: true,
  },
  footer: {
    accent: "rgba(148, 163, 184, 0.35)",
    accent2: "rgba(96, 165, 250, 0.18)",
    gridOpacity: 0.03,
    nodeDensity: 0.6,
    lineDistance: 130,
    lineOpacity: 0.14,
    gatherStrength: 0.03,
    disruptorStrength: 0.1,
    breathing: 0.35,
  },
};

const badges = ["p(agree)=0.71", "reward=+0.12", "loss↓", "entropy=1.7", "grad·d=0.42"];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return prefersReducedMotion;
}

function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

function ConstellationCanvas({ configKey }: { configKey: AmbientKey }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const currentConfigRef = useRef<AmbientConfig>(sectionConfigs[configKey]);
  const targetConfigRef = useRef<AmbientConfig>(sectionConfigs[configKey]);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    targetConfigRef.current = sectionConfigs[configKey] ?? sectionConfigs.hero;
  }, [configKey]);

  useEffect(() => {
    if (!isMounted || prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = () => window.innerWidth < 768;
    const maxNodes = () => Math.floor((isMobile() ? 90 : 150) * targetConfigRef.current.nodeDensity);
    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false,
      lastMove: performance.now(),
    };
    let nodes: Node[] = [];
    let burst = { x: 0, y: 0, timeLeft: 0, duration: 1100 };
    let disruptor: Disruptor = {
      x: 0,
      y: 0,
      radius: 180,
      angle: Math.random() * Math.PI * 2,
      speed: 0.0006,
    };
    let lastTime = performance.now();
    let animationFrame: number;
    const period = 14000; // ms for gather/repel cycle
    const damping = 0.992;
    const gatherSlowdown = 0.32;
    const baseMaxSpeed = 0.16;
    const burstMaxSpeed = 1.05;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes = [];
      for (let i = 0; i < maxNodes(); i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    const resize = () => init();
    init();
    window.addEventListener("resize", resize);

    const handlePointerMove = (event: PointerEvent) => {
      pointer.active = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.lastMove = performance.now();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleClick = (event: MouseEvent) => {
      burst = { ...burst, x: event.clientX, y: event.clientY, timeLeft: burst.duration };
      pointer.active = true;
      pointer.lastMove = performance.now();
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("click", handleClick);

    const updateConfig = (dt: number) => {
      const current = currentConfigRef.current;
      const target = targetConfigRef.current;
      const factor = Math.min(1, dt * 4); // ~250ms smoothing
      currentConfigRef.current = {
        accent: target.accent,
        gridOpacity: lerp(current.gridOpacity, target.gridOpacity, factor),
        nodeDensity: lerp(current.nodeDensity, target.nodeDensity, factor),
        lineDistance: lerp(current.lineDistance, target.lineDistance, factor),
        lineOpacity: lerp(current.lineOpacity, target.lineOpacity, factor),
        gatherStrength: lerp(current.gatherStrength, target.gatherStrength, factor),
        disruptorStrength: lerp(current.disruptorStrength, target.disruptorStrength, factor),
        breathing: lerp(current.breathing, target.breathing, factor),
        showGrid: target.showGrid,
        showDiagonals: target.showDiagonals,
        showPaper: target.showPaper,
        showBadges: target.showBadges,
      };
    };

    const draw = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const config = currentConfigRef.current;
      const w = canvas.width;
      const h = canvas.height;

      updateConfig(dt);

       // adjust node count toward target smoothly
      const desired = Math.floor((isMobile() ? 90 : 150) * targetConfigRef.current.nodeDensity);
      if (nodes.length < desired) {
        const toAdd = Math.min(desired - nodes.length, 5);
        for (let i = 0; i < toAdd; i++) {
          nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
          });
        }
      } else if (nodes.length > desired) {
        nodes.length = desired;
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (pointer.active && now - pointer.lastMove > 2400) {
        pointer.active = false;
      }

      const phase = Math.sin(((now % period) / period) * Math.PI * 2);
      const k = config.gatherStrength * gatherSlowdown * config.breathing * phase;
      const cx = w / 2;
      const cy = h / 2;
      const speedLimit = burst.timeLeft > 0 ? burstMaxSpeed : baseMaxSpeed;
      const cursorRadius = isMobile() ? 160 : 220;
      const burstFalloff = isMobile() ? 190 : 260;

      // move disruptor along a slow lemniscate-like path
      disruptor.angle += config.disruptorStrength * 0.001;
      disruptor.x = cx + Math.cos(disruptor.angle) * (w * 0.2);
      disruptor.y = cy + Math.sin(disruptor.angle * 0.9) * (h * 0.18);
      disruptor.radius = isMobile() ? 120 : 180;
      const ux = Math.cos(disruptor.angle);
      const uy = Math.sin(disruptor.angle);

      for (const node of nodes) {
        // breathing force toward/away from center
        const dx = cx - node.x;
        const dy = cy - node.y;
        node.vx += dx * k * dt;
        node.vy += dy * k * dt;

        // disruptor steering
        const ddx = disruptor.x - node.x;
        const ddy = disruptor.y - node.y;
        const dist = Math.hypot(ddx, ddy);
        if (dist < disruptor.radius) {
          const strength = config.disruptorStrength * Math.pow(1 - dist / disruptor.radius, 2);
          node.vx += ux * strength * dt;
          node.vy += uy * strength * dt;
          // subtle perpendicular swirl
          const perpX = -uy;
          const perpY = ux;
          node.vx += perpX * strength * 0.25 * Math.sin(now * 0.0007);
          node.vy += perpY * strength * 0.25 * Math.cos(now * 0.0007);
        }

        if (pointer.active) {
          const pdx = pointer.x - node.x;
          const pdy = pointer.y - node.y;
          const pdist = Math.hypot(pdx, pdy) || 1;
          const pull = Math.max(0, 1 - pdist / cursorRadius);
          if (pull > 0) {
            const influence = 0.34 * pull * pull + 0.05 * pull;
            node.vx += pdx * influence * dt;
            node.vy += pdy * influence * dt;
          }
        }

        if (burst.timeLeft > 0) {
          const bdx = node.x - burst.x;
          const bdy = node.y - burst.y;
          const bdist = Math.hypot(bdx, bdy) || 1;
          const wave = burst.timeLeft / burst.duration;
          const falloff = Math.exp(-bdist / burstFalloff);
          const impulse = 150 * wave * falloff * dt;
          node.vx += (bdx / bdist) * impulse;
          node.vy += (bdy / bdist) * impulse;
        }

        // damping and clamp
        node.vx *= damping;
        node.vy *= damping;
        const speed = Math.hypot(node.vx, node.vy);
        if (speed > speedLimit) {
          node.vx = (node.vx / speed) * speedLimit;
          node.vy = (node.vy / speed) * speedLimit;
        }

        node.x += node.vx + (Math.random() - 0.5) * 0.01;
        node.y += node.vy + (Math.random() - 0.5) * 0.01;

        // wrap edges
        if (node.x < 0) node.x += w;
        if (node.x > w) node.x -= w;
        if (node.y < 0) node.y += h;
        if (node.y > h) node.y -= h;
      }

      if (burst.timeLeft > 0) {
        burst.timeLeft = Math.max(0, burst.timeLeft - dt * 1000);
      }

      // connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < config.lineDistance) {
            const alpha = (1 - dist / config.lineDistance) * config.lineOpacity;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const node of nodes) {
        ctx.fillStyle = Math.random() < 0.02 ? config.accent : "rgba(255,255,255,0.38)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, isMobile() ? 1.2 : 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (pointer.active) {
        ctx.strokeStyle = `${config.accent.replace("0.", "0.28")}`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        const halo = (isMobile() ? 80 : 100) + Math.sin(now * 0.006) * 6;
        ctx.arc(pointer.x, pointer.y, halo, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (burst.timeLeft > 0) {
        const life = burst.timeLeft / burst.duration;
        ctx.strokeStyle = `rgba(255,255,255,${0.25 * life})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        const rippleRadius = (1 - life) * (isMobile() ? 140 : 200) + 35;
        ctx.arc(burst.x, burst.y, rippleRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // disruptor ring
      ctx.strokeStyle = `${config.accent.replace("0.", "0.2")}`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(disruptor.x, disruptor.y, disruptor.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = config.accent;
      ctx.beginPath();
      ctx.arc(disruptor.x, disruptor.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.font = "10px var(--font-jetbrains, monospace)";
      ctx.textAlign = "center";
      ctx.fillText("model", disruptor.x, disruptor.y - 12);

      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrame);
    };
  }, [configKey, isMounted, prefersReducedMotion]);

  if (!isMounted || prefersReducedMotion) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-75 mix-blend-screen pointer-events-none"
      aria-hidden
    />
  );
}

function NumbersWhisper({ active }: { active: AmbientKey }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [badge, setBadge] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || (active !== "hero" && active !== "demos")) {
      setBadge(null);
      return;
    }
    let timeout: number;
    const schedule = () => {
      const delay = 8000 + Math.random() * 4000;
      timeout = window.setTimeout(() => {
        setBadge(badges[Math.floor(Math.random() * badges.length)]);
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, [active, prefersReducedMotion]);

  useEffect(() => {
    if (!badge) return;
    const timer = window.setTimeout(() => setBadge(null), 4500);
    return () => clearTimeout(timer);
  }, [badge]);

  if (!badge) return null;
  return (
    <span
      className="ambient-badge"
      style={{
        left: `${15 + Math.random() * 70}%`,
        top: `${20 + Math.random() * 50}%`,
      }}
    >
      {badge}
    </span>
  );
}

export function AmbientBackground({ activeSection = "hero", className }: AmbientBackgroundProps) {
  const pathname = usePathname();
  const key: AmbientKey = (["hero", "readings", "paper", "demos", "footer"].includes(activeSection)
    ? activeSection
    : "hero") as AmbientKey;

  const disableBadges = pathname?.startsWith("/walkthrough");

  return (
    <div
      className={cn(
        "fixed inset-0 z-9 pointer-events-none overflow-hidden ambient-root",
        className
      )}
      data-ambient={key}
      style={
        {
          "--ambient-accent": sectionConfigs[key].accent,
          "--ambient-accent-2": sectionConfigs[key].accent2 ?? sectionConfigs[key].accent,
        } as React.CSSProperties
      }
    >
      <div className="ambient-gradient" />
      <div className="ambient-vignette" />
      {sectionConfigs[key].showGrid && <div className="ambient-grid" style={{ opacity: sectionConfigs[key].gridOpacity }} />}
      {sectionConfigs[key].showDiagonals && <div className="ambient-diagonals" />}
      {sectionConfigs[key].showPaper && <div className="ambient-paper" />}
      <div className="ambient-noise" />
      <div className="ambient-scanlines" />
      <ConstellationCanvas configKey={key} />
      {sectionConfigs[key].showBadges && !disableBadges && <NumbersWhisper active={key} />}
    </div>
  );
}
