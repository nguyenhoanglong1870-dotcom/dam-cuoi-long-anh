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
  const match = target.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2}))?/
  );
  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);
    const hour = parseInt(match[4] || "0", 10);
    const min = parseInt(match[5] || "0", 10);
    const sec = parseInt(match[6] || "0", 10);
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
    <section id="countdown" className="relative px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-sm rounded-[28px] border border-[#C69C6D]/35 bg-white/95 p-5 text-center shadow-[0_18px_45px_-20px_rgba(35,61,49,0.2)] sm:p-7">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.24em] text-[#B88B58] uppercase">
          <Clock className="h-3.5 w-3.5 text-[#C69C6D]" />
          <span>Cùng Đếm Ngược</span>
        </div>

        {/* Heading: We Got Married (Phong cách NgayChungDoi) */}
        <h2 className="mt-1 font-script text-4xl font-bold text-[#233D31] sm:text-5xl">
          We got married
        </h2>

        <p className="mt-2 text-xs leading-relaxed text-[#6E5459]">
          Từng khoảnh khắc trôi qua là thêm một bước gần hơn đến ngày{" "}
          <strong className="font-semibold text-[#233D31]">20/12/2026</strong>{" "}
          của {WEDDING_CONFIG.groom.name} &amp; {WEDDING_CONFIG.bride.name}.
        </p>

        {/* 4 Forest Green Countdown Tiles (Chuẩn NgayChungDoi) */}
        <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-2.5">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center justify-center rounded-2xl bg-[#233D31] py-3.5 px-1 text-white shadow-md shadow-[#233D31]/25"
            >
              <span className="font-serif text-2xl font-bold tabular-nums text-white sm:text-3xl">
                {unit.value}
              </span>
              <span className="mt-1 text-[10px] font-medium tracking-wider text-[#E5C992] uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {timeLeft?.isPast && (
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#EBD8C3] bg-[#FFF8F9] px-4 py-1.5 text-xs font-medium text-[#9F3A4B]">
            <Heart className="h-3.5 w-3.5 fill-[#9F3A4B]" />
            <span>
              Ngày trọng đại đã diễn ra trọn vẹn! Cảm ơn tình cảm của quý khách.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
