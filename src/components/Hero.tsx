import Image from "next/image";
import { CalendarHeart, ChevronDown, Heart, Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";
import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#F2F7F4] via-[#FCFBF8] to-[#FCFBF8] px-4 pt-10 pb-12 sm:px-6"
    >
      {/* Soft luxury ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[#E3EDE7]/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-4 h-72 w-72 rounded-full bg-[#F5ECE1]/40 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-sm flex-col items-center text-center">
        {/* We Got Married Calligraphy */}
        <ScrollReveal delay={100} direction="down">
          <p className="font-script text-3xl font-medium tracking-wide text-[#385343] sm:text-4xl">
            We got married
          </p>
          <div className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.26em] text-[#A67C43] uppercase">
            <Sparkles className="h-2.5 w-2.5 text-[#C5A059]" />
            <span>Save The Date</span>
            <Sparkles className="h-2.5 w-2.5 text-[#C5A059]" />
          </div>
        </ScrollReveal>

        {/* Groom & Bride Names in Luxury Typography */}
        <ScrollReveal delay={200} direction="up">
          <h1 className="mt-3 font-serif text-3xl font-normal tracking-wide text-[#23372B] sm:text-4xl">
            {WEDDING_CONFIG.groom.name}
            <span className="mx-2 font-script text-2xl text-[#C5A059]">&amp;</span>
            {WEDDING_CONFIG.bride.name}
          </h1>

          <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.16em] text-[#556D60]">
            <CalendarHeart className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>{WEDDING_CONFIG.dateDisplay}</span>
          </div>
        </ScrollReveal>

        {/* Arch-Framed Chibi Illustration (Vòm Cung Cổ Điển Tinh Tế) */}
        <ScrollReveal delay={300} direction="fade" className="w-full flex justify-center">
          <div className="relative mt-5 mb-5 w-full max-w-[270px]">
            {/* Outer gold hairline border */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 rounded-t-[130px] rounded-b-[24px] border border-[#DFCBB5]/70"
            />

            <div className="relative aspect-[3/3.8] w-full overflow-hidden rounded-t-[125px] rounded-b-[20px] border-4 border-white bg-gradient-to-b from-[#FFFDF9] to-[#F5ECE1] p-1.5 shadow-[0_18px_45px_-15px_rgba(40,65,50,0.2)] ring-1 ring-[#DFCBB5]/50">
              <div className="relative h-full w-full overflow-hidden rounded-t-[120px] rounded-b-[16px] bg-[#FAF8F5]">
                <Image
                  src={WEDDING_CONFIG.heroChibiImage}
                  alt={`Ảnh cưới Chibi ${WEDDING_CONFIG.groom.name} & ${WEDDING_CONFIG.bride.name}`}
                  fill
                  priority
                  sizes="270px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Floating Gold Date Badge */}
            <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#DFCBB5] bg-white px-4 py-1 shadow-sm">
              <Heart className="h-3 w-3 fill-[#A34857] text-[#A34857]" />
              <span className="font-serif text-[11px] font-semibold tracking-[0.16em] text-[#2C4134]">
                20 . 12 . 2026
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Romantic Quote Banner */}
        <ScrollReveal delay={400} direction="up">
          <div className="mt-3 rounded-2xl border border-[#EADBCE]/80 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-sm">
            <p className="font-serif text-xs italic leading-relaxed text-[#4A6153] sm:text-sm">
              &ldquo;Em là bình yên anh muốn giữ · Anh là hạnh phúc em muốn trao.&rdquo;
            </p>
          </div>

          {/* Event Schedule Text */}
          <div className="mt-3 space-y-0.5">
            <p className="font-serif text-sm font-bold text-[#23372B]">
              {WEDDING_CONFIG.dateFullText}
            </p>
            <p className="text-[11px] text-[#697E72]">
              ({WEDDING_CONFIG.lunarDateText})
            </p>
            <p className="pt-0.5 text-xs text-[#526B5D]">
              Sân Chơi Thôn Nhuế, Kim Chung, Xã Thiên Lộc, Đông Anh, Hà Nội
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
            <a
              href="#rsvp"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#2C4134] px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#2C4134]/25 transition hover:bg-[#1E2E25] active:scale-[0.98] sm:w-auto"
            >
              <Heart className="h-3.5 w-3.5 text-[#DFCBB5]" />
              <span>Xác nhận tham dự</span>
            </a>
            <a
              href="#events"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#DFCBB5] bg-white px-6 py-2.5 text-xs font-semibold text-[#2C4134] shadow-sm transition hover:bg-[#F4F8F5] active:scale-[0.98] sm:w-auto"
            >
              <span>Thời gian &amp; Địa điểm</span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <a
            href="#calendar"
            aria-label="Cuộn xuống xem thiệp"
            className="mt-6 inline-flex flex-col items-center gap-1 text-[10px] tracking-widest text-[#7A9184] uppercase transition hover:text-[#2C4134]"
          >
            <span>Khám phá thiệp</span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
