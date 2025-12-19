"use client";

import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useAmbientAudio } from "./AmbientAudioProvider";

export function AmbientAudioToggle() {
  const { isReady, isPlaying, error, toggle } = useAmbientAudio();

  if (error) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="focus-visible-ring"
      aria-label={isPlaying ? "Mute background audio" : "Play background audio"}
      disabled={!isReady && !isPlaying}
    >
      {isPlaying ? <Mic className="w-5 h-5 text-green-300" /> : <MicOff className="w-5 h-5 text-muted-foreground" />}
    </Button>
  );
}
