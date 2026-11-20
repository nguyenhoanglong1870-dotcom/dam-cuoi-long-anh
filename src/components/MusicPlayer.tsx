"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const userPausedRef = useRef(false);
  const hasAutoStartedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    /**
     * Tự động bật nhạc khi khách chạm/bấm bất kỳ vị trí nào trên màn hình lần đầu
     * (Khắc phục chính sách Autoplay Policy của Chrome, Safari iOS, Android).
     */
    const triggerAutoPlay = () => {
      if (hasAutoStartedRef.current || userPausedRef.current) return;
      hasAutoStartedRef.current = true;
      audio.volume = 0.65;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Trình duyệt chưa cho phép, cho phép thử lại ở lần bấm tiếp theo
          hasAutoStartedRef.current = false;
        });
    };

    window.addEventListener("click", triggerAutoPlay, { passive: true });
    window.addEventListener("touchstart", triggerAutoPlay, { passive: true });
    window.addEventListener("pointerdown", triggerAutoPlay, { passive: true });
    window.addEventListener("scroll", triggerAutoPlay, { passive: true, once: true });

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      window.removeEventListener("click", triggerAutoPlay);
      window.removeEventListener("touchstart", triggerAutoPlay);
      window.removeEventListener("pointerdown", triggerAutoPlay);
      window.removeEventListener("scroll", triggerAutoPlay);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      userPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      userPausedRef.current = false;
      hasAutoStartedRef.current = true;
      audio.volume = 0.65;
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn("Không thể phát nhạc:", err);
    }
  };

  return (
    <div className="fixed right-4 bottom-5 z-40 flex items-center gap-2.5 sm:right-6 sm:bottom-6">
      <audio
        ref={audioRef}
        src={WEDDING_CONFIG.musicSrc}
        loop
        preload="auto"
      />

      {/* Pill label hiển thị trạng thái và tên bài hát */}
      <button
        type="button"
        onClick={toggleMusic}
        className="hidden items-center gap-1.5 rounded-full border border-[#C69C6D]/40 bg-white/95 px-3.5 py-2 text-xs font-medium text-[#6B3741] shadow-md backdrop-blur-md transition hover:bg-white sm:inline-flex"
      >
        {isPlaying ? (
          <>
            <Volume2 className="h-3.5 w-3.5 text-[#9F3A4B] animate-pulse" />
            <span className="max-w-[160px] truncate">
              Đang phát: {WEDDING_CONFIG.musicTitle}
            </span>
          </>
        ) : (
          <>
            <VolumeX className="h-3.5 w-3.5 text-[#9A7A80]" />
            <span>Phát nhạc: Nổi Gió Lên</span>
          </>
        )}
      </button>

      {/* Nút đĩa than xoay (Vinyl Record Button) */}
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Tắt nhạc nền cưới" : "Bật nhạc nền: Nổi Gió Lên"}
        title={isPlaying ? "Tắt nhạc nền" : "Bật nhạc: Nổi Gió Lên"}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9F3A4B] focus-visible:ring-offset-2 sm:h-15 sm:w-15"
      >
        {/* Pulse ring khi đang phát */}
        {isPlaying && (
          <span
            aria-hidden="true"
            className="animate-pulse-ring absolute inset-0 rounded-full border-2 border-[#9F3A4B]/55"
          />
        )}

        {/* Thân đĩa than */}
        <span
          className="animate-vinyl relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#C69C6D]/70 bg-[#1F1A1C] shadow-[0_10px_25px_rgba(31,26,28,0.38)] transition-transform group-active:scale-95"
          style={{
            animationPlayState: isPlaying ? "running" : "paused",
            backgroundImage:
              "repeating-radial-gradient(circle at center, #262022 0px, #262022 2px, #171315 3px, #171315 5px)",
          }}
        >
          {/* Vệt bóng phản chiếu trên đĩa than */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-1 rounded-full bg-gradient-to-tr from-transparent via-white/12 to-transparent"
          />

          {/* Nhãn giữa màu vàng hồng */}
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-[#F5DFC2]/70 bg-gradient-to-br from-[#B84A5D] to-[#8C2D3E] text-white shadow-inner">
            <Music className="h-3 w-3" />
          </span>
        </span>

        {/* Badge nhỏ góc trên chỉ trạng thái tắt tiếng */}
        {!isPlaying && (
          <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-[#9F3A4B] text-white shadow-sm">
            <VolumeX className="h-2.5 w-2.5" />
          </span>
        )}
      </button>
    </div>
  );
}
