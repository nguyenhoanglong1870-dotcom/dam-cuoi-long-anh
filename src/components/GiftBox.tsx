"use client";

import { useState } from "react";
import { Check, Copy, Gift, Sparkles, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { WEDDING_CONFIG, type BankAccount } from "@/config/wedding";
import ScrollReveal from "./ScrollReveal";

export default function GiftBox() {
  const [selectedRole, setSelectedRole] = useState<"groom" | "bride">("groom");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const currentAccount: BankAccount =
    selectedRole === "groom"
      ? (WEDDING_CONFIG.giftAccounts[0] as BankAccount)
      : (WEDDING_CONFIG.giftAccounts[1] as BankAccount);

  const handleCopy = async (account: BankAccount) => {
    const cleanNumber = account.accountNumber.replace(/\s+/g, "");
    try {
      await navigator.clipboard.writeText(cleanNumber);
      setCopiedId(account.id);
      setTimeout(() => setCopiedId(null), 2200);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = cleanNumber;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedId(account.id);
      setTimeout(() => setCopiedId(null), 2200);
    }
  };

  return (
    <section id="gift-box" className="relative px-4 py-10 sm:px-6">
      <ScrollReveal delay={150} direction="up">
        <div className="mx-auto max-w-sm rounded-[28px] border border-[#DFCBB5]/80 bg-white/95 p-5 text-center shadow-[0_18px_45px_-20px_rgba(40,65,50,0.12)] sm:p-7">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.24em] text-[#A67C43] uppercase">
            <Gift className="h-3 w-3 text-[#C5A059]" />
            <span>Hộp Mừng Cưới</span>
            <Gift className="h-3 w-3 text-[#C5A059]" />
          </div>

          <h2 className="mt-1 font-script text-3xl font-bold text-[#2C4134] sm:text-4xl">
            Gửi quà mừng
          </h2>

          <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-[#556D60]">
            Sự hiện diện của quý vị là món quà quý giá nhất. Với quý thân hữu ở xa, gia đình trân trọng đón nhận tình cảm từ xa.
          </p>

          {/* Segmented Switcher: Chú rể vs Cô dâu */}
          <div className="mt-5 grid grid-cols-2 gap-1.5 rounded-2xl bg-[#F4F8F5] p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSelectedRole("groom")}
              className={`min-h-[38px] rounded-xl transition ${
                selectedRole === "groom"
                  ? "bg-[#2C4134] text-white shadow-sm"
                  : "text-[#556D60] hover:text-[#23372B]"
              }`}
            >
              Mừng chú rể
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("bride")}
              className={`min-h-[38px] rounded-xl transition ${
                selectedRole === "bride"
                  ? "bg-[#2C4134] text-white shadow-sm"
                  : "text-[#556D60] hover:text-[#23372B]"
              }`}
            >
              Mừng cô dâu
            </button>
          </div>

          {/* Active Bank Card */}
          <div className="mt-5 rounded-2xl border border-[#EADBCE]/80 bg-gradient-to-b from-[#FFFDFB] to-white p-4 shadow-sm">
            {/* Pure Vector QR Frame */}
            <button
              type="button"
              onClick={() => setIsZoomOpen(true)}
              aria-label={`Phóng to mã QR ${currentAccount.role}`}
              className="group relative mx-auto flex aspect-square w-44 items-center justify-center rounded-2xl border border-[#E2D8CC] bg-white p-2.5 shadow-sm transition hover:border-[#C5A059] hover:shadow-md focus:outline-none"
            >
              {/* Corner gold brackets */}
              <span
                aria-hidden="true"
                className="absolute top-2 left-2 h-2.5 w-2.5 border-t-2 border-l-2 border-[#C5A059]"
              />
              <span
                aria-hidden="true"
                className="absolute top-2 right-2 h-2.5 w-2.5 border-t-2 border-r-2 border-[#C5A059]"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2 border-[#C5A059]"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 border-[#C5A059]"
              />

              <div className="flex h-full w-full items-center justify-center transition duration-300 group-hover:scale-[1.02]">
                <QRCodeSVG
                  value={currentAccount.qrPayload}
                  size={155}
                  level="M"
                  bgColor="#FFFFFF"
                  fgColor="#2C4134"
                  includeMargin={false}
                />
              </div>
            </button>

            <p className="mt-2 text-[10px] text-[#718579]">
              Chạm vào mã QR để phóng to
            </p>

            {/* Account Details */}
            <div className="mt-3 space-y-0.5 text-center">
              <span className="inline-block rounded-full bg-[#EBF2ED] px-3 py-0.5 text-[10px] font-semibold text-[#2C4134]">
                {currentAccount.bankName}
              </span>
              <p className="font-serif text-base font-bold text-[#23372B]">
                {currentAccount.ownerName}
              </p>
              <p className="font-mono text-sm font-bold tracking-wider text-[#A34857]">
                {currentAccount.accountNumber}
              </p>
            </div>

            {/* Copy STK Button */}
            <button
              type="button"
              onClick={() => handleCopy(currentAccount)}
              className={`mt-3 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition active:scale-[0.98] ${
                copiedId === currentAccount.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-[#2C4134] text-white shadow-md shadow-[#2C4134]/20 hover:bg-[#1E2E25]"
              }`}
            >
              {copiedId === currentAccount.id ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Đã sao chép số tài khoản</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Sao chép số tài khoản</span>
                </>
              )}
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* QR Zoom Modal */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xs rounded-3xl border border-[#DFCBB5] bg-white p-5 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              aria-label="Đóng"
              className="absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F8F5] text-[#2C4134] transition hover:bg-[#EBF2ED]"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-[10px] font-semibold text-[#A67C43] uppercase">
              {currentAccount.role}
            </p>
            <h3 className="mt-0.5 font-serif text-lg font-bold text-[#23372B]">
              {currentAccount.ownerName}
            </h3>

            <div className="relative mx-auto mt-3 flex aspect-square w-52 items-center justify-center rounded-2xl border border-[#E2D8CC] bg-white p-2.5">
              <QRCodeSVG
                value={currentAccount.qrPayload}
                size={185}
                level="M"
                bgColor="#FFFFFF"
                fgColor="#2C4134"
              />
            </div>

            <p className="mt-2 text-xs font-medium text-[#556D60]">
              {currentAccount.bankName}
            </p>
            <p className="font-mono text-sm font-bold text-[#A34857]">
              {currentAccount.accountNumber}
            </p>

            <button
              type="button"
              onClick={() => handleCopy(currentAccount)}
              className="mt-3 inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-xl bg-[#2C4134] text-xs font-semibold text-white shadow-sm hover:bg-[#1E2E25]"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Sao chép STK</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
