"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Smartphone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function DesktopQrCompanion() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  if (!currentUrl) return null;

  return (
    <aside
      aria-label="Mã QR xem trên điện thoại"
      className="hidden xl:block fixed bottom-6 left-6 z-40"
    >
      <div className="rounded-2xl border border-[#DFCBB5] bg-white/95 p-3.5 shadow-xl backdrop-blur-md text-center max-w-[190px]">
        {/* Toggle header */}
        <div className="flex items-center justify-between gap-1 text-[11px] font-semibold text-[#2C4134] pb-1.5 border-b border-[#F0EAE1]">
          <div className="flex items-center gap-1.5">
            <Smartphone className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Xem trên di động</span>
          </div>
          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            aria-label={isCollapsed ? "Mở rộng mã QR" : "Thu nhỏ mã QR"}
            className="text-[#8A9E92] hover:text-[#2C4134] transition"
          >
            {isCollapsed ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>

        {!isCollapsed && (
          <div className="pt-2">
            <div className="flex aspect-square w-full items-center justify-center rounded-xl border border-[#E2D8CC] bg-white p-2">
              <QRCodeSVG
                value={currentUrl}
                size={120}
                level="M"
                bgColor="#FFFFFF"
                fgColor="#2C4134"
              />
            </div>
            <p className="mt-1.5 text-[10px] text-[#718579]">
              Quét mã để mở thiệp trên điện thoại
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
