"use client";

import { useEffect, useRef } from "react";

type Light = {
  x: number;
  yStart: number;
  yEnd: number;
  radius: number;
  duration: number;
  delay: number;
  startedAt: number;
};

const LIGHT_COUNT = 3;
const RADIUS = [200, 360] as const;
const DURATION_MS = [5500, 9000] as const;
const DELAY_MS = [400, 2800] as const;
const PEAK_OPACITY = 0.22;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeLight(now: number, height: number): Light {
  return {
    x: rand(5, 95),
    yStart: height + 80,
    yEnd: -80,
    radius: rand(RADIUS[0], RADIUS[1]),
    duration: rand(DURATION_MS[0], DURATION_MS[1]),
    delay: rand(DELAY_MS[0], DELAY_MS[1]),
    startedAt: now,
  };
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function fade(p: number) {
  if (p < 0.18) return p / 0.18;
  if (p > 0.82) return (1 - p) / 0.18;
  return 1;
}

export function GridShimmer() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(
      root.querySelectorAll<HTMLDivElement>(".grid-shimmer-light"),
    );
    if (layers.length === 0) return;

    let raf = 0;
    let running = true;
    let height = window.innerHeight;
    const lights: Light[] = Array.from({ length: LIGHT_COUNT }, () =>
      makeLight(performance.now(), height),
    );

    const onResize = () => {
      height = window.innerHeight;
    };

    const tick = (now: number) => {
      if (!running) return;
      for (let i = 0; i < lights.length; i++) {
        const layer = layers[i];
        const l = lights[i];
        const elapsed = now - l.startedAt - l.delay;
        if (elapsed < 0) {
          layer.style.opacity = "0";
          continue;
        }
        const p = elapsed / l.duration;
        if (p >= 1) {
          lights[i] = makeLight(now, height);
          layer.style.opacity = "0";
          continue;
        }
        const e = easeInOut(p);
        const y = l.yStart + (l.yEnd - l.yStart) * e;
        layer.style.setProperty("--lx", `${l.x}%`);
        layer.style.setProperty("--ly", `${y}px`);
        layer.style.setProperty("--lr", `${l.radius}px`);
        layer.style.opacity = (PEAK_OPACITY * fade(p)).toFixed(3);
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="grid-shimmer">
      {Array.from({ length: LIGHT_COUNT }).map((_, i) => (
        <div key={i} className="grid-shimmer-light" />
      ))}
    </div>
  );
}
