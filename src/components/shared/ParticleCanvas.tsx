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
  clickBehavior?: "burst" | "toggleAttractor" | "none";
  ignoreInteractiveClicks?: boolean;
  showBadges?: boolean;
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

export function ParticleCanvas({
  className,
  density = 1,
  clickBehavior = "burst",
  ignoreInteractiveClicks,
  showBadges = true,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const badgesRef = useRef<FloatingBadge[]>([]);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const dprRef = useRef(1);
  const pointerRef = useRef({ x: 0, y: 0, active: false, lastMove: 0 });
  const burstRef = useRef({
    x: 0,
    y: 0,
    timeLeft: 0,
    duration: 900,
    power: 1,
    falloffRadius: 240,
  });
  const attractorEnabledRef = useRef(true);
  const structureRef = useRef(0);
  const shouldIgnoreInteractiveClicks =
    ignoreInteractiveClicks ?? clickBehavior === "toggleAttractor";

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
      if (event.button !== 0) return;

      const target = event.target;
      const targetElement =
        target instanceof Element
          ? target
          : (target as { parentElement?: Element | null })?.parentElement ?? null;
      const isInteractive = targetElement
        ? Boolean(
            targetElement.closest(
              'a,button,input,textarea,select,summary,[role="button"],[role="link"],[role="tab"],[data-particle-ignore-click]'
            )
          )
        : false;
      if (shouldIgnoreInteractiveClicks && isInteractive) return;

      const rect = canvas.getBoundingClientRect();
      pointerRef.current.active = true;
      pointerRef.current.x = event.clientX - rect.left;
      pointerRef.current.y = event.clientY - rect.top;
      pointerRef.current.lastMove = performance.now();

      if (clickBehavior === "burst") {
        burstRef.current.x = pointerRef.current.x;
        burstRef.current.y = pointerRef.current.y;
        burstRef.current.duration = 900;
        burstRef.current.power = 1;
        burstRef.current.falloffRadius = 240;
        burstRef.current.timeLeft = burstRef.current.duration;
        return;
      }

      if (clickBehavior === "toggleAttractor") {
        const nextEnabled = !attractorEnabledRef.current;
        attractorEnabledRef.current = nextEnabled;

        burstRef.current.x = pointerRef.current.x;
        burstRef.current.y = pointerRef.current.y;

        if (!nextEnabled) {
          burstRef.current.duration = 1100;
          burstRef.current.power = 2.6;
          burstRef.current.falloffRadius = 360;
        } else {
          burstRef.current.duration = 900;
          burstRef.current.power = 1;
          burstRef.current.falloffRadius = 240;
        }

        burstRef.current.timeLeft = burstRef.current.duration;
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    if (clickBehavior !== "none") {
      window.addEventListener("click", handleClick);
    }

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
      if (showBadges) {
        if (timeRef.current % 110 === 0 && badgesRef.current.length < 3) {
          badgesRef.current.push(spawnBadge(rect.width, rect.height));
        }
      } else if (badgesRef.current.length > 0) {
        badgesRef.current = [];
      }

      // Update and draw particles
      const groupCenters: { x: number; y: number; count: number }[] = GROUP_COLORS.map(() => ({
        x: 0,
        y: 0,
        count: 0,
      }));

      const particles = particlesRef.current;
      particles.forEach((p) => {
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

      // Detect when clusters have coalesced into a stable structure so we can
      // subtly boost color/edge visibility only after a threshold.
      let spreadSum = 0;
      particles.forEach((p) => {
        const center = groupCenters[p.group];
        const dx = p.x - center.x;
        const dy = p.y - center.y;
        spreadSum += Math.hypot(dx, dy);
      });
      const spreadAvg = spreadSum / Math.max(1, particles.length);
      const minDim = Math.min(rect.width, rect.height);
      const spreadLow = Math.max(34, minDim * 0.07);
      const spreadHigh = Math.max(110, minDim * 0.2);
      const spreadT = Math.min(1, Math.max(0, (spreadAvg - spreadLow) / (spreadHigh - spreadLow)));
      const structureStrength = 1 - spreadT;
      structureRef.current += (structureStrength - structureRef.current) * 0.03;
      const boostT = Math.min(
        1,
        Math.max(0, (structureRef.current - 0.82) / (0.95 - 0.82))
      );
      const structureBoost = boostT * boostT * (3 - 2 * boostT);

      // Maintain a small minimum distance so clusters form structure instead of collapsing to a point.
      const minGap = 7;
      const repulsionStrength = 0.018;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;
          const minDist = p1.radius + p2.radius + minGap;
          const minDistSq = minDist * minDist;

          if (distSq < minDistSq) {
            const dist = Math.sqrt(distSq);
            const isDegenerate = dist < 0.0001;
            const angle = isDegenerate ? Math.random() * Math.PI * 2 : 0;
            const nx = isDegenerate ? Math.cos(angle) : dx / dist;
            const ny = isDegenerate ? Math.sin(angle) : dy / dist;
            const overlap = (minDist - (isDegenerate ? 0 : dist)) / minDist;
            const force = repulsionStrength * overlap * overlap;

            p1.vx -= nx * force;
            p1.vy -= ny * force;
            p2.vx += nx * force;
            p2.vy += ny * force;

            const push = 0.12 * overlap;
            p1.x -= nx * push;
            p1.y -= ny * push;
            p2.x += nx * push;
            p2.y += ny * push;
          }
        }
      }

      particles.forEach((p) => {
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

        if (attractorEnabledRef.current && pointerRef.current.active) {
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
          const falloff = Math.exp(-bdist / burstRef.current.falloffRadius);
          const impulse = 0.85 * burstRef.current.power * wave * falloff;
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
        const sparkle = Math.random() < 0.04 + structureBoost * 0.02;
        if (sparkle) {
          ctx.fillStyle = hexToRgba(GROUP_COLORS[p.group], Math.min(1, sparkleAlpha * (1 + structureBoost * 0.7)));
          ctx.fill();
        } else if (structureBoost > 0.001) {
          const whiteAlpha = Math.min(1, particleAlphaBase * (1 - 0.35 * structureBoost) * (1 + structureBoost * 0.35));
          const tintAlpha = Math.min(1, particleAlphaBase * 0.6 * structureBoost);
          ctx.fillStyle = `rgba(255, 255, 255, ${whiteAlpha})`;
          ctx.fill();
          ctx.fillStyle = hexToRgba(GROUP_COLORS[p.group], tintAlpha);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${particleAlphaBase})`;
          ctx.fill();
        }
      });

      if (burstRef.current.timeLeft > 0) {
        burstRef.current.timeLeft = Math.max(0, burstRef.current.timeLeft - 16.67);
      }

      if (attractorEnabledRef.current && pointerRef.current.active) {
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
            const baseAlpha = connectionAlphaBase * (1 - dist / maxDistance);
            const alpha = Math.min(
              1,
              sameGroup
                ? baseAlpha * (1 + structureBoost * 2.2)
                : baseAlpha * 0.7 * (1 + structureBoost * 1.9)
            );
            ctx.strokeStyle = sameGroup
              ? hexToRgba(GROUP_COLORS[p1.group], alpha)
              : `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = (0.6 + bondCycle * 0.5) * (1 + structureBoost * 0.85);
            ctx.stroke();
          }
        });
      });

      if (showBadges) {
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
      }

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
  }, [clickBehavior, initParticles, shouldIgnoreInteractiveClicks, showBadges, spawnBadge]);

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
