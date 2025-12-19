"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { fadeAudio } from "@/lib/audio";

const STORAGE_KEY = "ambient-audio-pref";
const AUDIO_SRC = "/audio/ambient.mp3";
const TARGET_VOLUME = 0.35;

type AmbientAudioContextValue = {
  isReady: boolean;
  isPlaying: boolean;
  error: string | null;
  play: (opts?: { isAuto?: boolean }) => Promise<void>;
  pause: () => void;
  toggle: () => void;
};

const AmbientAudioContext = createContext<AmbientAudioContextValue | null>(null);

export function AmbientAudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<(() => void) | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    const handleReady = () => setIsReady(true);
    const handleError = () => {
      setError("Audio unavailable");
      setIsReady(false);
    };

    audio.addEventListener("canplaythrough", handleReady, { once: true });
    audio.addEventListener("loadedmetadata", handleReady, { once: true });
    audio.addEventListener("error", handleError);

    const stored = window.localStorage.getItem(STORAGE_KEY);
    const shouldStart = stored === "on";
    if (shouldStart) {
      void (async () => {
        try {
          fadeRef.current?.();
          await audio.play();
          fadeRef.current = fadeAudio(audio, TARGET_VOLUME, 400);
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
          window.localStorage.setItem(STORAGE_KEY, "off");
        }
      })();
    }

    return () => {
      fadeRef.current?.();
      audio.pause();
      audio.removeEventListener("canplaythrough", handleReady);
      audio.removeEventListener("loadedmetadata", handleReady);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const play = useCallback(async (opts?: { isAuto?: boolean }) => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      fadeRef.current?.();
      await audio.play();
      fadeRef.current = fadeAudio(audio, TARGET_VOLUME, opts?.isAuto ? 400 : 1200);
      setIsPlaying(true);
      window.localStorage.setItem(STORAGE_KEY, "on");
    } catch {
      setError("Unable to play (browser blocked)");
      setIsPlaying(false);
      window.localStorage.setItem(STORAGE_KEY, "off");
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeRef.current?.();
    fadeRef.current = fadeAudio(audio, 0, 900, () => {
      audio.pause();
    });
    setIsPlaying(false);
    window.localStorage.setItem(STORAGE_KEY, "off");
  }, []);

  const toggle = useCallback(() => {
    if (!isReady || error) return;
    if (isPlaying) pause();
    else void play();
  }, [error, isPlaying, isReady, pause, play]);

  const value = useMemo<AmbientAudioContextValue>(
    () => ({
      isReady,
      isPlaying,
      error,
      play,
      pause,
      toggle,
    }),
    [error, isPlaying, isReady, pause, play, toggle]
  );

  return <AmbientAudioContext.Provider value={value}>{children}</AmbientAudioContext.Provider>;
}

export function useAmbientAudio() {
  const ctx = useContext(AmbientAudioContext);
  if (!ctx) {
    throw new Error("useAmbientAudio must be used within <AmbientAudioProvider />");
  }
  return ctx;
}
