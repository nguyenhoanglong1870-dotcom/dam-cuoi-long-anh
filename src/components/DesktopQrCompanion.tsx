"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, QrCode, Smartphone } from "lucide-react";
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
      className="hidden lg:block fixed bottom-6 left-6 z-40"
    >
      <div className="rounded-2xl border border-[#C69C6D]/45 bg-white/95 p-3.5 shadow-2xl backdrop-blur-md text-center max-w-[200px]">
        {/* Toggle header */}
        <div className="flex items-center justify-between gap-1 text-[11px] font-semibold text-[#233D31] pb-1.5 border-b border-[#F0E1D4]">
          <div className="flex items-center gap-1.5">
            <Smartphone className="h-3.5 w-3.5 text-[#C69C6D]" />
            <span>Xem trên di động</span>
          </div>
          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            aria-label={isCollapsed ? "Mở rộng mã QR" : "Thu nhỏ mã QR"}
            className="text-[#9A7A80] hover:text-[#352629]"
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
            <div className="flex aspect-square w-full items-center justify-center rounded-xl border border-[#E7D5C4] bg-white p-2">
              <QRCodeSVG
                value={currentUrl}
                size={130}
                level="M"
                bgColor="#FFFFFF"
                fgColor="#233D31"
              />
            </div>
            <p className="mt-2 text-[10px] text-[#7A5B61]">
              Quét mã để mở thiệp cưới trên điện thoại
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
