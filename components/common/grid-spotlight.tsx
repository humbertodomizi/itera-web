"use client";

import { useEffect } from "react";

export function GridSpotlight() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const body = document.body;
    let frame = 0;
    let nextX = window.innerWidth / 2;
    let nextY = window.innerHeight / 2;

    const apply = () => {
      frame = 0;
      body.style.setProperty("--mx", `${nextX}px`);
      body.style.setProperty("--my", `${nextY}px`);
    };

    const onMove = (e: PointerEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      body.dataset.gridSpotlight = "on";
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      delete body.dataset.gridSpotlight;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      delete body.dataset.gridSpotlight;
    };
  }, []);

  return null;
}
