"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Gift,
  Heart,
  MapPin,
  MessageSquareHeart,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";

interface FloatingToolbarProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
}

export default function FloatingToolbar({
  isPlaying,
  onToggleMusic,
}: FloatingToolbarProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const autoScrollRafRef = useRef<number | null>(null);

  // Auto-scroll loop
  useEffect(() => {
    if (!isAutoScrolling) {
      if (autoScrollRafRef.current) cancelAnimationFrame(autoScrollRafRef.current);
      return;
    }

    const scrollStep = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        setIsAutoScrolling(false);
        return;
      }
      window.scrollBy(0, 1.2);
      autoScrollRafRef.current = requestAnimationFrame(scrollStep);
    };

    autoScrollRafRef.current = requestAnimationFrame(scrollStep);

    const handleUserTouch = () => {
      setIsAutoScrolling(false);
    };

    window.addEventListener("wheel", handleUserTouch, { passive: true });
    window.addEventListener("touchmove", handleUserTouch, { passive: true });

    return () => {
      if (autoScrollRafRef.current) cancelAnimationFrame(autoScrollRafRef.current);
      window.removeEventListener("wheel", handleUserTouch);
      window.removeEventListener("touchmove", handleUserTouch);
    };
  }, [isAutoScrolling]);

  const toggleAutoScroll = () => {
    setIsAutoScrolling((prev) => !prev);
    setIsOpenMenu(false);
  };

  const scrollToSection = (id: string) => {
    setIsOpenMenu(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Floating Equalizer Audio Pill */}
      <div className="fixed top-3.5 right-3.5 z-40 sm:top-4 sm:right-6">
        <button
          type="button"
          onClick={onToggleMusic}
          aria-label={isPlaying ? "Tạm dừng nhạc nền" : "Phát nhạc nền"}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#DFCBB5] bg-white/90 px-3 py-1.5 text-[11px] font-medium text-[#2C4134] shadow-sm backdrop-blur-md transition hover:bg-white active:scale-95"
        >
          {isPlaying ? (
            <>
              {/* Equalizer animation bars */}
              <span className="flex items-end gap-0.5 h-3 w-3 text-[#2C4134]">
                <span className="w-0.5 bg-[#2C4134] rounded-full animate-[eq-bar_0.8s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-[#2C4134] rounded-full animate-[eq-bar_0.8s_ease-in-out_0.2s_infinite]" />
                <span className="w-0.5 bg-[#2C4134] rounded-full animate-[eq-bar_0.8s_ease-in-out_0.4s_infinite]" />
              </span>
              <span>Tạm dừng</span>
            </>
          ) : (
            <>
              <VolumeX className="h-3 w-3 text-[#7A9184]" />
              <span>Bật nhạc</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom Floating Navigation Toolbar & FAB */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-[420px] px-3 pointer-events-none flex flex-col items-center gap-2">
        {/* Expanded Navigation Menu */}
        {isOpenMenu && (
          <div className="pointer-events-auto mb-1 flex w-full max-w-[280px] flex-col gap-1 rounded-2xl border border-[#DFCBB5] bg-white/95 p-2 shadow-xl backdrop-blur-md text-xs font-semibold text-[#2C4134] animate-lightbox-zoom">
            <button
              type="button"
              onClick={onToggleMusic}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-[#F4F8F5]"
            >
              {isPlaying ? (
                <Volume2 className="h-4 w-4 text-[#A34857]" />
              ) : (
                <VolumeX className="h-4 w-4 text-[#7A9184]" />
              )}
              <span>{isPlaying ? "Tắt âm thanh" : "Bật âm thanh"}</span>
            </button>

            <button
              type="button"
              onClick={toggleAutoScroll}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-[#F4F8F5]"
            >
              {isAutoScrolling ? (
                <>
                  <Pause className="h-4 w-4 text-[#A34857]" />
                  <span>Dừng tự động cuộn</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 text-[#2C4134]" />
                  <span>Bật tự động cuộn</span>
                </>
              )}
            </button>

            <div className="my-0.5 border-t border-[#F0EAE1]" />

            <button
              type="button"
              onClick={() => scrollToSection("events")}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-[#F4F8F5]"
            >
              <MapPin className="h-4 w-4 text-[#C5A059]" />
              <span>Thời gian &amp; Địa điểm</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("timeline")}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-[#F4F8F5]"
            >
              <Calendar className="h-4 w-4 text-[#C5A059]" />
              <span>Lịch trình ngày cưới</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("gift-box")}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-[#F4F8F5]"
            >
              <Gift className="h-4 w-4 text-[#C5A059]" />
              <span>Mừng cưới / Quét QR</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("rsvp")}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-[#F4F8F5] text-[#A34857]"
            >
              <MessageSquareHeart className="h-4 w-4" />
              <span>Xác nhận tham dự (RSVP)</span>
            </button>
          </div>
        )}

        {/* Sleek Translucent Floating Bar (Chuẩn NgayChungDoi) */}
        <div className="pointer-events-auto flex items-center justify-between gap-1 rounded-full border border-[#DFCBB5] bg-white/90 px-3 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md w-full max-w-[340px]">
          <button
            type="button"
            onClick={() => scrollToSection("rsvp")}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#2C4134] hover:text-[#1A2820] transition"
          >
            <MessageSquareHeart className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Gửi lời chúc</span>
          </button>

          <span className="h-3 w-px bg-[#E2D8CC]" />

          <button
            type="button"
            onClick={() => scrollToSection("gift-box")}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#2C4134] hover:text-[#1A2820] transition"
          >
            <Gift className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Mừng cưới</span>
          </button>

          <span className="h-3 w-px bg-[#E2D8CC]" />

          <button
            type="button"
            onClick={toggleAutoScroll}
            aria-label={isAutoScrolling ? "Dừng tự động cuộn" : "Bật tự động cuộn"}
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-[#2C4134] hover:text-[#1A2820] transition"
          >
            {isAutoScrolling ? (
              <Pause className="h-3.5 w-3.5 text-[#A34857]" />
            ) : (
              <Play className="h-3.5 w-3.5 text-[#2C4134]" />
            )}
            <span className="hidden xs:inline">Cuộn</span>
          </button>

          {/* Avatar Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpenMenu((prev) => !prev)}
            aria-label={isOpenMenu ? "Đóng thanh công cụ" : "Mở thanh công cụ"}
            className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DFCBB5] bg-[#2C4134] text-white shadow-sm overflow-hidden transition hover:scale-105 active:scale-95"
          >
            {isOpenMenu ? (
              <X className="h-4 w-4 text-white" />
            ) : (
              <Heart className="h-3.5 w-3.5 fill-[#DFCBB5] text-[#DFCBB5]" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
