"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  group: number;
}

interface FloatingBadge {
  x: number;
  y: number;
  text: string;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

interface ParticleCanvasProps {
  className?: string;
  density?: number;
}

const GROUP_COLORS = ["#60a5fa", "#a855f7", "#34d399", "#f59e0b", "#38bdf8"];
const BADGE_COLORS = ["#60a5fa", "#a855f7", "#34d399", "#f59e0b", "#38bdf8"];
const BADGE_TEXTS = [
  "P(reward)=0.82",
  "agreeableness ↑",
  "p(truth)=0.41",
  "comfort bias",
  "entropy 1.7",
  "logits → softness",
  "grad⋅d = 0.42",
  "p(critique)=0.12",
];

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ParticleCanvas({ className, density = 1 }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const badgesRef = useRef<FloatingBadge[]>([]);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const dprRef = useRef(1);
  const pointerRef = useRef({ x: 0, y: 0, active: false, lastMove: 0 });
  const burstRef = useRef({ x: 0, y: 0, timeLeft: 0, duration: 900 });

  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      const baseCount = Math.floor((width * height) / 9000 * density);
      const numParticles = Math.max(60, Math.min(140, baseCount));

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 1.5 + 1.2,
          opacity: Math.random() * 0.5 + 0.35,
          group: Math.floor(Math.random() * GROUP_COLORS.length),
        });
      }
      return particles;
    },
    [density]
  );

  const spawnBadge = useCallback((width: number, height: number) => {
    const color = BADGE_COLORS[Math.floor(Math.random() * BADGE_COLORS.length)];
    const badge: FloatingBadge = {
      x: Math.random() * (width - 150) + 75,
      y: Math.random() * (height - 120) + 60,
      text: BADGE_TEXTS[Math.floor(Math.random() * BADGE_TEXTS.length)],
      color,
      opacity: 0,
      life: 0,
      maxLife: 200,
    };
    return badge;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      particlesRef.current = initParticles(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handlePointerMove = (event: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.active = true;
      pointerRef.current.x = event.clientX - rect.left;
      pointerRef.current.y = event.clientY - rect.top;
      pointerRef.current.lastMove = performance.now();
    };

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      burstRef.current.x = event.clientX - rect.left;
      burstRef.current.y = event.clientY - rect.top;
      burstRef.current.timeLeft = burstRef.current.duration;
      pointerRef.current.active = true;
      pointerRef.current.lastMove = performance.now();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("click", handleClick);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = dprRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.globalCompositeOperation = "screen";

      timeRef.current++;
      if (pointerRef.current.active && performance.now() - pointerRef.current.lastMove > 2400) {
        pointerRef.current.active = false;
      }

      const bondCycle = (Math.sin(timeRef.current * 0.008) + 1) / 2;
      const clusterDimming = Math.max(0.56, 0.82 - bondCycle * 0.26);
      const particleAlphaBase = Math.max(0.32, (0.55 + bondCycle * 0.35) * clusterDimming);
      const connectionAlphaBase = Math.max(0.14, (0.18 + bondCycle * 0.22) * clusterDimming);
      const sparkleAlpha = Math.max(0.42, 0.9 * (clusterDimming + 0.08));
      const connectionDistance = 70 + bondCycle * 60;
      const cohesionStrength = 0.0035 + bondCycle * 0.0028;
      const separationStrength = 0.0028 + (1 - bondCycle) * 0.0022;
      const maxSpeed = 0.18;
      const jitter = 0.03;
      const cursorRadius = Math.min(240, Math.max(150, rect.width * 0.22));

      if (timeRef.current % 260 === 0 && particlesRef.current.length > 0) {
        const idx = Math.floor(Math.random() * particlesRef.current.length);
        particlesRef.current[idx].group = Math.floor(Math.random() * GROUP_COLORS.length);
      }

      // Spawn new badges occasionally
      if (timeRef.current % 110 === 0 && badgesRef.current.length < 3) {
        badgesRef.current.push(spawnBadge(rect.width, rect.height));
      }

      // Update and draw particles
      const groupCenters: { x: number; y: number; count: number }[] = GROUP_COLORS.map(() => ({
        x: 0,
        y: 0,
        count: 0,
      }));

      particlesRef.current.forEach((p) => {
        groupCenters[p.group].x += p.x;
        groupCenters[p.group].y += p.y;
        groupCenters[p.group].count++;
      });

      groupCenters.forEach((g) => {
        if (g.count > 0) {
          g.x /= g.count;
          g.y /= g.count;
        }
      });

      particlesRef.current.forEach((p) => {
        const center = groupCenters[p.group];
        const dx = center.x - p.x;
        const dy = center.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist > 90) {
          p.vx += (dx / dist) * cohesionStrength;
          p.vy += (dy / dist) * cohesionStrength;
        } else if (dist < 28) {
          p.vx -= (dx / dist) * separationStrength;
          p.vy -= (dy / dist) * separationStrength;
        }

        if (pointerRef.current.active) {
          const pdx = pointerRef.current.x - p.x;
          const pdy = pointerRef.current.y - p.y;
          const pdist = Math.hypot(pdx, pdy) || 1;
          const pull = Math.max(0, 1 - pdist / cursorRadius);
          if (pull > 0) {
            const influence = 0.012 * pull * pull;
            p.vx += pdx * influence;
            p.vy += pdy * influence;
          }
        }

        if (burstRef.current.timeLeft > 0) {
          const bdx = p.x - burstRef.current.x;
          const bdy = p.y - burstRef.current.y;
          const bdist = Math.hypot(bdx, bdy) || 1;
          const wave = burstRef.current.timeLeft / burstRef.current.duration;
          const falloff = Math.exp(-bdist / 240);
          const impulse = 0.85 * wave * falloff;
          p.vx += (bdx / bdist) * impulse;
          p.vy += (bdy / bdist) * impulse;
        }

        p.x += p.vx + (Math.random() - 0.5) * jitter;
        p.y += p.vy + (Math.random() - 0.5) * jitter;

        p.vx *= 0.982;
        p.vy *= 0.982;

        const speed = Math.hypot(p.vx, p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        if (p.x < 0 || p.x > rect.width) p.vx *= -1;
        if (p.y < 0 || p.y > rect.height) p.vy *= -1;

        p.x = Math.max(0, Math.min(rect.width, p.x));
        p.y = Math.max(0, Math.min(rect.height, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const sparkle = Math.random() < 0.04;
        const color = sparkle
          ? hexToRgba(GROUP_COLORS[p.group], sparkleAlpha)
          : `rgba(255, 255, 255, ${particleAlphaBase})`;
        ctx.fillStyle = color;
        ctx.fill();
      });

      if (burstRef.current.timeLeft > 0) {
        burstRef.current.timeLeft = Math.max(0, burstRef.current.timeLeft - 16.67);
      }

      if (pointerRef.current.active) {
        ctx.strokeStyle = `rgba(255,255,255,${0.14 + bondCycle * 0.08})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        const halo = 64 + Math.sin(timeRef.current * 0.18) * 4;
        ctx.arc(pointerRef.current.x, pointerRef.current.y, halo, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (burstRef.current.timeLeft > 0) {
        const life = burstRef.current.timeLeft / burstRef.current.duration;
        ctx.strokeStyle = `rgba(255,255,255,${0.22 * life})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        const rippleRadius = (1 - life) * 220 + 30;
        ctx.arc(burstRef.current.x, burstRef.current.y, rippleRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const sameGroup = p1.group === p2.group;
          const maxDistance = sameGroup ? connectionDistance : connectionDistance * 0.75;

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = connectionAlphaBase * (1 - dist / maxDistance);
            const color = sameGroup
              ? hexToRgba(GROUP_COLORS[p1.group], alpha)
              : `rgba(255, 255, 255, ${alpha * 0.7})`;
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.6 + bondCycle * 0.5;
            ctx.stroke();
          }
        });
      });

      badgesRef.current = badgesRef.current.filter((badge) => {
        badge.life++;

        if (badge.life < 30) {
          badge.opacity = badge.life / 30;
        } else if (badge.life > badge.maxLife - 30) {
          badge.opacity = (badge.maxLife - badge.life) / 30;
        } else {
          badge.opacity = 1;
        }

        badge.y -= 0.14;

        ctx.save();
        ctx.shadowColor = hexToRgba(badge.color, 0.25 * badge.opacity);
        ctx.shadowBlur = 12;
        ctx.font = "12px var(--font-jetbrains), monospace";

        const metrics = ctx.measureText(badge.text);
        const padding = 8;
        const width = metrics.width + padding * 2;
        const height = 24;

        ctx.fillStyle = hexToRgba(badge.color, 0.12 * badge.opacity + 0.04);
        ctx.beginPath();
        ctx.roundRect(badge.x - width / 2, badge.y - height / 2, width, height, 6);
        ctx.fill();

        ctx.strokeStyle = hexToRgba(badge.color, 0.55 * badge.opacity + 0.08);
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = hexToRgba("#e5e7eb", 0.9 * badge.opacity);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(badge.text, badge.x, badge.y);

        ctx.restore();

        return badge.life < badge.maxLife;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      animate();
    } else {
      const rect = canvas.getBoundingClientRect();
      const dpr = dprRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("click", handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, spawnBadge]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn(
        className?.match(/\b(static|fixed|absolute|relative|sticky)\b/)
          ? "inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-80"
          : "absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-80",
        className
      )}
      aria-hidden="true"
    />
  );
}
