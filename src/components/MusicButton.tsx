import { useState, useRef, useCallback } from "react";

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      // Replace this src with your music file URL later
      audioRef.current.src = "audio.mp3";
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked, ignore
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <button
      onClick={toggle}
      className="fixed top-3 right-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95"
      style={{
        zIndex: 100,
        background: isPlaying
          ? "linear-gradient(135deg, oklch(0.65 0.2 340), oklch(0.55 0.22 320))"
          : "oklch(1 0 0 / 0.8)",
        color: isPlaying ? "oklch(0.98 0.005 340)" : "oklch(0.45 0.2 310)",
        boxShadow: isPlaying
          ? "0 4px 20px oklch(0.65 0.2 340 / 0.4)"
          : "0 4px 15px rgba(0,0,0,0.1)",
      }}
      title={isPlaying ? "Pause music" : "Play music"}
    >
      <span className="text-lg sm:text-xl">{isPlaying ? "🎵" : "🔇"}</span>
    </button>
  );
}
