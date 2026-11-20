"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Gift,
  Heart,
  MapPin,
  Menu,
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
      // Dừng lại nếu đã cuộn tới cuối trang
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

    // Tạm dừng tự động cuộn nếu khách chủ động chạm hoặc cuộn tay
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
      {/* Top Floating Equalizer Audio Pill (Phong cách NgayChungDoi) */}
      <div className="fixed top-4 right-4 z-40 sm:top-5 sm:right-6">
        <button
          type="button"
          onClick={onToggleMusic}
          aria-label={isPlaying ? "Tạm dừng nhạc nền" : "Phát nhạc nền"}
          className="inline-flex items-center gap-2 rounded-full border border-[#C69C6D]/45 bg-white/95 px-3.5 py-1.5 text-xs font-medium text-[#233D31] shadow-md backdrop-blur-md transition hover:bg-white active:scale-95"
        >
          {isPlaying ? (
            <>
              {/* Equalizer animation bars */}
              <span className="flex items-end gap-0.5 h-3.5 w-3.5 text-[#233D31]">
                <span className="w-1 bg-[#233D31] rounded-full animate-[eq-bar_0.8s_ease-in-out_infinite]" />
                <span className="w-1 bg-[#233D31] rounded-full animate-[eq-bar_0.8s_ease-in-out_0.2s_infinite]" />
                <span className="w-1 bg-[#233D31] rounded-full animate-[eq-bar_0.8s_ease-in-out_0.4s_infinite]" />
              </span>
              <span className="hidden sm:inline">Tạm dừng nhạc</span>
            </>
          ) : (
            <>
              <VolumeX className="h-3.5 w-3.5 text-[#9A7A80]" />
              <span className="hidden sm:inline">Bật nhạc</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom Floating Navigation Toolbar & FAB */}
      <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
        {/* Expanded Navigation Menu */}
        {isOpenMenu && (
          <div className="animate-lightbox-zoom mb-2 flex w-52 flex-col gap-1.5 rounded-2xl border border-[#C69C6D]/45 bg-white/95 p-2 shadow-2xl backdrop-blur-md text-xs font-semibold text-[#233D31]">
            <button
              type="button"
              onClick={onToggleMusic}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition hover:bg-[#FCEEF0]/60"
            >
              {isPlaying ? (
                <Volume2 className="h-4 w-4 text-[#9F3A4B]" />
              ) : (
                <VolumeX className="h-4 w-4 text-[#9A7A80]" />
              )}
              <span>{isPlaying ? "Tắt âm thanh" : "Bật âm thanh"}</span>
            </button>

            <button
              type="button"
              onClick={toggleAutoScroll}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition hover:bg-[#FCEEF0]/60"
            >
              {isAutoScrolling ? (
                <>
                  <Pause className="h-4 w-4 text-[#9F3A4B]" />
                  <span>Dừng tự động cuộn</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 text-[#233D31]" />
                  <span>Bật tự động cuộn</span>
                </>
              )}
            </button>

            <div className="my-1 border-t border-[#F0E1D4]" />

            <button
              type="button"
              onClick={() => scrollToSection("events")}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition hover:bg-[#FCEEF0]/60"
            >
              <MapPin className="h-4 w-4 text-[#C69C6D]" />
              <span>Thời gian &amp; Địa điểm</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("timeline")}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition hover:bg-[#FCEEF0]/60"
            >
              <Calendar className="h-4 w-4 text-[#C69C6D]" />
              <span>Lịch trình ngày cưới</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("gift-box")}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition hover:bg-[#FCEEF0]/60"
            >
              <Gift className="h-4 w-4 text-[#C69C6D]" />
              <span>Mừng cưới / Quét QR</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("rsvp")}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition hover:bg-[#FCEEF0]/60 text-[#9F3A4B]"
            >
              <MessageSquareHeart className="h-4 w-4" />
              <span>Xác nhận tham dự (RSVP)</span>
            </button>
          </div>
        )}

        {/* Main Floating Action Button (FAB) */}
        <button
          type="button"
          onClick={() => setIsOpenMenu((prev) => !prev)}
          aria-label={isOpenMenu ? "Đóng thanh công cụ" : "Mở thanh công cụ"}
          className="group relative flex h-13 w-13 items-center justify-center rounded-full border-2 border-[#C69C6D] bg-[#233D31] text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
        >
          {isOpenMenu ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Heart className="h-4 w-4 fill-[#E5C992] text-[#E5C992]" />
              <span className="text-[9px] font-bold tracking-widest text-white/90 uppercase">
                Menu
              </span>
            </div>
          )}
        </button>
      </div>
    </>
  );
}
