import Image from "next/image";
import { CalendarHeart, ChevronDown, Heart, Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";
import FloatingPetals from "./FloatingPetals";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAF4EC] via-[#FDFBF7] to-[#FDFBF7] px-4 pt-14 pb-12 sm:px-6"
    >
      {/* Luxury ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#E8D4BE]/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-8 h-80 w-80 rounded-full bg-[#FCEEF0]/40 blur-3xl"
      />

      {/* Floating Petals */}
      <FloatingPetals />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center text-center">
        {/* Luxury Tagline */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C69C6D]/45 bg-white/90 px-4 py-1 text-[11px] font-semibold tracking-[0.24em] text-[#9C6E3B] uppercase shadow-sm backdrop-blur-sm">
          <Sparkles className="h-3 w-3 text-[#C69C6D]" />
          <span>Save The Date</span>
          <Sparkles className="h-3 w-3 text-[#C69C6D]" />
        </div>

        <p className="font-serif text-xs tracking-[0.22em] text-[#7A5B61] uppercase sm:text-sm">
          Lễ Thành Hôn
        </p>

        {/* Groom & Bride Names in handwriting calligraphy */}
        <h1 className="mt-3 font-script text-5xl font-bold tracking-wide text-[#9F3A4B] drop-shadow-sm sm:text-6xl">
          {WEDDING_CONFIG.groom.name} &amp; {WEDDING_CONFIG.bride.name}
        </h1>

        <div className="mt-2.5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#5A343B]">
          <CalendarHeart className="h-4 w-4 text-[#C69C6D]" />
          <span>{WEDDING_CONFIG.dateDisplay}</span>
        </div>

        {/* Arch-Framed Chibi Illustration (Phong cách Vòm Cung NgayChungDoi) */}
        <div className="relative mt-6 mb-6 w-full max-w-[280px] sm:max-w-[310px]">
          {/* Outer gold hairline border */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 rounded-t-[140px] rounded-b-[28px] border border-dashed border-[#C69C6D]/60"
          />

          <div className="relative aspect-[3/3.8] w-full overflow-hidden rounded-t-[130px] rounded-b-[24px] border-4 border-white bg-gradient-to-b from-[#FFFDF9] to-[#FCEEF0] p-1.5 shadow-[0_20px_50px_-15px_rgba(35,61,49,0.25)] ring-1 ring-[#C69C6D]/40">
            <div className="relative h-full w-full overflow-hidden rounded-t-[125px] rounded-b-[20px] bg-[#FDFBF7]">
              <Image
                src={WEDDING_CONFIG.heroChibiImage}
                alt={`Ảnh cưới Chibi ${WEDDING_CONFIG.groom.name} & ${WEDDING_CONFIG.bride.name}`}
                fill
                priority
                sizes="(max-width: 640px) 280px, 310px"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Floating Gold Date Badge */}
          <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#C69C6D]/60 bg-white px-4 py-1 shadow-md">
            <Heart className="h-3 w-3 fill-[#9F3A4B] text-[#9F3A4B]" />
            <span className="font-serif text-xs font-bold tracking-[0.16em] text-[#233D31]">
              WE ARE MARRIED
            </span>
          </div>
        </div>

        {/* Romantic Quote Banner (Phong cách NgayChungDoi) */}
        <div className="mt-2 rounded-2xl border border-[#F0E1D4] bg-[#FFFDF9]/90 px-4 py-3 shadow-sm">
          <p className="font-serif text-sm italic leading-relaxed text-[#5A3E44] sm:text-base">
            &ldquo;Em là bình yên anh muốn giữ · Anh là hạnh phúc em muốn
            trao.&rdquo;
          </p>
        </div>

        {/* Event Schedule Text */}
        <div className="mt-4 space-y-1">
          <p className="font-serif text-base font-bold text-[#233D31]">
            {WEDDING_CONFIG.dateFullText}
          </p>
          <p className="text-xs text-[#7A5B61]">
            ({WEDDING_CONFIG.lunarDateText})
          </p>
          <p className="pt-1 text-xs text-[#6E5459]">
            Tại: Sân Chơi Thôn Nhuế, Kim Chung, Xã Thiên Lộc, Đông Anh, Hà Nội
          </p>
        </div>

        {/* Mobile-first Action Buttons */}
        <div className="mt-6 flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
          <a
            href="#rsvp"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#233D31] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#233D31]/25 transition hover:bg-[#1A2E25] active:scale-[0.98] sm:w-auto"
          >
            <Heart className="h-4 w-4 text-[#F2B8C4]" />
            <span>Xác nhận tham dự</span>
          </a>
          <a
            href="#events"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#C69C6D]/60 bg-white/95 px-6 py-2.5 text-sm font-semibold text-[#233D31] shadow-sm transition hover:bg-[#FCEEF0]/60 active:scale-[0.98] sm:w-auto"
          >
            <span>Thời gian &amp; Địa điểm</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#calendar"
          aria-label="Cuộn xuống xem thiệp"
          className="mt-8 inline-flex flex-col items-center gap-1 text-[11px] tracking-widest text-[#9C767D] uppercase transition hover:text-[#9F3A4B]"
        >
          <span>Khám phá thiệp</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
