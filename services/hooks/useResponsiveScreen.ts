"use client";

import { useEffect, useState } from "react";

export function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsLarge(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isLarge;
}

export function useScreenBreakPoint(width = 768) {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsLarge(window.innerWidth >= width);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isLarge;
}