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
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isOpen) return null;

  const handleOpenClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleOpenClick}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#1A2820]/95 via-[#23372B]/95 to-[#16221B]/95 p-4 text-[#2C3E32] backdrop-blur-md select-none transition-all duration-700 ${
        isClosing ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Floating golden specks and soft ambient particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span
          className="animate-sparkle absolute top-14 left-12 h-1.5 w-1.5 rounded-full bg-[#E5C992]"
          style={{ "--duration": "4s", "--delay": "0.1s" } as React.CSSProperties}
        />
        <span
          className="animate-sparkle absolute top-1/3 right-14 h-2 w-2 rounded-full bg-[#F5DFC2]"
          style={{ "--duration": "5s", "--delay": "1s" } as React.CSSProperties}
        />
        <span
          className="animate-sparkle absolute bottom-28 left-20 h-2 w-2 rounded-full bg-[#E5C992]"
          style={{ "--duration": "4.5s", "--delay": "2s" } as React.CSSProperties}
        />
        <span
          className="animate-sparkle absolute bottom-1/4 right-16 h-1.5 w-1.5 rounded-full bg-[#F5DFC2]"
          style={{ "--duration": "3.5s", "--delay": "0.5s" } as React.CSSProperties}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#8CA696]/10 blur-3xl pointer-events-none" />
      </div>

      {/* Pure Luxury White Botanical Wedding Card (Phong cách NgayChungDoi chuẩn boutique) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[400px] overflow-hidden rounded-[32px] border border-[#DFCBB5]/80 bg-[#FCFBF8] p-7 text-center shadow-[0_25px_70px_rgba(0,0,0,0.45)] sm:p-9"
      >
        {/* Soft Botanical Watercolor Leaf Accents in corners (SVG) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 w-36 h-36 opacity-35"
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
            <circle cx="65" cy="45" r="3" fill="#D4AF37" opacity="0.6" />
            <circle cx="85" cy="70" r="2.5" fill="#D4AF37" opacity="0.5" />
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 w-36 h-36 opacity-35 -scale-x-100"
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
            <circle cx="65" cy="45" r="3" fill="#D4AF37" opacity="0.6" />
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 w-32 h-32 opacity-30 -scale-y-100"
        >
          <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
            <path
              d="M15 15C40 30 65 55 70 85C75 115 55 135 50 140"
              stroke="#5B7B68"
              strokeWidth="2"
            />
            <ellipse cx="60" cy="55" rx="8" ry="16" transform="rotate(30 60 55)" fill="#7A9A87" opacity="0.5" />
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 w-32 h-32 opacity-30 -scale-x-100 -scale-y-100"
        >
          <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
            <path
              d="M15 15C40 30 65 55 70 85C75 115 55 135 50 140"
              stroke="#5B7B68"
              strokeWidth="2"
            />
            <ellipse cx="60" cy="55" rx="8" ry="16" transform="rotate(30 60 55)" fill="#7A9A87" opacity="0.5" />
          </svg>
        </div>

        {/* Top Medallion / Wax Seal in Forest Green */}
        <div className="relative mx-auto mb-4 flex justify-center">
          <button
            type="button"
            onClick={handleOpenClick}
            aria-label="Chạm để mở thiệp cưới"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#334E3E] to-[#1E3025] text-white shadow-lg shadow-[#2C4134]/30 ring-4 ring-[#E8F0EB] transition-transform hover:scale-105 active:scale-95"
          >
            <Heart className="h-6 w-6 fill-white text-white drop-shadow-sm transition-transform group-hover:scale-110" />
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

        {/* Subtle Ornamental Fleuron Divider */}
        <div className="my-4 flex items-center justify-center gap-2 text-[#C5A059]">
          <span className="h-px w-10 bg-[#DFCBB5]" />
          <span className="text-[10px]">✦</span>
          <span className="h-px w-10 bg-[#DFCBB5]" />
        </div>

        {/* Wedding Date */}
        <p className="font-serif text-xs font-semibold tracking-[0.18em] text-[#3A4F42]">
          Chủ Nhật, 20 tháng 12, 2026 · 11:00 AM
        </p>

        {/* Recipient Invitation Lines */}
        <div className="mt-4 space-y-1">
          <p className="text-xs text-[#697E72] italic">Trân trọng kính mời</p>
          <p className="font-serif text-base font-semibold text-[#23372B]">
            Quý Khách &amp; Người Thương
          </p>
          <p className="text-xs text-[#5E7367]">
            đến dự buổi tiệc chung vui cùng gia đình chúng tôi
          </p>
        </div>

        {/* Elegant Action Button: Mở thiệp */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleOpenClick}
            className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#2C4134] px-8 py-3 text-xs font-semibold tracking-wider text-white uppercase shadow-lg shadow-[#2C4134]/30 transition-all hover:bg-[#1E2E25] hover:shadow-xl active:scale-[0.98]"
          >
            <Music2 className="h-4 w-4 text-[#DFCBB5] transition-transform group-hover:scale-110" />
            <span>Mở thiệp</span>
            <Heart className="h-3.5 w-3.5 fill-[#DFCBB5] text-[#DFCBB5]" />
          </button>
        </div>

        {/* Music hint */}
        <p className="mt-3 text-[11px] text-[#7A9184]">
          Giai điệu: <span className="font-medium text-[#496152]">{WEDDING_CONFIG.musicTitle}</span>
        </p>
      </div>
    </div>
  );
}
