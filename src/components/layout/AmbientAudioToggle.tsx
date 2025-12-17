"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { fadeAudio } from "@/lib/audio";

const STORAGE_KEY = "ambient-audio-pref";
const AUDIO_SRC = "/audio/ambient.mp3";
const TARGET_VOLUME = 0.35;

export function AmbientAudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fadeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    const shouldStart = stored === "on";

    const handleReady = () => setIsReady(true);
    audio.addEventListener("canplaythrough", handleReady, { once: true });
    audio.addEventListener("loadedmetadata", handleReady, { once: true });
    audio.addEventListener("error", () => {
      setError("Audio unavailable");
      setIsReady(false);
    });

    if (shouldStart) {
      startAudio(true).catch(() => {
        setIsPlaying(false);
      });
    }

    return () => {
      fadeRef.current?.();
      audio.pause();
      audio.removeEventListener("canplaythrough", handleReady);
      audio.removeEventListener("loadedmetadata", handleReady);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAudio = async (isAuto = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      fadeRef.current?.();
      await audio.play();
      fadeRef.current = fadeAudio(audio, TARGET_VOLUME, isAuto ? 400 : 1200);
      setIsPlaying(true);
      window.localStorage.setItem(STORAGE_KEY, "on");
    } catch (e) {
      setError("Unable to play (browser blocked)");
      setIsPlaying(false);
      window.localStorage.setItem(STORAGE_KEY, "off");
    }
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeRef.current?.();
    fadeRef.current = fadeAudio(audio, 0, 900, () => {
      audio.pause();
    });
    setIsPlaying(false);
    window.localStorage.setItem(STORAGE_KEY, "off");
  };

  const toggle = () => {
    if (!isReady || error) return;
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

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
