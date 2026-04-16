import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Balloons from "../components/Balloons";
import Confetti from "../components/Confetti";
import HeartParticles from "../components/HeartParticles";
import MemoryBook from "../components/MemoryBook";
import MusicButton from "../components/MusicButton";

export const Route = createFileRoute("/")({
  component: BirthdaySurprise,
  head: () => ({
    meta: [
      { title: "🎂 Happy Birthday! A Special Surprise Awaits" },
      { name: "description", content: "A beautiful birthday surprise with memories, love, and celebration." },
    ],
  }),
});

type Screen = "start" | "surprise" | "memories";

function BirthdaySurprise() {
  const [screen, setScreen] = useState<Screen>("start");
  const [transitioning, setTransitioning] = useState(false);

  const goTo = (next: Screen) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
    }, 500);
  };

  if (screen === "memories") {
    return (
      <>
        <MusicButton />
        <MemoryBook onBack={() => goTo("surprise")} />
      </>
    );
  }

  return (
    <HeartParticles>
      <MusicButton />
      <div
        className={`min-h-screen flex items-center justify-center transition-opacity duration-500 ${transitioning ? "opacity-0" : "opacity-100"}`}
        style={{
          background:
            screen === "start"
              ? "linear-gradient(135deg, oklch(0.85 0.12 340), oklch(0.7 0.18 310), oklch(0.78 0.14 350))"
              : "linear-gradient(135deg, oklch(0.92 0.06 340), oklch(0.85 0.1 320), oklch(0.9 0.08 350))",
        }}
      >
        {screen === "surprise" && (
          <>
            <Balloons />
            <Confetti />
          </>
        )}

        <div className="relative text-center px-6" style={{ zIndex: 5 }}>
          {screen === "start" && (
            <div className="flex flex-col items-center gap-8">
              <div className="text-6xl md:text-8xl mb-2">🎁</div>
              <h1
                className="text-2xl md:text-4xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "oklch(1 0 0 / 0.95)" }}
              >
                A Special Surprise Awaits...
              </h1>
              <p className="text-base md:text-lg" style={{ color: "oklch(1 0 0 / 0.75)", fontFamily: "var(--font-romantic)" }}>
                Someone very special deserves the world today
              </p>
              <button
                onClick={() => goTo("surprise")}
                className="animate-gift-bounce animate-pulse-glow px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold cursor-pointer border-0 transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, oklch(1 0 0 / 0.95), oklch(0.95 0.03 340))",
                  color: "oklch(0.45 0.2 310)",
                  boxShadow: "0 8px 30px oklch(0.5 0.2 340 / 0.4)",
                }}
              >
                Open Gift 🎁
              </button>
            </div>
          )}

          {screen === "surprise" && (
            <div className="flex flex-col items-center gap-6 md:gap-8">
              <h1
                className="animate-title-entrance text-4xl md:text-7xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-display)", color: "oklch(0.35 0.15 340)" }}
              >
                🎉 Happy Birthday ❤️
              </h1>
              <p
                className="text-lg md:text-2xl max-w-lg"
                style={{ color: "oklch(0.4 0.1 340)", fontFamily: "var(--font-romantic)" }}
              >
                Today is all about you — the most amazing person in the world.
                Here&apos;s a little journey through our most precious moments together.
              </p>
              <button
                onClick={() => goTo("memories")}
                className="animate-pulse-glow px-8 md:px-10 py-3.5 md:py-4 rounded-full text-base md:text-lg font-bold cursor-pointer border-0 transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, oklch(0.65 0.2 340), oklch(0.5 0.22 310))",
                  color: "oklch(0.98 0.005 340)",
                  boxShadow: "0 8px 30px oklch(0.55 0.2 340 / 0.4)",
                }}
              >
                View Memories 📖
              </button>
            </div>
          )}
        </div>
      </div>
    </HeartParticles>
  );
}
