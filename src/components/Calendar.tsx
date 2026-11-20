import { CalendarHeart, Heart, Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";

export default function WeddingCalendar() {
  // Tháng 12/2026: ngày 1 là Thứ Ba.
  // Tuần bắt đầu từ Thứ Hai (T2=0, T3=1, T4=2, T5=3, T6=4, T7=5, CN=6)
  // Ngày 1/12 rơi vào T3 -> 1 ô trống ở đầu.
  // Tổng cộng 31 ngày trong tháng 12. Ngày 20/12 rơi vào Chủ Nhật.
  const emptyDaysBefore = 1;
  const daysInMonth = 31;
  const weddingDay = 20;

  const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <section id="calendar" className="relative px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-sm rounded-[28px] border border-[#C69C6D]/40 bg-white/95 p-5 shadow-[0_18px_45px_-22px_rgba(159,58,75,0.2)] text-center sm:p-7">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.24em] text-[#B88B58] uppercase">
          <Sparkles className="h-3.5 w-3.5 text-[#C69C6D]" />
          <span>Save The Date</span>
          <Sparkles className="h-3.5 w-3.5 text-[#C69C6D]" />
        </div>

        <h3 className="mt-2 font-serif text-2xl font-bold tracking-wide text-[#352629]">
          Tháng 12 · 2026
        </h3>
        <p className="mt-1 text-xs text-[#7A5B61]">
          (Tức Tháng 11 năm Bính Ngọ)
        </p>

        {/* 7-column Calendar Grid */}
        <div className="mt-6">
          <div className="grid grid-cols-7 gap-1 text-[11px] font-semibold tracking-wider text-[#A08288] pb-2 border-b border-[#F0E1D4]">
            {weekdays.map((wd) => (
              <span key={wd} className={wd === "CN" ? "text-[#9F3A4B]" : ""}>
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
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#9F3A4B] text-white font-bold shadow-md shadow-[#9F3A4B]/35">
                      <Heart className="absolute -top-1 -right-1 h-3.5 w-3.5 fill-[#C69C6D] text-[#C69C6D]" />
                      <span>{day}</span>
                    </div>
                  ) : (
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[#4D3B3F] ${
                        (day + emptyDaysBefore - 1) % 7 === 6
                          ? "text-[#8C4A56] font-medium"
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
        <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-[#F0D9DE] bg-[#FFF8F9] px-4 py-2 text-xs font-medium text-[#9F3A4B]">
          <CalendarHeart className="h-4 w-4 shrink-0 text-[#C69C6D]" />
          <span>
            Ngày cưới: <strong>Chủ Nhật, 20/12/2026</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
