"use client";

import { AmbientBackground } from "./AmbientBackground";
import { useActiveSection } from "@/hooks/useActiveSection";

interface Props {
  defaultKey?: string;
}

export function AmbientBackgroundRoot({ defaultKey = "hero" }: Props) {
  const active = useActiveSection(defaultKey);
  return <AmbientBackground activeSection={active} />;
}
