"use client";

import { useEffect, useRef, useState } from "react";

export function useAutoplayCarousel(total: number, intervalMs = 4500) {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActive((a) => (a + 1) % total);
    }, intervalMs);
    return () => clearInterval(id);
  }, [total, intervalMs]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return { active, setActive, pause, resume };
}
