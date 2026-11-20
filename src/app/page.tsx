"use client";

import { useEffect, useRef, useState } from "react";
import OpeningCover from "@/components/OpeningCover";
import FloatingToolbar from "@/components/FloatingToolbar";
import FloatingPetals from "@/components/FloatingPetals";
import DesktopQrCompanion from "@/components/DesktopQrCompanion";
import Hero from "@/components/Hero";
import WeddingCalendar from "@/components/Calendar";
import Families from "@/components/Families";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import Event from "@/components/Event";
import GiftBox from "@/components/GiftBox";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";
import { WEDDING_CONFIG } from "@/config/wedding";

export default function HomePage() {
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef(false);

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

    // Thử phát tự động nếu trình duyệt cho phép
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Trình duyệt chặn autoplay khi chưa có tương tác
      });

    // Lắng nghe tương tác chạm/bấm bất kỳ để phát nhạc nếu chưa bị người dùng bấm tạm dừng thủ công
    const handleFirstInteraction = () => {
      if (userPausedRef.current) return;
      if (audio.paused) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    window.addEventListener("click", handleFirstInteraction, { passive: true });
    window.addEventListener("touchend", handleFirstInteraction, { passive: true });

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchend", handleFirstInteraction);
    };
  }, []);

  const handleOpenCover = () => {
    userPausedRef.current = false;
    setIsCoverOpen(true);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.7;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Autoplay block:", err);
        });
    }
  };

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
    <div className="min-h-screen w-full bg-[#F2EFE9] text-[#23372B] flex justify-center selection:bg-[#EBF2ED] selection:text-[#2C4134]">
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src={WEDDING_CONFIG.musicSrc}
        loop
        preload="auto"
      />

      {/* Global Falling Petals Ambient Drift - Active on Opening Cover AND throughout the page */}
      <FloatingPetals />

      {/* Luxury Opening Cover with Monogram Wax Seal (Save The Date) */}
      <OpeningCover isOpen={isCoverOpen} onOpen={handleOpenCover} />

      {/* Sticky Floating Toolbar & Equalizer Pill (NgayChungDoi style) */}
      <FloatingToolbar isPlaying={isPlaying} onToggleMusic={toggleMusic} />

      {/* Floating Companion QR for Desktop Visitors */}
      <DesktopQrCompanion />

      {/* Centered Boutique Mobile Canvas (Chuẩn tỷ lệ vàng như ngaychungdoi.com) */}
      <main className="relative w-full max-w-[460px] min-h-screen bg-[#FCFBF8] shadow-[0_20px_80px_rgba(40,65,50,0.12)] border-x border-[#EAE5DC] overflow-x-hidden">
        {/* Section 1: Hero with Arch-Framed Chibi & Romantic Quote */}
        <Hero />

        {/* Section 2: Save The Date Calendar (Tháng 12/2026 - Ngày 20 hình trái tim) */}
        <WeddingCalendar />

        {/* Section 3: Two Families Announcement */}
        <Families />

        {/* Section 4: We Got Married - Countdown to 20/12/2026 */}
        <Countdown />

        {/* Section 5: Wedding Day Schedule / Timeline */}
        <Timeline />

        {/* Section 6: Wedding Event Details & Google Maps */}
        <Event />

        {/* Section 7: Gift Box with Segmented Groom/Bride Switcher & Vector VietQR */}
        <GiftBox />

        {/* Section 8: RSVP Form with Side Selector & Instant Telegram Notification */}
        <RSVP />

        {/* Section 9: Footer */}
        <Footer />
      </main>
    </div>
  );
}
