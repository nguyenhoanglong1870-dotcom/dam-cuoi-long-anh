import type { Metadata, Viewport } from "next";
import {
  Be_Vietnam_Pro,
  Cormorant_Garamond,
  Dancing_Script,
} from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thiệp Cưới Hoàng Long & Ngọc Ánh — 20/12/2026",
  description:
    "Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của Hoàng Long & Ngọc Ánh vào ngày 20/12/2026 tại Đông Anh, Hà Nội.",
  openGraph: {
    title: "Thiệp Cưới Hoàng Long & Ngọc Ánh — 20/12/2026",
    description:
      "Save The Date • 20/12/2026 • Trân trọng kính mời quý khách đến tham dự lễ thành hôn của Hoàng Long & Ngọc Ánh.",
    type: "website",
    locale: "vi_VN",
  },
};

export const viewport: Viewport = {
  themeColor: "#FDFBF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${dancingScript.variable} ${cormorantGaramond.variable} ${beVietnamPro.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FDFBF7] text-[#352629] font-sans selection:bg-[#9F3A4B]/15 selection:text-[#9F3A4B] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
