"use client";

import { useEffect, useRef } from "react";

type Comet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  maxLife: number;
};

const MAX_COMETS = 22;
const SPAWN_EVERY_MS = [700, 1600] as const;
const ANGLE_DEG = 55;
const SPEED = [0.14, 0.26] as const;
const LENGTH = [140, 280] as const;
const LIFE_MS = [4000, 7500] as const;

const HEAD_ALPHA = 0.3;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function CometRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const brand =
      getComputedStyle(document.documentElement).getPropertyValue("--brand").trim() ||
      "#ff5723";

    let width = 0;
    let height = 0;
    const comets: Comet[] = [];
    const angle = (ANGLE_DEG * Math.PI) / 180;
    const ux = Math.cos(angle);
    const uy = Math.sin(angle);
    let lastSpawn = 0;
    let nextSpawn = rand(SPAWN_EVERY_MS[0], SPAWN_EVERY_MS[1]);
    let raf = 0;
    let last = performance.now();
    let running = true;
    let initialized = false;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Spawn from a diagonal "rain band" along the top + left edges so comets
    // cover the entire viewport over time, not just the top strip.
    const spawn = (preLife = false) => {
      if (comets.length >= MAX_COMETS) return;
      const speed = rand(SPEED[0], SPEED[1]);
      const maxLife = rand(LIFE_MS[0], LIFE_MS[1]);
      const len = rand(LENGTH[0], LENGTH[1]);

      // Cover the full viewport uniformly. Comets travel down-right at angle θ,
      // so we spawn along the upper-left "rain front": top edge (extended to the
      // right by height*tan θ to reach the bottom-right corner) OR left edge
      // (extended downward to cover the lower-left). Pick edge weighted by its
      // projected length perpendicular to the motion vector.
      const tan = Math.tan(angle);
      const topSpan = width + height * tan;
      const leftSpan = height;
      const fromLeftEdge = Math.random() < leftSpan / (topSpan + leftSpan);
      let x: number;
      let y: number;
      if (fromLeftEdge) {
        x = -len;
        y = rand(0, height);
      } else {
        x = rand(-height * tan, width);
        y = -len;
      }

      // For initial population, jitter life so comets are already mid-flight,
      // spread across the whole viewport at t=0.
      const life = preLife ? rand(0, maxLife * 0.85) : 0;
      const elapsed = life;
      x += ux * speed * elapsed;
      y += uy * speed * elapsed;

      comets.push({
        x,
        y,
        vx: ux * speed,
        vy: uy * speed,
        len,
        life,
        maxLife,
      });
    };

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min(now - last, 64);
      last = now;

      if (!initialized) {
        initialized = true;
        const seed = Math.floor(MAX_COMETS * 0.7);
        for (let i = 0; i < seed; i++) spawn(true);
      }

      lastSpawn += dt;
      if (lastSpawn >= nextSpawn) {
        spawn();
        lastSpawn = 0;
        nextSpawn = rand(SPAWN_EVERY_MS[0], SPAWN_EVERY_MS[1]);
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.life += dt;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        if (c.life >= c.maxLife || c.x > width + c.len || c.y > height + c.len) {
          comets.splice(i, 1);
        }
      }

      ctx.clearRect(0, 0, width, height);

      if (comets.length === 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      ctx.globalCompositeOperation = "source-over";
      for (const c of comets) {
        const t = c.life / c.maxLife;
        const ease = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1;
        const tailX = c.x - ux * c.len;
        const tailY = c.y - uy * c.len;
        const grad = ctx.createLinearGradient(tailX, tailY, c.x, c.y);
        grad.addColorStop(0, "rgba(255,87,35,0)");
        grad.addColorStop(1, brand);
        ctx.strokeStyle = grad;
        ctx.globalAlpha = HEAD_ALPHA * ease;
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
