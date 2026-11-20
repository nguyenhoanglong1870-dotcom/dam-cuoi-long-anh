"use client";

import { useState } from "react";
import { Check, Copy, Gift, Heart, QrCode, Sparkles, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { WEDDING_CONFIG, type BankAccount } from "@/config/wedding";

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
    <section id="gift-box" className="relative px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-sm rounded-[28px] border border-[#C69C6D]/40 bg-white/95 p-5 text-center shadow-[0_20px_50px_-20px_rgba(35,61,49,0.22)] sm:p-7">
        {/* Botanical / Ribbon Ornament */}
        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.24em] text-[#B88B58] uppercase">
          <Gift className="h-3.5 w-3.5 text-[#C69C6D]" />
          <span>Hộp Mừng Cưới</span>
          <Gift className="h-3.5 w-3.5 text-[#C69C6D]" />
        </div>

        <h2 className="mt-1 font-script text-4xl font-bold text-[#233D31] sm:text-5xl">
          Gửi quà mừng
        </h2>

        <p className="mx-auto mt-2 text-xs leading-relaxed text-[#6E5459]">
          Sự hiện diện của quý vị là món quà trân quý nhất. Với người thân và
          bạn bè ở xa, gia đình xin trân trọng đón nhận tình cảm và lời chúc phúc
          từ xa.
        </p>

        {/* Segmented Switcher: Chú rể vs Cô dâu (Chuẩn NgayChungDoi) */}
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-[#F4F7F5] p-1.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSelectedRole("groom")}
            className={`min-h-[40px] rounded-xl transition ${
              selectedRole === "groom"
                ? "bg-[#233D31] text-white shadow-sm"
                : "text-[#556960] hover:text-[#233D31]"
            }`}
          >
            Mừng chú rể
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole("bride")}
            className={`min-h-[40px] rounded-xl transition ${
              selectedRole === "bride"
                ? "bg-[#233D31] text-white shadow-sm"
                : "text-[#556960] hover:text-[#233D31]"
            }`}
          >
            Mừng cô dâu
          </button>
        </div>

        {/* Active Bank Card */}
        <div className="mt-6 rounded-2xl border border-[#E8D9CD] bg-gradient-to-b from-[#FFFDF9] to-white p-5 shadow-sm">
          {/* Pure Vector QR Frame */}
          <button
            type="button"
            onClick={() => setIsZoomOpen(true)}
            aria-label={`Phóng to mã QR ${currentAccount.role}`}
            className="group relative mx-auto flex aspect-square w-48 items-center justify-center rounded-2xl border border-[#E7D5C4] bg-white p-3 shadow-sm transition hover:border-[#C69C6D] hover:shadow-md focus:outline-none"
          >
            {/* Corner gold brackets */}
            <span
              aria-hidden="true"
              className="absolute top-2 left-2 h-3 w-3 border-t-2 border-l-2 border-[#C69C6D]"
            />
            <span
              aria-hidden="true"
              className="absolute top-2 right-2 h-3 w-3 border-t-2 border-r-2 border-[#C69C6D]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-[#C69C6D]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-[#C69C6D]"
            />

            <div className="flex h-full w-full items-center justify-center transition duration-300 group-hover:scale-[1.02]">
              <QRCodeSVG
                value={currentAccount.qrPayload}
                size={170}
                level="M"
                bgColor="#FFFFFF"
                fgColor="#233D31"
                includeMargin={false}
              />
            </div>
          </button>

          <p className="mt-2 text-[10px] text-[#9A7A80]">
            Chạm vào mã QR để phóng to
          </p>

          {/* Account Details */}
          <div className="mt-4 space-y-1 text-center">
            <span className="inline-block rounded-full bg-[#E8F0EC] px-3 py-0.5 text-[11px] font-semibold text-[#233D31]">
              {currentAccount.bankName}
            </span>
            <p className="font-serif text-lg font-bold text-[#352629]">
              {currentAccount.ownerName}
            </p>
            <p className="font-mono text-base font-bold tracking-wider text-[#9F3A4B]">
              {currentAccount.accountNumber}
            </p>
          </div>

          {/* Copy STK Button (Chuẩn NgayChungDoi) */}
          <button
            type="button"
            onClick={() => handleCopy(currentAccount)}
            className={`mt-4 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition active:scale-[0.98] ${
              copiedId === currentAccount.id
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-[#233D31] text-white shadow-md shadow-[#233D31]/25 hover:bg-[#1A2E25]"
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

      {/* QR Zoom Modal */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsZoomOpen(false)}
          className="animate-lightbox-fade fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-lightbox-zoom relative w-full max-w-xs rounded-3xl border border-[#C69C6D]/50 bg-white p-6 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              aria-label="Đóng"
              className="absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F7F5] text-[#233D31] transition hover:bg-[#E8F0EC]"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-xs font-semibold text-[#C69C6D] uppercase">
              {currentAccount.role}
            </p>
            <h3 className="mt-1 font-serif text-xl font-bold text-[#233D31]">
              {currentAccount.ownerName}
            </h3>

            <div className="relative mx-auto mt-4 flex aspect-square w-56 items-center justify-center rounded-2xl border-2 border-[#E8D9CD] bg-white p-3">
              <QRCodeSVG
                value={currentAccount.qrPayload}
                size={200}
                level="M"
                bgColor="#FFFFFF"
                fgColor="#233D31"
              />
            </div>

            <p className="mt-3 text-xs font-medium text-[#7A5B61]">
              {currentAccount.bankName}
            </p>
            <p className="font-mono text-base font-bold text-[#9F3A4B]">
              {currentAccount.accountNumber}
            </p>

            <button
              type="button"
              onClick={() => handleCopy(currentAccount)}
              className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-[#233D31] text-xs font-semibold text-white shadow-sm hover:bg-[#1A2E25]"
            >
              <Copy className="h-4 w-4" />
              <span>Sao chép STK</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
