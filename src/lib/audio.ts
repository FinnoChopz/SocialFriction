export function fadeAudio(
  audio: HTMLAudioElement,
  targetVolume: number,
  durationMs: number,
  onDone?: () => void
) {
  const start = audio.volume;
  const delta = targetVolume - start;
  if (durationMs <= 0) {
    audio.volume = targetVolume;
    if (onDone) onDone();
    return;
  }

  const startTime = performance.now();
  let raf: number;

  const tick = () => {
    const now = performance.now();
    const t = Math.min(1, (now - startTime) / durationMs);
    audio.volume = start + delta * t;
    if (t < 1) {
      raf = requestAnimationFrame(tick);
    } else {
      if (onDone) onDone();
    }
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
