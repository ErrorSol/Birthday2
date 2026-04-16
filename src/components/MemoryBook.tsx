import { useState, useCallback } from "react";
import MEMORIES from "../data/memories";

interface MemoryBookProps {
  onBack: () => void;
}

export default function MemoryBook({ onBack }: MemoryBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [flippedPages, setFlippedPages] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const totalPages = MEMORIES.length;

  const flipNext = useCallback(() => {
    if (isAnimating || currentPage >= totalPages) return;
    setIsAnimating(true);
    setFlippedPages((prev) => new Set(prev).add(currentPage));
    setTimeout(() => {
      setCurrentPage((p) => p + 1);
      setIsAnimating(false);
    }, 900);
  }, [currentPage, totalPages, isAnimating]);

  const flipPrev = useCallback(() => {
    if (isAnimating || currentPage <= 0) return;
    setIsAnimating(true);
    const prevPage = currentPage - 1;
    setFlippedPages((prev) => {
      const n = new Set(prev);
      n.delete(prevPage);
      return n;
    });
    setTimeout(() => {
      setCurrentPage(prevPage);
      setIsAnimating(false);
    }, 900);
  }, [currentPage, isAnimating]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, oklch(0.92 0.06 340), oklch(0.85 0.1 320), oklch(0.9 0.08 350))",
        zIndex: 10,
      }}
    >
      {/* Top bar */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center" style={{ zIndex: 20 }}>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md"
          style={{ background: "oklch(1 0 0 / 0.85)", color: "oklch(0.45 0.2 310)" }}
        >
          ← Back
        </button>
        <span className="text-sm font-medium" style={{ color: "oklch(0.4 0.12 340)" }}>
          {currentPage < totalPages ? `${currentPage + 1} / ${totalPages}` : `${totalPages} / ${totalPages}`}
        </span>
      </div>

      <h2
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-5 mt-12"
        style={{ fontFamily: "var(--font-display)", color: "oklch(0.35 0.15 340)", zIndex: 11 }}
      >
        📖 Our Memory Book
      </h2>

      {/* BOOK — real book shape: two-page spread with spine */}
      <div
        className="relative"
        style={{
          width: "min(92vw, 860px)",
          height: "min(60vh, 520px)",
          perspective: "2500px",
        }}
      >
        {/* Book base / cover */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: "linear-gradient(to right, oklch(0.42 0.08 20) 0%, oklch(0.35 0.06 15) 48%, oklch(0.28 0.05 10) 50%, oklch(0.35 0.06 15) 52%, oklch(0.42 0.08 20) 100%)",
            boxShadow: "0 15px 50px rgba(0,0,0,0.35), 0 5px 15px rgba(0,0,0,0.2)",
          }}
        />

        {/* Left side - shows back of flipped page or cover */}
        <div
          className="absolute top-2 bottom-2 left-2 flex items-center justify-center overflow-hidden"
          style={{
            width: "calc(50% - 4px)",
            background: currentPage > 0
              ? "linear-gradient(180deg, oklch(0.97 0.01 40), oklch(0.94 0.015 35))"
              : "linear-gradient(135deg, oklch(0.38 0.07 18), oklch(0.32 0.05 12))",
            borderRadius: "10px 0 0 10px",
            boxShadow: "inset -3px 0 8px rgba(0,0,0,0.08)",
          }}
        >
          {currentPage > 0 ? (
            <div className="w-full h-full flex flex-col sm:flex-row overflow-hidden">
              <div className="w-full sm:w-1/2 h-2/5 sm:h-full relative overflow-hidden">
                <img
                  src={MEMORIES[currentPage - 1].image}
                  alt={`Memory ${currentPage}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="w-full sm:w-1/2 h-3/5 sm:h-full flex flex-col justify-center p-3 sm:p-5">
                <p className="text-[10px] sm:text-xs italic mb-1" style={{ color: "oklch(0.6 0.15 340)", fontFamily: "var(--font-romantic)" }}>
                  Memory #{currentPage}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "oklch(0.3 0.05 340)", fontFamily: "var(--font-romantic)" }}>
                  {MEMORIES[currentPage - 1].text}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-3xl sm:text-5xl">📖</p>
              <p className="text-xs sm:text-sm mt-2 font-semibold" style={{ color: "oklch(0.8 0.06 40)", fontFamily: "var(--font-display)" }}>
                Our Memories
              </p>
            </div>
          )}
        </div>

        {/* Right side placeholder (visible when all pages flipped) */}
        <div
          className="absolute top-2 bottom-2 right-2 flex items-center justify-center"
          style={{
            width: "calc(50% - 4px)",
            background: currentPage >= totalPages
              ? "linear-gradient(135deg, oklch(0.38 0.07 18), oklch(0.32 0.05 12))"
              : "linear-gradient(180deg, oklch(0.96 0.01 40), oklch(0.93 0.015 35))",
            borderRadius: "0 10px 10px 0",
            boxShadow: "inset 3px 0 8px rgba(0,0,0,0.05)",
          }}
        >
          {currentPage >= totalPages ? (
            <div className="text-center p-4">
              <p className="text-3xl sm:text-5xl mb-2">❤️</p>
              <p className="text-sm sm:text-lg font-semibold" style={{ color: "oklch(0.8 0.06 40)", fontFamily: "var(--font-display)" }}>
                The End
              </p>
              <p className="text-xs sm:text-sm mt-1" style={{ color: "oklch(0.65 0.04 40)" }}>
                Happy Birthday!
              </p>
            </div>
          ) : null}
        </div>

        {/* Spine line */}
        <div
          className="absolute top-1 bottom-1 left-1/2 -translate-x-1/2"
          style={{
            width: 6,
            background: "linear-gradient(180deg, oklch(0.3 0.04 10), oklch(0.25 0.03 8), oklch(0.3 0.04 10))",
            borderRadius: 3,
            zIndex: 50,
            boxShadow: "-2px 0 4px rgba(0,0,0,0.2), 2px 0 4px rgba(0,0,0,0.2)",
          }}
        />

        {/* Flippable pages — positioned on right half, flip to left */}
        {MEMORIES.map((memory, i) => {
          const isFlipped = flippedPages.has(i);
          const isActivePage = currentPage === i && !isAnimating;
          // Unflipped pages: higher index on top (closest to viewer). Flipped: lower on top of left stack.
          const zIndex = isFlipped ? 10 + i : 40 - i;

          return (
            <div
              key={i}
              className="absolute top-2 bottom-2"
              style={{
                // Page sits on the right half, hinged at the center spine
                left: "50%",
                width: "calc(50% - 6px)",
                transformOrigin: "left center",
                transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                transition: "transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1)",
                transformStyle: "preserve-3d",
                zIndex,
              }}
            >
              {/* FRONT of page (visible when on right side) */}
              <div
                  className="absolute inset-0 flex flex-col sm:flex-row overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    background: "linear-gradient(180deg, oklch(0.99 0.005 40), oklch(0.96 0.01 38))",
                    borderRadius: "0 8px 8px 0",
                    boxShadow: isFlipped ? "none" : "-2px 0 10px rgba(0,0,0,0.08), 4px 4px 15px rgba(0,0,0,0.06)",

                    // 👇 ONLY NEW PART
                    opacity: isActivePage ? 1 : 0,
                    transform: isActivePage ? "scale(1)" : "scale(0.98)",
                    filter: isActivePage ? "blur(0px)" : "blur(4px)",
                    transition: "all 0.5s ease 0.6s",
                  }}
                >
                <div className="w-full sm:w-1/2 h-2/5 sm:h-full relative overflow-hidden">
                  <img
                    src={memory.image}
                    alt={`Memory ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 70%, oklch(0.99 0.005 40 / 0.4))" }}
                  />
                </div>
                <div className="w-full sm:w-1/2 h-3/5 sm:h-full flex flex-col justify-center p-3 sm:p-6">
                  <p className="text-[10px] sm:text-xs italic mb-1 sm:mb-2" style={{ color: "oklch(0.6 0.15 340)", fontFamily: "var(--font-romantic)" }}>
                    Memory #{i + 1}
                  </p>
                  <p className="text-xs sm:text-base leading-relaxed" style={{ color: "oklch(0.3 0.05 340)", fontFamily: "var(--font-romantic)" }}>
                    {memory.text}
                  </p>
                  <div className="mt-2 sm:mt-4 text-right text-[10px] sm:text-xs" style={{ color: "oklch(0.65 0.1 340)" }}>
                    {i + 1} / {totalPages}
                  </div>
                </div>
              </div>

              {/* BACK of page (visible when flipped to left side) */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "linear-gradient(180deg, oklch(0.97 0.012 40), oklch(0.94 0.018 35))",
                  borderRadius: "8px 0 0 8px",
                  boxShadow: isFlipped ? "2px 0 10px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {/* Decorative back */}
                <div className="text-center opacity-25 select-none">
                  <p className="text-3xl sm:text-5xl">💕</p>
                  <p className="text-[10px] sm:text-xs mt-1" style={{ color: "oklch(0.5 0.1 340)", fontFamily: "var(--font-romantic)" }}>
                    ~ page {i + 1} ~
                  </p>
                </div>
                {/* Page edge lines */}
                <div className="absolute top-4 bottom-4 right-0 w-px" style={{ background: "oklch(0.85 0.02 340)" }} />
              </div>
            </div>
          );
        })}

        {/* Stacked page edges on right (unflipped pages) */}
        {currentPage < totalPages && (
          <div
            className="absolute top-2 bottom-2 pointer-events-none"
            style={{
              right: 6,
              width: Math.min((totalPages - currentPage) * 1.5, 12),
              background: "linear-gradient(to right, oklch(0.92 0.01 40), oklch(0.96 0.005 40))",
              borderRadius: "0 6px 6px 0",
              zIndex: 1,
            }}
          />
        )}

        {/* Stacked page edges on left (flipped pages) */}
        {currentPage > 0 && (
          <div
            className="absolute top-2 bottom-2 pointer-events-none"
            style={{
              left: 6,
              width: Math.min(currentPage * 1.5, 12),
              background: "linear-gradient(to left, oklch(0.92 0.01 40), oklch(0.96 0.005 40))",
              borderRadius: "6px 0 0 6px",
              zIndex: 1,
            }}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-6" style={{ zIndex: 11 }}>
        <button
          onClick={flipPrev}
          disabled={currentPage <= 0 || isAnimating}
          className="px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all disabled:opacity-30 active:scale-95"
          style={{
            background: currentPage > 0 ? "oklch(1 0 0 / 0.9)" : "oklch(1 0 0 / 0.4)",
            color: "oklch(0.45 0.2 310)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          ⬅ Prev
        </button>
        <button
          onClick={flipNext}
          disabled={currentPage >= totalPages || isAnimating}
          className="px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all disabled:opacity-30 active:scale-95"
          style={{
            background: currentPage < totalPages
              ? "linear-gradient(135deg, oklch(0.65 0.2 340), oklch(0.55 0.22 320))"
              : "oklch(0.8 0.05 340)",
            color: "oklch(0.98 0.005 340)",
            boxShadow: "0 4px 15px oklch(0.65 0.2 340 / 0.3)",
          }}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
