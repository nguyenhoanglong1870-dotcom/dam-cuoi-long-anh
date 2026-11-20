"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Music, Sparkles, Volume2, VolumeX } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const userPausedRef = useRef(false);

  // Khởi tạo audio và thử phát tự động
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    // Thử phát ngay nếu trình duyệt cho phép (VD: Desktop có tương tác từ trước)
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setHasOpened(true);
      })
      .catch(() => {
        // Trình duyệt chặn autoplay theo chính sách Autoplay Policy
      });

    // Bắt mọi tương tác chạm/bấm bất kỳ trên màn hình để bật nhạc ngay
    const handleAnyUserInteraction = () => {
      if (userPausedRef.current) return;
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasOpened(true);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("click", handleAnyUserInteraction, { passive: true });
    window.addEventListener("touchend", handleAnyUserInteraction, { passive: true });
    window.addEventListener("pointerup", handleAnyUserInteraction, { passive: true });

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      window.removeEventListener("click", handleAnyUserInteraction);
      window.removeEventListener("touchend", handleAnyUserInteraction);
      window.removeEventListener("pointerup", handleAnyUserInteraction);
    };
  }, []);

  // Xử lý khi khách bấm nút "Mở Thiệp & Bật Nhạc"
  const handleOpenInvitation = () => {
    userPausedRef.current = false;
    setHasOpened(true);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.7;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Không thể phát nhạc:", err);
        });
    }
  };

  // Nút bật/tắt đĩa than thủ công
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      userPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      userPausedRef.current = false;
      audio.volume = 0.7;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={WEDDING_CONFIG.musicSrc}
        loop
        preload="auto"
      />

      {/* Màn hình bì thư mở thiệp trang trọng (Đảm bảo 100% tự phát nhạc trên mọi dòng máy iPhone & Android) */}
      {!hasOpened && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={handleOpenInvitation}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#251A1D]/75 p-4 backdrop-blur-md transition-all duration-700"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-lightbox-zoom relative w-full max-w-sm rounded-[32px] border-2 border-[#C69C6D]/70 bg-gradient-to-b from-[#FFFDF9] via-white to-[#FFF6F7] p-6 text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] sm:p-8"
          >
            {/* Họa tiết góc mạ vàng */}
            <span
              aria-hidden="true"
              className="absolute top-3 left-3 h-3.5 w-3.5 border-t-2 border-l-2 border-[#C69C6D]"
            />
            <span
              aria-hidden="true"
              className="absolute top-3 right-3 h-3.5 w-3.5 border-t-2 border-r-2 border-[#C69C6D]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-3 h-3.5 w-3.5 border-b-2 border-l-2 border-[#C69C6D]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 h-3.5 w-3.5 border-b-2 border-r-2 border-[#C69C6D]"
            />

            {/* Monogram Crest */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#C69C6D] bg-[#FCEEF0] text-[#9F3A4B] shadow-inner">
              <Heart className="h-8 w-8 fill-[#9F3A4B]" />
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.24em] text-[#B88B58] uppercase">
              <Sparkles className="h-3 w-3 text-[#C69C6D]" />
              <span>Wedding Invitation</span>
              <Sparkles className="h-3 w-3 text-[#C69C6D]" />
            </div>

            <h2 className="mt-2 font-serif text-xs tracking-[0.2em] text-[#7A5B61] uppercase">
              Thiệp Cưới Báo Hỷ
            </h2>

            <p className="mt-1 font-script text-4xl font-bold text-[#9F3A4B] sm:text-5xl">
              {WEDDING_CONFIG.groom.name} &amp; {WEDDING_CONFIG.bride.name}
            </p>

            <p className="mt-2 font-serif text-sm tracking-widest text-[#5A343B]">
              20 . 12 . 2026
            </p>

            <p className="mx-auto mt-4 max-w-xs text-xs leading-relaxed text-[#7A5B61]">
              Trân trọng kính mời quý khách bấm mở thiệp để cùng chung vui và
              thưởng thức giai điệu ngày hạnh phúc.
            </p>

            {/* Nút to bản: Mở Thiệp & Tự Động Bật Nhạc */}
            <button
              type="button"
              onClick={handleOpenInvitation}
              className="group relative mt-6 inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-[#9F3A4B] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#9F3A4B]/35 transition hover:bg-[#872E3E] active:scale-[0.98]"
            >
              <Music className="h-5 w-5 animate-bounce" />
              <span>Mở Thiệp &amp; Bật Nhạc</span>
            </button>

            <p className="mt-3 text-[11px] text-[#A08288] italic">
              Bài hát: {WEDDING_CONFIG.musicTitle}
            </p>
          </div>
        </div>
      )}

      {/* Nút Đĩa Than Xoay Góc Dưới (Khi đã vào trong thiệp) */}
      <div className="fixed right-4 bottom-5 z-40 flex items-center gap-2.5 sm:right-6 sm:bottom-6">
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
              <span>Phát nhạc: Em Đồng Ý</span>
            </>
          )}
        </button>

        {/* Nút đĩa than xoay (Vinyl Record Button) */}
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Tắt nhạc nền cưới" : "Bật nhạc nền: Em Đồng Ý"}
          title={isPlaying ? "Tắt nhạc nền" : "Bật nhạc: Em Đồng Ý"}
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
    </>
  );
}
