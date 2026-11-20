import { Heart, Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  return (
    <footer className="border-t border-[#F0EAE1] bg-[#FAF8F5] px-4 pt-10 pb-24 text-center sm:pb-20">
      <ScrollReveal delay={100} direction="up">
        <div className="mx-auto max-w-sm">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.26em] text-[#A67C43] uppercase">
            <Sparkles className="h-3 w-3 text-[#C5A059]" />
            <span>Thank You With Love</span>
            <Sparkles className="h-3 w-3 text-[#C5A059]" />
          </div>

          <h2 className="mt-2 font-script text-3xl font-bold text-[#2C4134]">
            {WEDDING_CONFIG.groom.name} &amp; {WEDDING_CONFIG.bride.name}
          </h2>

          <p className="mt-1 text-xs text-[#556D60]">
            {WEDDING_CONFIG.dateDisplay} · Xã Thiên Lộc, Đông Anh, Hà Nội
          </p>

          <p className="mx-auto mt-3 max-w-xs text-[11px] leading-relaxed text-[#718579] italic">
            Sự hiện diện và lời chúc phúc của quý vị là niềm vinh hạnh lớn lao của chúng tôi.
          </p>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#8A9E92]">
            <span>Made with</span>
            <Heart className="h-3 w-3 fill-[#A34857] text-[#A34857]" />
            <span>for our wedding day</span>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
