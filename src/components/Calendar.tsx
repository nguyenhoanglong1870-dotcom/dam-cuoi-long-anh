import { CalendarHeart, Heart, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function WeddingCalendar() {
  const emptyDaysBefore = 1; // 1/12/2026 là Thứ Ba -> 1 ô trống (T2=0, T3=1)
  const daysInMonth = 31;
  const weddingDay = 20;

  const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <section id="calendar" className="relative px-4 py-10 sm:px-6">
      <ScrollReveal delay={150} direction="up">
        <div className="mx-auto max-w-sm rounded-[28px] border border-[#DFCBB5]/80 bg-white/95 p-5 text-center shadow-[0_16px_40px_-20px_rgba(40,65,50,0.12)] sm:p-7">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.24em] text-[#A67C43] uppercase">
            <Sparkles className="h-3 w-3 text-[#C5A059]" />
            <span>Save The Date</span>
            <Sparkles className="h-3 w-3 text-[#C5A059]" />
          </div>

          <h3 className="mt-1.5 font-serif text-2xl font-bold tracking-wide text-[#23372B]">
            Tháng 12 · 2026
          </h3>
          <p className="mt-0.5 text-[11px] text-[#697E72]">
            (Tức Tháng 11 năm Bính Ngọ)
          </p>

          {/* 7-column Calendar Grid */}
          <div className="mt-5">
            <div className="grid grid-cols-7 gap-1 text-[11px] font-semibold tracking-wider text-[#8A9E92] pb-2 border-b border-[#F0EAE1]">
              {weekdays.map((wd) => (
                <span key={wd} className={wd === "CN" ? "text-[#A34857] font-bold" : ""}>
                  {wd}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2 gap-x-1 pt-3 text-xs sm:text-sm">
              {/* Empty slots before day 1 */}
              {Array.from({ length: emptyDaysBefore }).map((_, i) => (
                <span key={`empty-${i}`} className="h-8 w-8" />
              ))}

              {/* Days 1 to 31 */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isWedding = day === weddingDay;
                return (
                  <div
                    key={`day-${day}`}
                    className="relative flex items-center justify-center"
                  >
                    {isWedding ? (
                      <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#2C4134] text-white font-bold shadow-md shadow-[#2C4134]/30 ring-2 ring-[#DFCBB5]">
                        <Heart className="absolute -top-1 -right-1 h-3 w-3 fill-[#C5A059] text-[#C5A059]" />
                        <span>{day}</span>
                      </div>
                    ) : (
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-[#455A4D] ${
                          (day + emptyDaysBefore - 1) % 7 === 6
                            ? "text-[#A34857] font-medium"
                            : ""
                        }`}
                      >
                        {day}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Highlight Footer Note */}
          <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-[#DCE8E0] bg-[#F4F8F5] px-4 py-2 text-xs font-medium text-[#2C4134]">
            <CalendarHeart className="h-4 w-4 shrink-0 text-[#C5A059]" />
            <span>
              Ngày cưới: <strong>Chủ Nhật, 20/12/2026</strong>
            </span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
