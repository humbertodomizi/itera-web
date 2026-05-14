"use client";

import { useEffect, useState } from "react";

export function useRotatingIndex(length: number) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const out = setTimeout(() => setPhase("out"), 2400);
    const next = setTimeout(() => {
      setIndex((i) => (i + 1) % length);
      setPhase("in");
    }, 2820);
    return () => {
      clearTimeout(out);
      clearTimeout(next);
    };
  }, [index, length]);

  return { index, phase };
}
