"use client";

import { useEffect, useState } from "react";

export type SectionKey = "hero" | "readings" | "paper" | "demos" | "footer" | string;

export function useActiveSection(defaultKey: SectionKey = "hero") {
  const [active, setActive] = useState<SectionKey>(defaultKey);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-bg]"));
    if (sections.length === 0) {
      setActive(defaultKey);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const key = visible[0].target.getAttribute("data-bg") as SectionKey;
          if (key) setActive(key);
        }
      },
      {
        threshold: [0.25, 0.4, 0.6],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [defaultKey]);

  return active;
}
