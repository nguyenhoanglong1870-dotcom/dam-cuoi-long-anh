import type { CSSProperties } from "react";

const PETALS = [
  { left: "6%", size: 14, duration: "13s", delay: "0s", color: "#F2B8C4" },
  { left: "16%", size: 11, duration: "16s", delay: "2.5s", color: "#E8A2B0" },
  { left: "28%", size: 15, duration: "14s", delay: "5s", color: "#F7CCD5" },
  { left: "41%", size: 12, duration: "18s", delay: "1.2s", color: "#E396A6" },
  { left: "55%", size: 16, duration: "15s", delay: "3.8s", color: "#F4C2CD" },
  { left: "68%", size: 11, duration: "12.5s", delay: "6.4s", color: "#E9A8B5" },
  { left: "79%", size: 14, duration: "17s", delay: "0.8s", color: "#F5C6D0" },
  { left: "91%", size: 13, duration: "14.5s", delay: "4.2s", color: "#E69CAA" },
];

const FLOATING_HEARTS = [
  { left: "12%", bottom: "14%", size: 16, duration: "6.5s", delay: "0.5s" },
  { left: "24%", bottom: "8%", size: 12, duration: "7.5s", delay: "2.2s" },
  { left: "76%", bottom: "12%", size: 15, duration: "6.8s", delay: "1.4s" },
  { left: "87%", bottom: "18%", size: 13, duration: "8s", delay: "3.4s" },
  { left: "50%", bottom: "6%", size: 14, duration: "7.2s", delay: "4.1s" },
];

export default function FloatingPetals() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Falling petals */}
      {PETALS.map((petal, idx) => (
        <span
          key={`petal-${idx}`}
          className="animate-petal-fall absolute -top-8 block rounded-tl-full rounded-br-full opacity-0"
          style={
            {
              left: petal.left,
              width: `${petal.size}px`,
              height: `${petal.size * 1.35}px`,
              backgroundColor: petal.color,
              "--duration": petal.duration,
              "--delay": petal.delay,
            } as CSSProperties
          }
        />
      ))}

      {/* Rising subtle hearts */}
      {FLOATING_HEARTS.map((heart, idx) => (
        <svg
          key={`heart-${idx}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="animate-heart-float absolute text-[#C85A6B]/45 opacity-0"
          style={
            {
              left: heart.left,
              bottom: heart.bottom,
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              "--duration": heart.duration,
              "--delay": heart.delay,
            } as CSSProperties
          }
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  );
}
