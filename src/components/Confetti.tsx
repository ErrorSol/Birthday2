import { useEffect, useState } from "react";

export default function Confetti() {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; delay: number; color: string; size: number; duration: number }>>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        color: ["oklch(0.7 0.2 340)", "oklch(0.8 0.15 80)", "oklch(0.6 0.2 320)", "oklch(0.75 0.1 200)", "oklch(0.85 0.12 350)"][i % 5],
        size: 6 + Math.random() * 8,
        duration: 3 + Math.random() * 4,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            borderRadius: 2,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
