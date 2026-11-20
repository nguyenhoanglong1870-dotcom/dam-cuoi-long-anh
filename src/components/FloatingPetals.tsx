import type { CSSProperties } from "react";

interface PetalItem {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  animation: "animate-petal-left" | "animate-petal-right" | "animate-petal-center";
  variant: "blush" | "cream" | "rose" | "gold";
  opacity: number;
}

const PETAL_LIST: PetalItem[] = [
  { id: 1, left: "4%", size: 16, duration: "13s", delay: "-2s", animation: "animate-petal-right", variant: "blush", opacity: 0.65 },
  { id: 2, left: "12%", size: 13, duration: "16s", delay: "-8s", animation: "animate-petal-left", variant: "cream", opacity: 0.7 },
  { id: 3, left: "19%", size: 18, duration: "14s", delay: "-4s", animation: "animate-petal-center", variant: "rose", opacity: 0.55 },
  { id: 4, left: "27%", size: 12, duration: "18s", delay: "-11s", animation: "animate-petal-right", variant: "blush", opacity: 0.6 },
  { id: 5, left: "34%", size: 15, duration: "15s", delay: "-1s", animation: "animate-petal-left", variant: "cream", opacity: 0.75 },
  { id: 6, left: "42%", size: 14, duration: "17s", delay: "-7s", animation: "animate-petal-center", variant: "gold", opacity: 0.5 },
  { id: 7, left: "49%", size: 17, duration: "13.5s", delay: "-13s", animation: "animate-petal-right", variant: "rose", opacity: 0.6 },
  { id: 8, left: "57%", size: 12, duration: "19s", delay: "-5s", animation: "animate-petal-left", variant: "blush", opacity: 0.65 },
  { id: 9, left: "64%", size: 15, duration: "14.5s", delay: "-10s", animation: "animate-petal-center", variant: "cream", opacity: 0.7 },
  { id: 10, left: "72%", size: 18, duration: "16.5s", delay: "-3s", animation: "animate-petal-right", variant: "blush", opacity: 0.6 },
  { id: 11, left: "79%", size: 13, duration: "15s", delay: "-12s", animation: "animate-petal-left", variant: "gold", opacity: 0.5 },
  { id: 12, left: "86%", size: 16, duration: "14s", delay: "-6s", animation: "animate-petal-center", variant: "rose", opacity: 0.55 },
  { id: 13, left: "93%", size: 14, duration: "17.5s", delay: "-9s", animation: "animate-petal-left", variant: "cream", opacity: 0.7 },
  { id: 14, left: "8%", size: 14, duration: "15.5s", delay: "-14s", animation: "animate-petal-center", variant: "blush", opacity: 0.6 },
  { id: 15, left: "22%", size: 17, duration: "13s", delay: "-6.5s", animation: "animate-petal-right", variant: "cream", opacity: 0.7 },
  { id: 16, left: "38%", size: 13, duration: "18.5s", delay: "-15s", animation: "animate-petal-left", variant: "rose", opacity: 0.55 },
  { id: 17, left: "53%", size: 15, duration: "14s", delay: "-3.5s", animation: "animate-petal-center", variant: "blush", opacity: 0.65 },
  { id: 18, left: "68%", size: 16, duration: "16s", delay: "-9.5s", animation: "animate-petal-right", variant: "cream", opacity: 0.7 },
  { id: 19, left: "83%", size: 12, duration: "17s", delay: "-2.5s", animation: "animate-petal-left", variant: "gold", opacity: 0.5 },
];

function PetalGraphic({ variant }: { variant: PetalItem["variant"] }) {
  switch (variant) {
    case "blush":
      return (
        <svg viewBox="0 0 30 40" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(242,184,196,0.25)]">
          <defs>
            <linearGradient id="blush-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9D4DC" />
              <stop offset="50%" stopColor="#F2B8C4" />
              <stop offset="100%" stopColor="#E599A9" />
            </linearGradient>
          </defs>
          <path
            d="M15 0 C24 8 29 20 20 34 C16 39 14 40 15 40 C14 40 11 39 8 34 C-1 20 5 8 15 0 Z"
            fill="url(#blush-grad)"
          />
          <path d="M15 4 Q15 22 14 36" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
        </svg>
      );
    case "cream":
      return (
        <svg viewBox="0 0 30 40" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(225,215,200,0.25)]">
          <defs>
            <linearGradient id="cream-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FDF7F0" />
              <stop offset="100%" stopColor="#F5E8D9" />
            </linearGradient>
          </defs>
          <path
            d="M15 0 C25 9 28 22 19 35 C15 39 14 40 15 40 C14 40 12 39 8 35 C0 22 4 9 15 0 Z"
            fill="url(#cream-grad)"
          />
          <path d="M15 5 Q15 22 14 36" stroke="#EADBCE" strokeWidth="0.8" opacity="0.7" />
        </svg>
      );
    case "rose":
      return (
        <svg viewBox="0 0 30 40" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(200,90,107,0.2)]">
          <defs>
            <linearGradient id="rose-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F4C0CA" />
              <stop offset="60%" stopColor="#E396A6" />
              <stop offset="100%" stopColor="#CF7B8C" />
            </linearGradient>
          </defs>
          <path
            d="M15 0 C23 7 28 19 21 33 C17 38 15 40 15 40 C14 40 11 38 7 33 C1 19 6 7 15 0 Z"
            fill="url(#rose-grad)"
          />
        </svg>
      );
    case "gold":
      return (
        <svg viewBox="0 0 30 40" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(197,160,89,0.2)]">
          <defs>
            <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="50%" stopColor="#E8CA94" />
              <stop offset="100%" stopColor="#C5A059" />
            </linearGradient>
          </defs>
          <path
            d="M15 2 C22 10 26 21 19 33 C16 37 14 39 15 39 C14 39 12 37 9 33 C3 21 7 10 15 2 Z"
            fill="url(#gold-grad)"
            opacity="0.85"
          />
        </svg>
      );
  }
}

export default function FloatingPetals() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden select-none"
    >
      {PETAL_LIST.map((petal) => (
        <div
          key={petal.id}
          className={`${petal.animation} absolute -top-10 will-change-transform`}
          style={
            {
              left: petal.left,
              width: `${petal.size}px`,
              height: `${petal.size * 1.33}px`,
              opacity: petal.opacity,
              "--duration": petal.duration,
              "--delay": petal.delay,
            } as CSSProperties
          }
        >
          <PetalGraphic variant={petal.variant} />
        </div>
      ))}
    </div>
  );
}
