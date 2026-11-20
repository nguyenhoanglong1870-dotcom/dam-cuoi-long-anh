"use client";

import { useEffect, useState } from "react";
import { Clock, Heart } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function parseTargetTimestamp(target: string): number {
  if (!target) return 0;
  // Parse chuẩn xác YYYY-MM-DDTHH:mm:ss bất kể trình duyệt (Safari, iOS, Android, Desktop)
  const match = target.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2}))?/);
  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // 0-based
    const day = parseInt(match[3], 10);
    const hour = parseInt(match[4] || "0", 10);
    const min = parseInt(match[5] || "0", 10);
    const sec = parseInt(match[6] || "0", 10);

    // Múi giờ Việt Nam GMT+7 -> Giờ UTC là hour - 7
    return Date.UTC(year, month, day, hour - 7, min, sec);
  }
  const parsed = new Date(target).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const targetMs = parseTargetTimestamp(targetIso);
  const now = Date.now();
  const diff = targetMs - now;

  if (targetMs === 0 || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

function padTwo(value: number) {
  return String(value).padStart(2, "0");
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => {
      setTimeLeft(calculateTimeLeft(WEDDING_CONFIG.countdownTargetISO));
    };

    update();
    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const units = [
    { label: "Ngày", value: timeLeft ? padTwo(timeLeft.days) : "--" },
    { label: "Giờ", value: timeLeft ? padTwo(timeLeft.hours) : "--" },
    { label: "Phút", value: timeLeft ? padTwo(timeLeft.minutes) : "--" },
    { label: "Giây", value: timeLeft ? padTwo(timeLeft.seconds) : "--" },
  ];

  return (
    <section
      id="countdown"
      className="relative bg-gradient-to-b from-[#FDFBF7] via-[#FCEEF0]/45 to-[#FDFBF7] px-4 py-14 sm:px-6 md:py-20"
    >
      <div className="mx-auto max-w-4xl rounded-[28px] border border-[#C69C6D]/40 bg-white p-2 shadow-[0_22px_55px_-26px_rgba(159,58,75,0.2)] sm:p-3">
        <div className="rounded-[22px] border border-[#F0E1D4] bg-gradient-to-b from-[#FFFDF9] to-white px-5 py-10 text-center sm:px-10 sm:py-13">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-[#B88B58] uppercase">
            <Clock className="h-4 w-4 text-[#C69C6D]" />
            <span>Cùng Đếm Ngược</span>
          </div>

          <h2 className="mt-2 font-script text-4xl font-bold text-[#9F3A4B] sm:text-5xl">
            Ngày Chung Đôi
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm text-[#6E5459] sm:text-base">
            Từng khoảnh khắc trôi qua là thêm một bước gần hơn đến ngày{" "}
            <strong className="font-semibold text-[#9F3A4B]">
              20/12/2026
            </strong>{" "}
            của {WEDDING_CONFIG.groom.name} &amp; {WEDDING_CONFIG.bride.name}.
          </p>

          {/* 4 Luxury Countdown Tiles */}
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-4 gap-2.5 sm:gap-5">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center rounded-2xl border border-[#EBD8C3] bg-gradient-to-b from-[#FFFDFB] to-[#FCEEF0]/55 px-2 py-4 shadow-sm sm:px-4 sm:py-6"
              >
                <span className="font-serif text-3xl font-bold tabular-nums text-[#9F3A4B] sm:text-5xl">
                  {unit.value}
                </span>
                <span className="mt-1.5 text-[11px] font-semibold tracking-[0.18em] text-[#9C6E3B] uppercase sm:text-xs">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {timeLeft?.isPast && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#EBD8C3] bg-[#FFF8F9] px-5 py-2 text-sm font-medium text-[#9F3A4B]">
              <Heart className="h-4 w-4 fill-[#9F3A4B]" />
              <span>
                Ngày trọng đại đã diễn ra trọn vẹn! Cảm ơn tình yêu thương của
                quý khách.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
