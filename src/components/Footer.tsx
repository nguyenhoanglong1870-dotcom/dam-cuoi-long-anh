import { Heart } from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";

export default function Footer() {
  return (
    <footer className="border-t border-[#F0DDE1] bg-[#FDFBF7] px-4 pt-12 pb-24 text-center sm:pb-16">
      <div className="mx-auto max-w-xl">
        <p className="font-serif text-sm tracking-[0.22em] text-[#C69C6D] uppercase">
          Thank You With Love
        </p>
        <p className="mt-2 font-script text-4xl font-bold text-[#9F3A4B]">
          {WEDDING_CONFIG.groom.name} &amp; {WEDDING_CONFIG.bride.name}
        </p>
        <p className="mt-2 text-sm text-[#7A5B61]">
          {WEDDING_CONFIG.dateDisplay} • Xã Thiên Lộc, Đông Anh, Hà Nội
        </p>
        <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-[#9C7D83]">
          <span>Made with</span>
          <Heart className="h-3.5 w-3.5 fill-[#9F3A4B] text-[#9F3A4B]" />
          <span>for our special day</span>
        </div>
      </div>
    </footer>
  );
}
