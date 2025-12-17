"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

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
  opacity: number;
  life: number;
  maxLife: number;
}

const BADGE_TEXTS = [
  "reward ≈ 0.83",
  "p(agree) 0.71",
  "friction ↓",
  "comfort ↑",
  "p(truth) 0.42",
  "alignment: 0.89",
  "satisfaction ↑",
  "challenge ↓",
];

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const badgesRef = useRef<FloatingBadge[]>([]);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const numParticles = Math.min(80, Math.floor((width * height) / 15000));

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        group: Math.floor(Math.random() * 5),
      });
    }
    return particles;
  }, []);

  const spawnBadge = useCallback((width: number, height: number) => {
    const badge: FloatingBadge = {
      x: Math.random() * (width - 150) + 75,
      y: Math.random() * (height - 100) + 50,
      text: BADGE_TEXTS[Math.floor(Math.random() * BADGE_TEXTS.length)],
      opacity: 0,
      life: 0,
      maxLife: 180,
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
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      particlesRef.current = initParticles(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      timeRef.current++;

      // Spawn new badges occasionally
      if (timeRef.current % 120 === 0 && badgesRef.current.length < 3) {
        badgesRef.current.push(spawnBadge(rect.width, rect.height));
      }

      // Update and draw particles
      const groupCenters: { x: number; y: number; count: number }[] = Array(5)
        .fill(null)
        .map(() => ({ x: 0, y: 0, count: 0 }));

      // Calculate group centers
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

      // Update particles
      particlesRef.current.forEach((p) => {
        // Subtle attraction to group center
        const center = groupCenters[p.group];
        const dx = center.x - p.x;
        const dy = center.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 100) {
          p.vx += (dx / dist) * 0.01;
          p.vy += (dy / dist) * 0.01;
        } else if (dist < 30) {
          p.vx -= (dx / dist) * 0.005;
          p.vy -= (dy / dist) * 0.005;
        }

        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Bounce off edges
        if (p.x < 0 || p.x > rect.width) p.vx *= -1;
        if (p.y < 0 || p.y > rect.height) p.vy *= -1;

        // Keep in bounds
        p.x = Math.max(0, Math.min(rect.width, p.x));
        p.y = Math.max(0, Math.min(rect.height, p.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections between nearby particles in same group
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          if (p1.group !== p2.group) return;
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Update and draw badges
      badgesRef.current = badgesRef.current.filter((badge) => {
        badge.life++;

        // Fade in/out
        if (badge.life < 30) {
          badge.opacity = badge.life / 30;
        } else if (badge.life > badge.maxLife - 30) {
          badge.opacity = (badge.maxLife - badge.life) / 30;
        } else {
          badge.opacity = 1;
        }

        // Float upward slightly
        badge.y -= 0.2;

        // Draw badge
        ctx.save();
        ctx.font = "12px var(--font-jetbrains), monospace";

        const metrics = ctx.measureText(badge.text);
        const padding = 8;
        const width = metrics.width + padding * 2;
        const height = 24;

        // Background
        ctx.fillStyle = `rgba(30, 30, 30, ${badge.opacity * 0.8})`;
        ctx.beginPath();
        ctx.roundRect(badge.x - width / 2, badge.y - height / 2, width, height, 4);
        ctx.fill();

        // Border
        ctx.strokeStyle = `rgba(255, 255, 255, ${badge.opacity * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Text
        ctx.fillStyle = `rgba(180, 180, 180, ${badge.opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(badge.text, badge.x, badge.y);

        ctx.restore();

        return badge.life < badge.maxLife;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      animate();
    } else {
      // Draw static particles once
      const rect = canvas.getBoundingClientRect();
      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
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
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
