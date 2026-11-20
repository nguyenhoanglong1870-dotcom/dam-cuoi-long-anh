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

    // Immediately play music on genuine user click/tap
    onOpen();

    // Trigger multi-stage cinematic envelope opening
    setOpeningPhase("unsealing");

    setTimeout(() => {
      setOpeningPhase("sliding");
    }, 380);

    setTimeout(() => {
      setOpeningPhase("done");
    }, 1050);
  };

  const isUnsealed = openingPhase === "unsealing" || openingPhase === "sliding" || openingPhase === "done";
  const isSliding = openingPhase === "sliding" || openingPhase === "done";
  const isDone = openingPhase === "done";

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleOpenClick}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#142018]/96 via-[#1B2B21]/96 to-[#0F1912]/96 p-4 text-[#F5ECE1] backdrop-blur-md select-none transition-all duration-700 ${
        isDone ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Floating golden ambient particles & lights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span
          className="animate-sparkle absolute top-12 left-10 h-2 w-2 rounded-full bg-[#E5C992]"
          style={{ "--duration": "3.5s", "--delay": "0.1s" } as React.CSSProperties}
        />
        <span
          className="animate-sparkle absolute top-1/4 right-14 h-2.5 w-2.5 rounded-full bg-[#F5DFC2]"
          style={{ "--duration": "4.5s", "--delay": "0.8s" } as React.CSSProperties}
        />
        <span
          className="animate-sparkle absolute bottom-24 left-16 h-2 w-2 rounded-full bg-[#E5C992]"
          style={{ "--duration": "4s", "--delay": "1.8s" } as React.CSSProperties}
        />
        <span
          className="animate-sparkle absolute bottom-1/3 right-12 h-2 w-2 rounded-full bg-[#F5DFC2]"
          style={{ "--duration": "3s", "--delay": "0.4s" } as React.CSSProperties}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none" />
      </div>

      {/* Luxury Royal Emerald Wedding Envelope Card (Ảnh 2 Nâng Cấp Hiệu Ứng Hoàng Gia) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[390px] overflow-hidden rounded-[34px] border-2 border-[#C5A059]/70 bg-gradient-to-b from-[#1E2E23] via-[#17251C] to-[#111B14] p-6 text-center text-[#F5ECE1] shadow-[0_30px_90px_rgba(0,0,0,0.65)] sm:p-8"
      >
        {/* Shimmer Light Reflection Sweep (Vệt sáng kim sa quét qua thiệp) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-y-10 -left-full w-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer"
        />

        {/* Inner Gold Inset Border with Rounded Corners */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2.5 rounded-[26px] border border-[#C5A059]/35"
        />

        {/* 4 Ornate Victorian Gold Filigree Corners (Họa tiết góc mạ vàng hoàng gia) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-3.5 left-3.5 w-8 h-8 text-[#C5A059]/80"
        >
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full stroke-current stroke-[1.5]">
            <path d="M4 36 V12 C4 7.5 7.5 4 12 4 H36" />
            <path d="M8 32 V14 C8 10.7 10.7 8 14 8 H32" opacity="0.6" />
            <circle cx="16" cy="16" r="3" fill="#C5A059" opacity="0.75" />
            <path d="M4 4 L14 14" opacity="0.5" />
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-3.5 right-3.5 w-8 h-8 text-[#C5A059]/80 -scale-x-100"
        >
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full stroke-current stroke-[1.5]">
            <path d="M4 36 V12 C4 7.5 7.5 4 12 4 H36" />
            <path d="M8 32 V14 C8 10.7 10.7 8 14 8 H32" opacity="0.6" />
            <circle cx="16" cy="16" r="3" fill="#C5A059" opacity="0.75" />
            <path d="M4 4 L14 14" opacity="0.5" />
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3.5 left-3.5 w-8 h-8 text-[#C5A059]/80 -scale-y-100"
        >
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full stroke-current stroke-[1.5]">
            <path d="M4 36 V12 C4 7.5 7.5 4 12 4 H36" />
            <path d="M8 32 V14 C8 10.7 10.7 8 14 8 H32" opacity="0.6" />
            <circle cx="16" cy="16" r="3" fill="#C5A059" opacity="0.75" />
            <path d="M4 4 L14 14" opacity="0.5" />
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3.5 right-3.5 w-8 h-8 text-[#C5A059]/80 -scale-x-100 -scale-y-100"
        >
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full stroke-current stroke-[1.5]">
            <path d="M4 36 V12 C4 7.5 7.5 4 12 4 H36" />
            <path d="M8 32 V14 C8 10.7 10.7 8 14 8 H32" opacity="0.6" />
            <circle cx="16" cy="16" r="3" fill="#C5A059" opacity="0.75" />
            <path d="M4 4 L14 14" opacity="0.5" />
          </svg>
        </div>

        {/* Twinkling Gold Stars (Các đốm sao lấp lánh điểm xuyết) */}
        <span
          aria-hidden="true"
          className="animate-twinkle absolute top-9 left-14 text-[#E5C992] text-xs pointer-events-none"
          style={{ "--duration": "2.8s", "--delay": "0.2s" } as React.CSSProperties}
        >
          ✦
        </span>
        <span
          aria-hidden="true"
          className="animate-twinkle absolute top-12 right-14 text-[#E5C992] text-xs pointer-events-none"
          style={{ "--duration": "3.4s", "--delay": "1.2s" } as React.CSSProperties}
        >
          ✦
        </span>
        <span
          aria-hidden="true"
          className="animate-twinkle absolute bottom-20 left-12 text-[#E5C992] text-[10px] pointer-events-none"
          style={{ "--duration": "2.5s", "--delay": "0.6s" } as React.CSSProperties}
        >
          ✦
        </span>
        <span
          aria-hidden="true"
          className="animate-twinkle absolute bottom-24 right-12 text-[#E5C992] text-[10px] pointer-events-none"
          style={{ "--duration": "3.1s", "--delay": "1.6s" } as React.CSSProperties}
        >
          ✦
        </span>

        {/* 3D Wax Seal with Realistic Embossing and Pulse Glow */}
        <div className="relative mx-auto mb-3 flex justify-center">
          <button
            type="button"
            onClick={handleOpenClick}
            aria-label="Chạm vào con dấu sáp để mở thiệp"
            className={`group relative flex h-18 w-18 items-center justify-center rounded-full bg-gradient-to-br from-[#385945] via-[#2A4434] to-[#1A2D22] text-white shadow-[0_10px_28px_rgba(0,0,0,0.55)] ring-4 ring-[#C5A059]/40 transition-all duration-500 ${
              isUnsealed
                ? "scale-125 opacity-0 rotate-12"
                : "animate-wax hover:scale-105 active:scale-95 cursor-pointer"
            }`}
          >
            {/* Outer dashed gold ring */}
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full border border-dashed border-[#DFCBB5] opacity-80 pointer-events-none"
            />
            
            {/* Inner embossed medallion */}
            <div className="flex h-13 w-13 items-center justify-center rounded-full border border-[#DFCBB5]/80 bg-gradient-to-br from-[#2D4937] to-[#1C3225] shadow-inner">
              <span className="font-serif text-base font-bold tracking-widest text-[#F5ECE1] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                L&amp;A
              </span>
            </div>
          </button>
        </div>

        {/* Top Tagline: SAVE THE DATE */}
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] text-[#E5C992] uppercase">
          <Sparkles className="h-3 w-3 text-[#C5A059] animate-pulse" />
          <span>Save The Date</span>
          <Sparkles className="h-3 w-3 text-[#C5A059] animate-pulse" />
        </div>

        <p className="mt-1 font-serif text-xs tracking-[0.24em] text-[#C2B5A5] uppercase">
          Thiệp Cưới Báo Hỷ
        </p>

        {/* Inner Content Block - Slides Upwards with Light Glow when Unsealed */}
        <div
          className={`transition-all duration-700 ease-out ${
            isSliding ? "-translate-y-8 scale-[1.02] opacity-90" : "translate-y-0 opacity-100"
          }`}
        >
          {/* Couple Names in Classical Royal Serif */}
          <div className="mt-3.5 space-y-0.5">
            <h1 className="font-serif text-3xl font-medium tracking-wide text-white drop-shadow-sm sm:text-4xl">
              {WEDDING_CONFIG.groom.name}
            </h1>
            <div className="font-script text-2xl text-[#E5C992] italic my-0.5">&amp;</div>
            <h1 className="font-serif text-3xl font-medium tracking-wide text-white drop-shadow-sm sm:text-4xl">
              {WEDDING_CONFIG.bride.name}
            </h1>
          </div>

          {/* Ornamental Gold Divider */}
          <div className="my-3.5 flex items-center justify-center gap-2 text-[#C5A059]">
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
            <span className="text-xs">✦</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent via-[#C5A059] to-transparent" />
          </div>

          {/* Wedding Date */}
          <p className="font-serif text-xs font-semibold tracking-[0.2em] text-[#E8DCCF]">
            Chủ Nhật, 20 tháng 12, 2026 · 11:00 AM
          </p>

          {/* Recipient Invitation Lines */}
          <div className="mt-3.5 space-y-0.5">
            <p className="text-xs italic text-[#BDB0A2]">Trân trọng kính mời</p>
            <p className="font-serif text-base font-semibold text-white tracking-wide">
              Quý Khách &amp; Người Thương
            </p>
            <p className="text-xs text-[#A89C8F]">
              đến dự buổi tiệc chung vui cùng gia đình chúng tôi
            </p>
          </div>
        </div>

        {/* Action Button: MỞ THIỆP */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleOpenClick}
            disabled={isUnsealed}
            className={`group relative inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full border border-[#C5A059]/60 bg-gradient-to-r from-[#2C4A37] via-[#355A43] to-[#253E2E] px-8 py-3 text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-[#182B1F]/60 transition-all hover:scale-[1.02] hover:border-[#E5C992] active:scale-[0.98] cursor-pointer ${
              isUnsealed ? "opacity-75 scale-95" : ""
            }`}
          >
            <Music2 className="h-4 w-4 text-[#E5C992] transition-transform group-hover:scale-110 animate-bounce" />
            <span className="text-sm font-semibold tracking-wider">
              {isUnsealed ? "Đang mở thiệp..." : "Mở thiệp"}
            </span>
            <Heart className="h-4 w-4 fill-[#F2B8C4] text-[#F2B8C4] transition-transform group-hover:scale-110" />
          </button>
        </div>

        {/* Music hint */}
        <p className="mt-3 text-[11px] text-[#A6998C]">
          Giai điệu: <strong className="font-medium text-[#E5C992]">{WEDDING_CONFIG.musicTitle}</strong>
        </p>
      </div>
    </div>
  );
}
