"use client";

import { useEffect, useState } from "react";
import { Clock, Heart } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";
import ScrollReveal from "./ScrollReveal";

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
    <section id="countdown" className="relative px-4 py-10 sm:px-6">
      <ScrollReveal delay={150} direction="up">
        <div className="mx-auto max-w-sm rounded-[28px] border border-[#DFCBB5]/80 bg-white/95 p-5 text-center shadow-[0_16px_40px_-20px_rgba(40,65,50,0.12)] sm:p-7">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.24em] text-[#A67C43] uppercase">
            <Clock className="h-3 w-3 text-[#C5A059]" />
            <span>Cùng Đếm Ngược</span>
          </div>

          <h2 className="mt-1 font-script text-3xl font-bold text-[#2C4134] sm:text-4xl">
            We got married
          </h2>

          <p className="mt-1.5 text-xs leading-relaxed text-[#556D60]">
            Từng khoảnh khắc trôi qua là thêm một bước gần hơn đến ngày{" "}
            <strong className="font-semibold text-[#23372B]">20/12/2026</strong>{" "}
            của {WEDDING_CONFIG.groom.name} &amp; {WEDDING_CONFIG.bride.name}.
          </p>

          {/* 4 Forest Green Countdown Tiles */}
          <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-2.5">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center rounded-2xl bg-[#2C4134] py-3 px-1 text-white shadow-md shadow-[#2C4134]/20"
              >
                <span className="font-serif text-2xl font-bold tabular-nums text-white sm:text-3xl">
                  {unit.value}
                </span>
                <span className="mt-0.5 text-[9px] font-medium tracking-wider text-[#DFCBB5] uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {timeLeft?.isPast && (
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#DFCBB5] bg-[#FAF8F5] px-3.5 py-1 text-xs font-medium text-[#2C4134]">
              <Heart className="h-3 w-3 fill-[#A34857] text-[#A34857]" />
              <span>Ngày trọng đại đã diễn ra trọn vẹn!</span>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
