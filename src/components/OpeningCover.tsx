"use client";

import { useEffect, useState } from "react";
import { Heart, Music2, Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";

interface OpeningCoverProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function OpeningCover({ onOpen, isOpen }: OpeningCoverProps) {
  const [mounted, setMounted] = useState(false);
  const [openingPhase, setOpeningPhase] = useState<"idle" | "unsealing" | "sliding" | "done">("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isOpen) return null;

  const handleOpenClick = () => {
    if (openingPhase !== "idle") return;

    // Immediately start music playback on this genuine user touch gesture
    onOpen();

    // Trigger multi-stage cinematic envelope opening
    setOpeningPhase("unsealing");

    setTimeout(() => {
      setOpeningPhase("sliding");
    }, 400);

    setTimeout(() => {
      setOpeningPhase("done");
    }, 1100);
  };

  const isUnsealed = openingPhase === "unsealing" || openingPhase === "sliding" || openingPhase === "done";
  const isSliding = openingPhase === "sliding" || openingPhase === "done";
  const isDone = openingPhase === "done";

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleOpenClick}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#18261E]/95 via-[#22362A]/95 to-[#141F18]/95 p-4 text-[#2C3E32] backdrop-blur-md select-none transition-all duration-700 ${
        isDone ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Floating golden ambient particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span
          className="animate-sparkle absolute top-14 left-10 h-1.5 w-1.5 rounded-full bg-[#E5C992]"
          style={{ "--duration": "4s", "--delay": "0.1s" } as React.CSSProperties}
        />
        <span
          className="animate-sparkle absolute top-1/3 right-12 h-2 w-2 rounded-full bg-[#F5DFC2]"
          style={{ "--duration": "5s", "--delay": "1s" } as React.CSSProperties}
        />
        <span
          className="animate-sparkle absolute bottom-24 left-16 h-2 w-2 rounded-full bg-[#E5C992]"
          style={{ "--duration": "4.5s", "--delay": "2s" } as React.CSSProperties}
        />
        <span
          className="animate-sparkle absolute bottom-1/3 right-14 h-1.5 w-1.5 rounded-full bg-[#F5DFC2]"
          style={{ "--duration": "3.5s", "--delay": "0.5s" } as React.CSSProperties}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#8CA696]/10 blur-3xl pointer-events-none" />
      </div>

      {/* 3D Envelope Container with Perspective */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="perspective-1000 relative w-full max-w-[390px]"
      >
        {/* The Envelope Shell */}
        <div className="preserve-3d relative w-full overflow-hidden rounded-[32px] border border-[#DFCBB5] bg-[#FCFBF8] p-6 text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)] transition-all duration-700 sm:p-8">
          {/* Soft Botanical Watercolor Leaf Accents in corners */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 w-36 h-36 opacity-30"
          >
            <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
              <path
                d="M10 10C35 25 50 60 45 90C40 120 15 140 10 145C18 120 30 95 25 70C20 45 10 20 10 10Z"
                fill="#5B7B68"
                opacity="0.6"
              />
              <path
                d="M20 10C50 20 85 45 95 75C105 105 85 130 80 135C85 110 95 85 85 60C75 35 45 20 20 10Z"
                fill="#7A9A87"
                opacity="0.45"
              />
              <circle cx="65" cy="45" r="3" fill="#C5A059" opacity="0.6" />
            </svg>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 w-36 h-36 opacity-30 -scale-x-100"
          >
            <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
              <path
                d="M10 10C35 25 50 60 45 90C40 120 15 140 10 145C18 120 30 95 25 70C20 45 10 20 10 10Z"
                fill="#5B7B68"
                opacity="0.6"
              />
              <path
                d="M20 10C50 20 85 45 95 75C105 105 85 130 80 135C85 110 95 85 85 60C75 35 45 20 20 10Z"
                fill="#7A9A87"
                opacity="0.45"
              />
              <circle cx="65" cy="45" r="3" fill="#C5A059" opacity="0.6" />
            </svg>
          </div>

          {/* Interactive Wax Seal with Unsealing Animation */}
          <div className="relative mx-auto mb-3 flex justify-center">
            <button
              type="button"
              onClick={handleOpenClick}
              aria-label="Chạm vào con dấu sáp để mở thiệp cưới"
              className={`group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#334E3E] via-[#243B2E] to-[#17271E] text-white shadow-xl shadow-[#2C4134]/35 ring-4 ring-[#E8F0EB] transition-all duration-500 ${
                isUnsealed
                  ? "scale-125 opacity-0 rotate-12"
                  : "animate-wax hover:scale-105 active:scale-95"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EADBCE]/80 bg-[#283E31]">
                <span className="font-serif text-sm font-bold tracking-wider text-[#F7F2EC]">
                  L&amp;A
                </span>
              </div>
              <span
                aria-hidden="true"
                className="absolute -inset-1 rounded-full border border-dashed border-[#DFCBB5]/80 pointer-events-none"
              />
            </button>
          </div>

          {/* Top Badge: SAVE THE DATE */}
          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.28em] text-[#A67C43] uppercase">
            <Sparkles className="h-3 w-3 text-[#C5A059]" />
            <span>Save The Date</span>
            <Sparkles className="h-3 w-3 text-[#C5A059]" />
          </div>

          <p className="mt-1 font-serif text-[11px] tracking-[0.24em] text-[#697E72] uppercase">
            Thiệp Cưới Báo Hỷ
          </p>

          {/* Inner Card Presentation - Slides Upward When Opened */}
          <div
            className={`transition-all duration-700 ease-out ${
              isSliding ? "-translate-y-8 scale-[1.02] opacity-95" : "translate-y-0 opacity-100"
            }`}
          >
            {/* Couple Names in Classical Royal Serif */}
            <div className="mt-3">
              <h1 className="font-serif text-3xl font-normal tracking-wide text-[#23372B] sm:text-4xl">
                {WEDDING_CONFIG.groom.name}
              </h1>
              <div className="my-0.5 font-script text-2xl text-[#C5A059] italic">&amp;</div>
              <h1 className="font-serif text-3xl font-normal tracking-wide text-[#23372B] sm:text-4xl">
                {WEDDING_CONFIG.bride.name}
              </h1>
            </div>

            {/* Subtle Fleuron Divider */}
            <div className="my-3.5 flex items-center justify-center gap-2 text-[#C5A059]">
              <span className="h-px w-10 bg-[#DFCBB5]" />
              <span className="text-[10px]">✦</span>
              <span className="h-px w-10 bg-[#DFCBB5]" />
            </div>

            {/* Wedding Date */}
            <p className="font-serif text-xs font-semibold tracking-[0.18em] text-[#3A4F42]">
              Chủ Nhật, 20 tháng 12, 2026 · 11:00 AM
            </p>

            {/* Recipient Invitation Lines */}
            <div className="mt-3.5 space-y-0.5">
              <p className="text-xs text-[#697E72] italic">Trân trọng kính mời</p>
              <p className="font-serif text-base font-semibold text-[#23372B]">
                Quý Khách &amp; Người Thương
              </p>
              <p className="text-xs text-[#5E7367]">
                đến dự buổi tiệc chung vui cùng gia đình chúng tôi
              </p>
            </div>
          </div>

          {/* Elegant Action Button: Mở thiệp */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleOpenClick}
              disabled={isUnsealed}
              className={`group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#2C4134] px-8 py-3 text-xs font-semibold tracking-wider text-white uppercase shadow-lg shadow-[#2C4134]/30 transition-all hover:bg-[#1E2E25] hover:shadow-xl active:scale-[0.98] ${
                isUnsealed ? "opacity-75 scale-95" : ""
              }`}
            >
              <Music2 className="h-4 w-4 text-[#DFCBB5] transition-transform group-hover:scale-110" />
              <span>{isUnsealed ? "Đang mở thiệp..." : "Mở thiệp"}</span>
              <Heart className="h-3.5 w-3.5 fill-[#DFCBB5] text-[#DFCBB5]" />
            </button>
          </div>

          {/* Music hint */}
          <p className="mt-2.5 text-[10px] text-[#7A9184]">
            Giai điệu: <span className="font-medium text-[#496152]">{WEDDING_CONFIG.musicTitle}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
