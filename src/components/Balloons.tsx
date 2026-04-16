import { useEffect, useState } from "react";

interface Balloon {
  id: number;
  color: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const BALLOON_COLORS = [
  "oklch(0.7 0.2 340)",   // pink
  "oklch(0.75 0.15 350)", // light pink
  "oklch(0.65 0.18 310)", // purple-pink
  "oklch(0.8 0.12 10)",   // peach
  "oklch(0.7 0.22 0)",    // red-pink
  "oklch(0.85 0.1 80)",   // gold
  "oklch(0.6 0.2 320)",   // magenta
  "oklch(0.78 0.16 340)", // rose
];

export default function Balloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const items: Balloon[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      left: Math.random() * 95,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 8,
      size: 36 + Math.random() * 24,
    }));
    setBalloons(items);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute"
          style={{
            left: `${b.left}%`,
            animation: `float-up ${b.duration}s linear ${b.delay}s infinite`,
          }}
        >
          {/* Balloon body */}
          <div
            style={{
              width: b.size,
              height: b.size * 1.2,
              background: `radial-gradient(circle at 35% 25%, oklch(0.95 0.05 340), ${b.color})`,
              borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
              position: "relative",
              boxShadow: `inset -4px -4px 8px rgba(0,0,0,0.1), 2px 2px 6px rgba(0,0,0,0.08)`,
            }}
          >
            {/* Balloon knot */}
            <div
              style={{
                position: "absolute",
                bottom: -4,
                left: "50%",
                transform: "translateX(-50%)",
                width: 8,
                height: 8,
                background: b.color,
                borderRadius: "50%",
              }}
            />
          </div>
          {/* String */}
          <div
            style={{
              width: 1.5,
              height: b.size * 1.5,
              background: "oklch(0.7 0.02 340)",
              margin: "0 auto",
              opacity: 0.5,
              animation: `sway ${3 + Math.random() * 2}s ease-in-out infinite`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
