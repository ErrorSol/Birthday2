import { useCallback, useRef } from "react";

export default function HeartParticles({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const spawnHeart = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const heart = document.createElement("span");
    heart.textContent = "❤";
    heart.style.cssText = `
      position:fixed;
      left:${e.clientX - 8}px;
      top:${e.clientY - 8}px;
      font-size:${12 + Math.random() * 12}px;
      pointer-events:none;
      z-index:9999;
      animation:heart-float 1s ease-out forwards;
      color:oklch(0.65 0.2 340);
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }, []);

  return (
    <div ref={containerRef} onMouseMove={spawnHeart} className="contents">
      {children}
    </div>
  );
}
