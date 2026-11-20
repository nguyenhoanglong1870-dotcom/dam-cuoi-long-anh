import Image from "next/image";
import { CalendarHeart, ChevronDown, Heart, Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";
import FloatingPetals from "./FloatingPetals";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FBF1F3] via-[#FDFBF7] to-[#FDFBF7] px-4 py-14 sm:px-6 md:py-20"
    >
      {/* Luxury ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#F3C8D1]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-8 h-80 w-80 rounded-full bg-[#E6C9A2]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 left-0 h-72 w-72 rounded-full bg-[#F7DCE2]/30 blur-3xl"
      />

      {/* CSS Petals & Floating Hearts Animation */}
      <FloatingPetals />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {/* Luxury Save The Date Pill */}
        <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#C69C6D]/50 bg-white/85 px-5 py-1.5 text-xs font-semibold tracking-[0.26em] text-[#8C4A56] uppercase shadow-sm backdrop-blur-sm sm:text-sm">
          <Sparkles className="h-3.5 w-3.5 text-[#C69C6D]" />
          <span>Save The Date</span>
          <Sparkles className="h-3.5 w-3.5 text-[#C69C6D]" />
        </div>

        <p className="font-serif text-sm tracking-[0.22em] text-[#7A5B61] uppercase sm:text-base">
          Trân trọng kính mời đến dự lễ thành hôn của
        </p>

        {/* Groom & Bride Names in Handwriting Google Font */}
        <h1 className="mt-4 flex flex-col items-center justify-center gap-1 sm:mt-5 sm:flex-row sm:gap-5">
          <span className="font-script text-5xl font-bold tracking-wide text-[#9F3A4B] drop-shadow-sm sm:text-6xl md:text-7xl">
            {WEDDING_CONFIG.groom.name}
          </span>
          <span className="font-script text-3xl text-[#C69C6D] sm:text-5xl">
            &amp;
          </span>
          <span className="font-script text-5xl font-bold tracking-wide text-[#9F3A4B] drop-shadow-sm sm:text-6xl md:text-7xl">
            {WEDDING_CONFIG.bride.name}
          </span>
        </h1>

        {/* Fine gold horizontal ornament */}
        <div
          aria-hidden="true"
          className="mt-4 flex items-center justify-center gap-3"
        >
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#C69C6D]/75" />
          <Heart className="h-3.5 w-3.5 fill-[#C69C6D]/80 text-[#C69C6D]" />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#C69C6D]/75" />
        </div>

        {/* Luxury Framed Chibi Portrait */}
        <div className="relative mt-7 mb-8 w-full max-w-[300px] sm:mt-8 sm:max-w-[355px]">
          {/* Outer champagne-gold filigree halo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2.5 rounded-full border border-dashed border-[#C69C6D]/55"
          />

          <div className="relative aspect-square w-full overflow-hidden rounded-full border-[5px] border-white bg-[#FDF6F7] p-1.5 shadow-[0_24px_60px_-16px_rgba(159,58,75,0.3)] ring-1 ring-[#C69C6D]/60">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-[#FDFBF7]">
              <Image
                src={WEDDING_CONFIG.heroChibiImage}
                alt={`Ảnh Chibi cưới ${WEDDING_CONFIG.groom.name} và ${WEDDING_CONFIG.bride.name}`}
                fill
                priority
                sizes="(max-width: 640px) 300px, 355px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Floating Gold Date Medallion */}
          <div className="absolute -bottom-3.5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#C69C6D]/60 bg-white px-5 py-1.5 shadow-md">
            <Heart className="h-3.5 w-3.5 fill-[#9F3A4B] text-[#9F3A4B]" />
            <span className="font-serif text-sm font-bold tracking-[0.2em] text-[#5A343B]">
              {WEDDING_CONFIG.dateDisplay}
            </span>
          </div>
        </div>

        {/* Date Details */}
        <div className="mt-2 space-y-1.5">
          <div className="inline-flex items-center gap-2 text-[#9F3A4B]">
            <CalendarHeart className="h-5 w-5 text-[#C69C6D]" />
            <p className="font-serif text-xl font-semibold tracking-wider sm:text-2xl">
              {WEDDING_CONFIG.dateFullText}
            </p>
          </div>
          <p className="text-sm text-[#7A5B61] sm:text-base">
            ({WEDDING_CONFIG.lunarDateText})
          </p>
          <p className="mx-auto max-w-md pt-2 text-sm leading-relaxed text-[#5E494D] sm:text-base">
            Sự hiện diện và lời chúc phúc của quý vị là niềm vinh hạnh lớn lao
            của hai gia đình trong ngày vui trọng đại.
          </p>
        </div>

        {/* Mobile-first Large Action Buttons */}
        <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-md sm:flex-row sm:justify-center">
          <a
            href="#rsvp"
            className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#9F3A4B] px-7 py-3 text-base font-medium text-white shadow-lg shadow-[#9F3A4B]/25 transition hover:bg-[#872E3E] active:scale-[0.98] sm:w-auto"
          >
            <Heart className="h-4 w-4" />
            <span>Xác Nhận Tham Dự</span>
          </a>
          <a
            href="#events"
            className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full border border-[#C69C6D]/65 bg-white/90 px-7 py-3 text-base font-medium text-[#7A3542] shadow-sm transition hover:bg-[#FCEEF0]/70 active:scale-[0.98] sm:w-auto"
          >
            <span>Địa Điểm &amp; Lịch Trình</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#families"
          aria-label="Cuộn xuống xem thiệp báo hỷ"
          className="mt-10 inline-flex flex-col items-center gap-1 text-xs tracking-[0.2em] text-[#9C767D] uppercase transition hover:text-[#9F3A4B]"
        >
          <span>Mở Thiệp</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
