"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "walkthrough-completed";

export function useWalkthroughStatus() {
  const [hasCompleted, setHasCompleted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setHasCompleted(stored === "true");
    setIsLoading(false);
  }, []);

  const markCompleted = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setHasCompleted(true);
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasCompleted(false);
  };

  return { hasCompleted, isLoading, markCompleted, reset };
}
