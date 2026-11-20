"use client";

import { useEffect, useState } from "react";
import { Heart, Music, Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";

interface OpeningCoverProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function OpeningCover({ onOpen, isOpen }: OpeningCoverProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onOpen}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#1C3327] via-[#233D31] to-[#182B21] p-4 text-[#FDFBF7] backdrop-blur-md select-none transition-all duration-700"
    >
      {/* Ambient floating golden sparkles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span
          className="animate-sparkle absolute top-12 left-10 h-2 w-2 rounded-full bg-[#E5C992]"
          style={{ "--duration": "3.5s", "--delay": "0.2s" } as React.CSSProperties}
        />
        <span
          className="animate-sparkle absolute top-1/4 right-12 h-3 w-3 rounded-full bg-[#F5DFC2]"
          style={{ "--duration": "4.5s", "--delay": "1.2s" } as React.CSSProperties}
        />
        <span
          className="animate-sparkle absolute bottom-24 left-16 h-2.5 w-2.5 rounded-full bg-[#E5C992]"
          style={{ "--duration": "4s", "--delay": "2s" } as React.CSSProperties}
        />
        <span
          className="animate-sparkle absolute bottom-1/3 right-8 h-2 w-2 rounded-full bg-[#F5DFC2]"
          style={{ "--duration": "3s", "--delay": "0.8s" } as React.CSSProperties}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#C69C6D]/15 blur-3xl" />
      </div>

      {/* Luxury Opening Envelope Card (Phong cách NgayChungDoi) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-lightbox-zoom relative w-full max-w-[390px] rounded-[32px] border border-[#C69C6D]/50 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#F5ECE1] p-6 text-center text-[#352629] shadow-[0_28px_70px_rgba(0,0,0,0.55)] sm:p-8"
      >
        {/* Four golden ornamental corner brackets */}
        <span
          aria-hidden="true"
          className="absolute top-3.5 left-3.5 h-3.5 w-3.5 border-t-2 border-l-2 border-[#C69C6D]"
        />
        <span
          aria-hidden="true"
          className="absolute top-3.5 right-3.5 h-3.5 w-3.5 border-t-2 border-r-2 border-[#C69C6D]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3.5 left-3.5 h-3.5 w-3.5 border-b-2 border-l-2 border-[#C69C6D]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3.5 right-3.5 h-3.5 w-3.5 border-b-2 border-r-2 border-[#C69C6D]"
        />

        {/* Top Tagline */}
        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.26em] text-[#9C6E3B] uppercase">
          <Sparkles className="h-3 w-3 text-[#C69C6D]" />
          <span>Save The Date</span>
          <Sparkles className="h-3 w-3 text-[#C69C6D]" />
        </div>

        <p className="mt-2 font-serif text-xs tracking-[0.2em] text-[#7A5B61] uppercase">
          Thiệp Cưới Báo Hỷ
        </p>

        {/* Couple Names */}
        <h1 className="mt-2 font-script text-4xl font-bold tracking-wide text-[#9F3A4B] sm:text-5xl">
          {WEDDING_CONFIG.groom.name} &amp; {WEDDING_CONFIG.bride.name}
        </h1>

        <p className="mt-1.5 font-serif text-sm tracking-[0.2em] font-semibold text-[#5A343B]">
          {WEDDING_CONFIG.dateDisplay}
        </p>

        {/* Vintage Wax Seal Medallion (Con dấu sáp hoàng gia) */}
        <div className="my-6 flex justify-center">
          <button
            type="button"
            onClick={onOpen}
            aria-label="Chạm vào con dấu để mở thiệp"
            className="animate-wax group relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#B54255] via-[#9F3A4B] to-[#752433] text-white shadow-[0_12px_28px_rgba(159,58,75,0.45)] transition hover:scale-105 active:scale-95"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#F5DFC2]/70 bg-gradient-to-br from-[#9F3A4B] to-[#6E1C2B] shadow-inner">
              <span className="font-serif text-xl font-bold tracking-wider text-[#FCEEF0]">
                L&amp;A
              </span>
            </div>
            {/* Outer seal texture ring */}
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full border border-dashed border-[#F0D09B]/70 opacity-80"
            />
          </button>
        </div>

        <p className="mx-auto max-w-[270px] text-xs leading-relaxed text-[#6E5459]">
          Trân trọng kính mời quý khách mở thiệp để xem thông tin lễ cưới và lắng
          nghe giai điệu yêu thương.
        </p>

        {/* Action Button: Mở thiệp */}
        <button
          type="button"
          onClick={onOpen}
          className="group mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-[#233D31] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#233D31]/30 transition hover:bg-[#1A2E25] active:scale-[0.98]"
        >
          <Music className="h-4 w-4 text-[#E5C992] transition-transform group-hover:scale-110" />
          <span>Mở thiệp</span>
          <Heart className="h-4 w-4 fill-[#F2B8C4] text-[#F2B8C4]" />
        </button>

        <p className="mt-3 text-[11px] text-[#8C7076]">
          Giai điệu: <strong>{WEDDING_CONFIG.musicTitle}</strong>
        </p>
      </div>
    </div>
  );
}
