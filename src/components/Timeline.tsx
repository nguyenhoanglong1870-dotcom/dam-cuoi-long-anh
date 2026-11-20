import { Camera, Clock, Flame, Gem, Sparkles, Wine } from "lucide-react";
import { WEDDING_CONFIG, type TimelineItem } from "@/config/wedding";
import ScrollReveal from "./ScrollReveal";

function TimelineIcon({ type }: { type: TimelineItem["icon"] }) {
  switch (type) {
    case "incense":
      return <Flame className="h-4 w-4" />;
    case "welcome":
      return <Camera className="h-4 w-4" />;
    case "rings":
      return <Gem className="h-4 w-4" />;
    case "toast":
      return <Wine className="h-4 w-4" />;
  }
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-sm">
        {/* Header */}
        <ScrollReveal delay={100} direction="up">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.24em] text-[#A67C43] uppercase">
              <Clock className="h-3 w-3 text-[#C5A059]" />
              <span>Wedding Schedule</span>
            </div>
            <h2 className="mt-1 font-script text-3xl font-bold text-[#2C4134] sm:text-4xl">
              Lịch Trình Ngày Cưới
            </h2>
            <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-[#556D60]">
              Khung giờ chính trong ngày trọng đại{" "}
              <strong className="font-semibold text-[#23372B]">20/12/2026</strong>.
            </p>
          </div>
        </ScrollReveal>

        {/* Luxury Vertical Timeline */}
        <div className="relative mt-8">
          {/* Vertical Champagne Gold Line */}
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-6 w-px bg-gradient-to-b from-transparent via-[#DFCBB5] to-transparent"
          />

          <ol className="space-y-4">
            {WEDDING_CONFIG.timeline.map((item, idx) => (
              <li key={item.id}>
                <ScrollReveal delay={idx * 120} direction="up">
                  <div className="relative flex items-start gap-3.5">
                    {/* Milestone Medallion */}
                    <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#DFCBB5] bg-white text-[#2C4134] shadow-sm">
                      <TimelineIcon type={item.icon} />
                    </div>

                    {/* Card Container */}
                    <div className="flex-1 rounded-2xl border border-[#DFCBB5]/70 bg-white/95 p-4 shadow-sm">
                      <div className="inline-flex items-center gap-1 rounded-full bg-[#F4F8F5] px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#2C4134] ring-1 ring-[#D8E6DE]">
                        <Sparkles className="h-2.5 w-2.5 text-[#C5A059]" />
                        <span>{item.time}</span>
                      </div>
                      <h3 className="mt-1.5 font-serif text-lg font-bold text-[#23372B]">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#556D60]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
