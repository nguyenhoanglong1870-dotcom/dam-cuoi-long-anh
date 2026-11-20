import {
  Camera,
  Clock,
  Flame,
  Gem,
  Sparkles,
  Wine,
} from "lucide-react";
import { WEDDING_CONFIG, type TimelineItem } from "@/config/wedding";

function TimelineIcon({ type }: { type: TimelineItem["icon"] }) {
  switch (type) {
    case "incense":
      return <Flame className="h-5 w-5" />;
    case "welcome":
      return <Camera className="h-5 w-5" />;
    case "rings":
      return <Gem className="h-5 w-5" />;
    case "toast":
      return <Wine className="h-5 w-5" />;
  }
}

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative px-4 py-16 sm:px-6 md:py-22"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-[#B88B58] uppercase">
            <Clock className="h-4 w-4 text-[#C69C6D]" />
            <span>Wedding Schedule</span>
          </div>
          <h2 className="mt-2 font-script text-4xl font-bold text-[#9F3A4B] sm:text-5xl">
            Lịch Trình Ngày Cưới
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6E5459] sm:text-base">
            Các khung giờ chính trong ngày trọng đại{" "}
            <strong className="font-semibold text-[#9F3A4B]">
              20/12/2026
            </strong>{" "}
            để quý khách tiện sắp xếp thời gian chung vui.
          </p>
        </div>

        {/* Luxury Vertical Timeline */}
        <div className="relative mt-12">
          {/* Vertical Champagne Gold Line */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-6 w-px bg-gradient-to-b from-transparent via-[#C69C6D]/60 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-6 md:space-y-8">
            {WEDDING_CONFIG.timeline.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <li
                  key={item.id}
                  className="relative flex items-start gap-4 md:grid md:grid-cols-2 md:gap-10"
                >
                  {/* Milestone Medallion */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#C69C6D] bg-white text-[#9F3A4B] shadow-md shadow-[#C69C6D]/20 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    <TimelineIcon type={item.icon} />
                  </div>

                  {/* Card Container */}
                  <div
                    className={`flex-1 ${
                      isLeft
                        ? "md:col-start-1 md:pr-8 md:text-right"
                        : "md:col-start-2 md:pl-8 md:text-left"
                    }`}
                  >
                    <div className="rounded-3xl border border-[#C69C6D]/30 bg-white/95 p-5 shadow-[0_14px_36px_-20px_rgba(159,58,75,0.2)] transition hover:border-[#C69C6D]/60 sm:p-6">
                      <div
                        className={`inline-flex items-center gap-1.5 rounded-full bg-[#FDF6EE] px-3.5 py-1 text-xs font-bold tracking-[0.18em] text-[#9F3A4B] ring-1 ring-[#C69C6D]/35`}
                      >
                        <Sparkles className="h-3 w-3 text-[#C69C6D]" />
                        <span>{item.time}</span>
                      </div>
                      <h3 className="mt-3 font-serif text-2xl font-bold text-[#352629]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#6E5459]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
