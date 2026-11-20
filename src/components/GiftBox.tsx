"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Download,
  Gift,
  Heart,
  QrCode,
  Sparkles,
  X,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { WEDDING_CONFIG, type BankAccount } from "@/config/wedding";

export default function GiftBox() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQr, setActiveQr] = useState<BankAccount | null>(null);

  useEffect(() => {
    if (!activeQr) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveQr(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [activeQr]);

  const handleCopy = async (account: BankAccount) => {
    const cleanNumber = account.accountNumber.replace(/\s+/g, "");
    try {
      await navigator.clipboard.writeText(cleanNumber);
      setCopiedId(account.id);
      window.setTimeout(() => {
        setCopiedId((current) => (current === account.id ? null : current));
      }, 2200);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = cleanNumber;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedId(account.id);
      window.setTimeout(() => setCopiedId(null), 2200);
    }
  };

  const handleDownloadQr = (account: BankAccount) => {
    // Tải file QR sạch đã tạo sẵn
    if (account.qrImage) {
      const link = document.createElement("a");
      link.href = account.qrImage;
      link.download = `QR-Mung-Cuoi-${account.ownerName.replace(/\s+/g, "-")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section
      id="gift-box"
      className="relative px-4 py-16 sm:px-6 md:py-22"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-[#B88B58] uppercase">
            <Gift className="h-4 w-4 text-[#C69C6D]" />
            <span>Hộp Mừng Cưới</span>
          </div>
          <h2 className="mt-2 font-script text-4xl font-bold text-[#9F3A4B] sm:text-5xl">
            Gửi Trao Yêu Thương
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#6E5459] sm:text-base">
            Sự hiện diện của quý vị là món quà trân quý nhất. Với những người
            thân và bạn bè ở xa không thể trực tiếp tham dự, gia đình xin trân
            trọng đón nhận tình cảm và lời chúc phúc từ xa.
          </p>
        </div>

        {/* Two Luxury Gift Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {(WEDDING_CONFIG.giftAccounts as BankAccount[]).map((account) => {
            const isCopied = copiedId === account.id;
            return (
              <div
                key={account.id}
                className="relative rounded-[26px] border border-[#C69C6D]/40 bg-white p-2 shadow-[0_20px_50px_-24px_rgba(159,58,75,0.22)]"
              >
                <div className="flex h-full flex-col items-center rounded-[20px] border border-[#F0E1D4] bg-gradient-to-b from-[#FFFDF9] to-white px-5 py-7 text-center sm:px-7">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCEEF0] px-4 py-1 text-xs font-semibold tracking-[0.16em] text-[#9F3A4B] uppercase">
                    <Sparkles className="h-3.5 w-3.5 text-[#C69C6D]" />
                    <span>{account.role}</span>
                  </span>

                  {/* Clean Vector QR Frame (Không dùng ảnh chụp, thuần mã QR vector) */}
                  <button
                    type="button"
                    onClick={() => setActiveQr(account)}
                    aria-label={`Phóng to mã QR ${account.role}`}
                    className="group relative mt-5 flex aspect-square w-48 items-center justify-center rounded-2xl border border-[#E7D5C4] bg-white p-3 shadow-sm transition hover:border-[#C69C6D] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9F3A4B] sm:w-52"
                  >
                    {/* Decorative luxury corner accents */}
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

                    {/* Vector QR code SVG */}
                    <div className="flex h-full w-full items-center justify-center transition duration-300 group-hover:scale-[1.02]">
                      <QRCodeSVG
                        value={account.qrPayload}
                        size={172}
                        level="M"
                        bgColor="#FFFFFF"
                        fgColor="#1C1618"
                        includeMargin={false}
                        className="h-full w-full aspect-square"
                      />
                    </div>
                  </button>

                  <p className="mt-2 text-[11px] font-medium tracking-wider text-[#A08288]">
                    Chạm để phóng to mã QR
                  </p>

                  {/* Bank Info */}
                  <div className="mt-4 w-full space-y-1">
                    <p className="text-xs font-semibold tracking-wider text-[#9A7A80] uppercase">
                      {account.bankName}
                    </p>
                    <p className="font-serif text-xl font-bold tracking-wide text-[#352629]">
                      {account.ownerName}
                    </p>
                    <p className="pt-0.5 font-mono text-lg font-bold tracking-wider text-[#9F3A4B]">
                      {account.accountNumber}
                    </p>
                  </div>

                  {/* Mobile-first Action Buttons */}
                  <div className="mt-6 grid w-full grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleCopy(account)}
                      className={`inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium transition active:scale-[0.98] ${
                        isCopied
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-[#9F3A4B] text-white shadow-sm shadow-[#9F3A4B]/20 hover:bg-[#872E3E]"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Đã sao chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Sao chép STK</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveQr(account)}
                      className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl border border-[#C69C6D]/55 bg-[#FFFDF9] px-3 py-2.5 text-sm font-medium text-[#7A3542] transition hover:bg-[#FCEEF0]/60 active:scale-[0.98]"
                    >
                      <QrCode className="h-4 w-4" />
                      <span>Phóng to QR</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QR Zoom Modal (Pure Crisp Vector QR) */}
      {activeQr && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Mã QR phóng to ${activeQr.role}`}
          onClick={() => setActiveQr(null)}
          className="animate-lightbox-fade fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-lightbox-zoom relative w-full max-w-sm rounded-3xl border border-[#C69C6D]/50 bg-white p-6 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setActiveQr(null)}
              aria-label="Đóng mã QR"
              className="absolute top-3.5 right-3.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#FCEEF0] text-[#9F3A4B] transition hover:bg-[#F7DCE2]"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-xs font-semibold tracking-[0.2em] text-[#B88B58] uppercase">
              {activeQr.role}
            </p>
            <h3 className="mt-1 font-serif text-2xl font-bold text-[#352629]">
              {activeQr.ownerName}
            </h3>

            {/* Pure Vector QR Zoom Box */}
            <div className="relative mx-auto mt-4 flex aspect-square w-64 items-center justify-center rounded-2xl border-2 border-[#EBD8C3] bg-white p-4 shadow-sm">
              <span
                aria-hidden="true"
                className="absolute top-2.5 left-2.5 h-3.5 w-3.5 border-t-2 border-l-2 border-[#C69C6D]"
              />
              <span
                aria-hidden="true"
                className="absolute top-2.5 right-2.5 h-3.5 w-3.5 border-t-2 border-r-2 border-[#C69C6D]"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 border-[#C69C6D]"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b-2 border-r-2 border-[#C69C6D]"
              />

              <QRCodeSVG
                value={activeQr.qrPayload}
                size={220}
                level="M"
                bgColor="#FFFFFF"
                fgColor="#1C1618"
                includeMargin={false}
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-[#6A5358]">
              {activeQr.bankName}
            </p>
            <p className="font-mono text-xl font-bold tracking-wider text-[#9F3A4B]">
              {activeQr.accountNumber}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleCopy(activeQr)}
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-[#9F3A4B] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#872E3E]"
              >
                {copiedId === activeQr.id ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Đã chép STK</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Sao chép STK</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleDownloadQr(activeQr)}
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-[#C69C6D] bg-[#FFFDF9] px-3 py-2 text-xs font-semibold text-[#7A3542] transition hover:bg-[#FCEEF0]/60"
              >
                <Download className="h-4 w-4" />
                <span>Tải mã QR</span>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#9C7D83]">
              <Heart className="h-3.5 w-3.5 fill-[#9F3A4B] text-[#9F3A4B]" />
              <span>Cảm ơn tấm lòng chân thành của bạn!</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
