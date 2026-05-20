"use client";

import { useEffect, useRef } from "react";

const AUDIO_SRC = "/ganesh_mantra.mp3";

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.35;

    const playAudio = () => {
      void audio.play().catch(() => {
        // Some browsers require a user gesture before audible playback.
      });
    };

    playAudio();

    window.addEventListener("pointerdown", playAudio, { once: true });
    window.addEventListener("keydown", playAudio, { once: true });
    window.addEventListener("touchstart", playAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", playAudio);
      window.removeEventListener("keydown", playAudio);
      window.removeEventListener("touchstart", playAudio);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={AUDIO_SRC}
      loop
      preload="auto"
      playsInline
      aria-hidden="true"
    />
  );
}
