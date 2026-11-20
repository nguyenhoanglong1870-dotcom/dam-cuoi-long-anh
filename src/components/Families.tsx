import { Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";
import ScrollReveal from "./ScrollReveal";

export default function Families() {
  const { groom, bride } = WEDDING_CONFIG;

  return (
    <section id="families" className="relative px-4 py-10 sm:px-6">
      <ScrollReveal delay={150} direction="up">
        <div className="mx-auto max-w-sm rounded-[28px] border border-[#DFCBB5]/80 bg-white p-2 shadow-[0_18px_45px_-20px_rgba(40,65,50,0.12)] sm:p-3">
          <div className="relative rounded-[22px] border border-[#EADBCE]/80 bg-gradient-to-b from-[#FFFDFB] via-white to-[#F9FAF8] px-4 py-8 text-center sm:px-6 sm:py-10">
            {/* Corner gold diamond ornaments */}
            <span
              aria-hidden="true"
              className="absolute top-3 left-3 h-2 w-2 rotate-45 border border-[#C5A059]/70"
            />
            <span
              aria-hidden="true"
              className="absolute top-3 right-3 h-2 w-2 rotate-45 border border-[#C5A059]/70"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-3 h-2 w-2 rotate-45 border border-[#C5A059]/70"
            />
            <span
              aria-hidden="true"
              className="absolute right-3 bottom-3 h-2 w-2 rotate-45 border border-[#C5A059]/70"
            />

            {/* Monogram Crest */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#DFCBB5] bg-[#F7FAF8] shadow-inner">
              <span className="font-serif text-base font-semibold tracking-wider text-[#2C4134]">
                L&amp;A
              </span>
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.24em] text-[#A67C43] uppercase">
              <Sparkles className="h-3 w-3 text-[#C5A059]" />
              <span>Trân Trọng Báo Tin</span>
              <Sparkles className="h-3 w-3 text-[#C5A059]" />
            </div>

            <h2 className="mt-1 font-serif text-xl font-bold tracking-[0.1em] text-[#23372B] uppercase sm:text-2xl">
              Lễ Thành Hôn
            </h2>

            {/* Two Families Grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-y border-[#F0EAE1] py-6 divide-x divide-[#F0EAE1]">
              {/* Nhà Trai */}
              <div className="flex flex-col items-center justify-center px-2">
                <span className="rounded-full border border-[#DFCBB5] bg-[#FAF8F5] px-3 py-0.5 text-[10px] font-semibold tracking-[0.18em] text-[#A67C43] uppercase">
                  Nhà Trai
                </span>
                <div className="mt-3 space-y-0.5 text-xs text-[#455A4D]">
                  {groom.father && (
                    <p className="font-semibold text-[#23372B]">{groom.father}</p>
                  )}
                  {groom.mother && (
                    <p className="font-semibold text-[#23372B]">{groom.mother}</p>
                  )}
                  <p className="pt-0.5 text-[11px] text-[#718579]">{groom.hometown}</p>
                </div>
              </div>

              {/* Nhà Gái */}
              <div className="flex flex-col items-center justify-center px-2">
                <span className="rounded-full border border-[#DFCBB5] bg-[#FAF8F5] px-3 py-0.5 text-[10px] font-semibold tracking-[0.18em] text-[#A67C43] uppercase">
                  Nhà Gái
                </span>
                <div className="mt-3 space-y-0.5 text-xs text-[#455A4D]">
                  {bride.father && (
                    <p className="font-semibold text-[#23372B]">{bride.father}</p>
                  )}
                  {bride.mother && (
                    <p className="font-semibold text-[#23372B]">{bride.mother}</p>
                  )}
                  <p className="pt-0.5 text-[11px] text-[#718579]">{bride.hometown}</p>
                </div>
              </div>
            </div>

            {/* Formal Couple Announcement */}
            <p className="mt-5 text-[11px] tracking-[0.18em] text-[#718579] uppercase">
              Thành hôn của hai con chúng tôi
            </p>

            <div className="mt-3 flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-4">
              <div>
                <p className="text-[10px] font-medium tracking-[0.18em] text-[#A67C43] uppercase">
                  {groom.position}
                </p>
                <p className="font-serif text-2xl font-bold text-[#2C4134]">
                  {groom.fullName}
                </p>
              </div>

              <span className="font-serif text-xl text-[#C5A059] italic">&amp;</span>

              <div>
                <p className="text-[10px] font-medium tracking-[0.18em] text-[#A67C43] uppercase">
                  {bride.position}
                </p>
                <p className="font-serif text-2xl font-bold text-[#2C4134]">
                  {bride.fullName}
                </p>
              </div>
            </div>

            <p className="mx-auto mt-5 max-w-xs font-serif text-xs leading-relaxed text-[#556D60] italic">
              &ldquo;Hôn nhân không phải là đích đến, mà là khởi đầu cho hành trình nắm tay nhau đi qua mọi mùa yêu thương.&rdquo;
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
