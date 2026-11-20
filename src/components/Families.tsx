import { Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";

export default function Families() {
  const { groom, bride } = WEDDING_CONFIG;

  return (
    <section id="families" className="relative px-4 py-16 sm:px-6 md:py-22">
      <div className="mx-auto max-w-4xl">
        {/* Luxury Double-Border Invitation Card */}
        <div className="relative rounded-[28px] border border-[#C69C6D]/45 bg-white p-2.5 shadow-[0_24px_60px_-28px_rgba(125,52,66,0.22)] sm:p-4">
          <div className="relative rounded-[22px] border border-[#EBD8C3]/80 bg-gradient-to-b from-[#FFFDF9] via-white to-[#FFF9FA] px-5 py-10 text-center sm:px-10 sm:py-14">
            {/* Corner gold diamond ornaments */}
            <span
              aria-hidden="true"
              className="absolute top-3.5 left-3.5 h-2.5 w-2.5 rotate-45 border border-[#C69C6D]/70"
            />
            <span
              aria-hidden="true"
              className="absolute top-3.5 right-3.5 h-2.5 w-2.5 rotate-45 border border-[#C69C6D]/70"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3.5 left-3.5 h-2.5 w-2.5 rotate-45 border border-[#C69C6D]/70"
            />
            <span
              aria-hidden="true"
              className="absolute right-3.5 bottom-3.5 h-2.5 w-2.5 rotate-45 border border-[#C69C6D]/70"
            />

            {/* Monogram Crest */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C69C6D]/60 bg-[#FDF7F2] shadow-inner">
              <span className="font-serif text-lg font-semibold tracking-wider text-[#9F3A4B]">
                L&amp;A
              </span>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.26em] text-[#B88B58] uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Trân Trọng Báo Tin</span>
              <Sparkles className="h-3.5 w-3.5" />
            </div>

            <h2 className="mt-2 font-serif text-2xl font-bold tracking-[0.08em] text-[#352629] uppercase sm:text-3xl">
              Lễ Thành Hôn
            </h2>

            {/* Two Families Grid */}
            <div className="mt-9 grid grid-cols-1 gap-8 border-y border-[#F0E1D4] py-8 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-[#F0E1D4]">
              {/* Nhà Trai */}
              <div className="flex flex-col items-center justify-center px-3 sm:px-6">
                <span className="rounded-full border border-[#C69C6D]/45 bg-[#FDF7F0] px-4 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#9C6E3B] uppercase">
                  Nhà Trai
                </span>
                <div className="mt-4 space-y-1 text-sm text-[#4A383C] sm:text-base">
                  {groom.father && (
                    <p className="font-semibold text-[#2E2023]">
                      {groom.father}
                    </p>
                  )}
                  {groom.mother && (
                    <p className="font-semibold text-[#2E2023]">
                      {groom.mother}
                    </p>
                  )}
                  <p className="pt-1 text-xs text-[#8A6D73] sm:text-sm">
                    {groom.hometown}
                  </p>
                </div>
              </div>

              {/* Nhà Gái */}
              <div className="flex flex-col items-center justify-center px-3 sm:px-6">
                <span className="rounded-full border border-[#C69C6D]/45 bg-[#FDF7F0] px-4 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#9C6E3B] uppercase">
                  Nhà Gái
                </span>
                <div className="mt-4 space-y-1 text-sm text-[#4A383C] sm:text-base">
                  {bride.father && (
                    <p className="font-semibold text-[#2E2023]">
                      {bride.father}
                    </p>
                  )}
                  {bride.mother && (
                    <p className="font-semibold text-[#2E2023]">
                      {bride.mother}
                    </p>
                  )}
                  <p className="pt-1 text-xs text-[#8A6D73] sm:text-sm">
                    {bride.hometown}
                  </p>
                </div>
              </div>
            </div>

            {/* Formal Couple Announcement */}
            <p className="mt-7 text-xs tracking-[0.18em] text-[#8E6D73] uppercase sm:text-sm">
              Trân trọng báo tin lễ thành hôn của hai con chúng tôi
            </p>

            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] text-[#B88B58] uppercase">
                  {groom.position}
                </p>
                <p className="mt-1 font-script text-4xl font-bold text-[#9F3A4B] sm:text-5xl">
                  {groom.fullName}
                </p>
              </div>

              <span className="font-serif text-3xl text-[#C69C6D] italic">
                &amp;
              </span>

              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] text-[#B88B58] uppercase">
                  {bride.position}
                </p>
                <p className="mt-1 font-script text-4xl font-bold text-[#9F3A4B] sm:text-5xl">
                  {bride.fullName}
                </p>
              </div>
            </div>

            <p className="mx-auto mt-7 max-w-xl font-serif text-base leading-relaxed text-[#6A5257] italic sm:text-lg">
              &ldquo;Hôn nhân không phải là đích đến, mà là khởi đầu cho hành
              trình nắm tay nhau đi qua mọi mùa yêu thương.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
