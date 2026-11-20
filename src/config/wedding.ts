export interface WeddingEvent {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  dateLabel: string;
  lunarDate: string;
  venueName: string;
  address: string;
  note: string;
  mapsUrl: string;
}

export interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: "incense" | "welcome" | "rings" | "toast";
}

export interface BankAccount {
  id: string;
  role: string;
  ownerName: string;
  bankName: string;
  accountNumber: string;
  branch?: string;
  qrPayload: string;
  qrImage?: string;
}

export const WEDDING_CONFIG = {
  groom: {
    name: "Hoàng Long",
    fullName: "Nguyễn Hoàng Long",
    position: "Chú Rể",
    father: "Ông Nguyễn Đức Hùng",
    mother: "",
    hometown: "Xã Thiên Lộc, Đông Anh, Hà Nội",
  },
  bride: {
    name: "Ngọc Ánh",
    fullName: "Mạc Ngọc Ánh",
    position: "Cô Dâu",
    father: "Ông Mạc Văn Nhu",
    mother: "Bà Lô Thị Liệu",
    hometown: "Văn Quan, Lạng Sơn",
  },

  /** Ngày cưới hiển thị trên giao diện */
  dateDisplay: "20 . 12 . 2026",
  dateFullText: "Chủ Nhật, ngày 20 tháng 12 năm 2026",
  lunarDateText: "Tức ngày 12 tháng 11 năm Bính Ngọ",

  /**
   * Mốc thời gian đếm ngược theo múi giờ Việt Nam (GMT+7)
   * Định dạng ISO: YYYY-MM-DDTHH:mm:ss+07:00
   */
  countdownTargetISO: "2026-12-20T11:00:00+07:00",

  /** Ảnh Chibi cưới ở Hero Section */
  heroChibiImage: "/images/chibi-hero.jpg",

  /**
   * Đường dẫn file nhạc nền: "Em Đồng Ý (I Do)" (Đức Phúc x 911)
   */
  musicSrc: "/music/wedding-song.mp3",
  musicTitle: "Em Đồng Ý (I Do) — Đức Phúc x 911",

  /** Lịch trình chi tiết ngày cưới (Timeline) */
  timeline: [
    {
      id: "step-1",
      time: "08:00",
      title: "Lễ Gia Tiên & Đón Dâu",
      description:
        "Nghi thức dâng hương gia tiên và chung vui ấm cúng cùng hai bên gia đình.",
      icon: "incense",
    },
    {
      id: "step-2",
      time: "10:30",
      title: "Đón Khách & Chụp Ảnh Lưu Niệm",
      description:
        "Đón tiếp quý quan khách, bạn bè và người thân tới chung vui tại Sân Chơi Thôn Nhuế.",
      icon: "welcome",
    },
    {
      id: "step-3",
      time: "11:00",
      title: "Nghi Lễ Thành Hôn",
      description:
        "Cô dâu chú rể ra mắt hai họ, trao nhẫn cưới và gửi lời cảm ơn chân thành đến quý vị.",
      icon: "rings",
    },
    {
      id: "step-4",
      time: "11:30",
      title: "Khai Tiệc & Chung Vui",
      description:
        "Cùng nâng ly chúc mừng hạnh phúc trăm năm của Hoàng Long & Ngọc Ánh.",
      icon: "toast",
    },
  ] satisfies TimelineItem[],

  /** Thông tin sự kiện: Tiệc Cưới */
  events: [
    {
      id: "tiec-cuoi",
      title: "Tiệc Cưới",
      subtitle: "Chung vui & Khai tiệc",
      time: "11:00 — Chủ Nhật",
      dateLabel: "20/12/2026",
      lunarDate: "12/11 Âm lịch",
      venueName: "Sân Chơi Thôn Nhuế",
      address: "Thôn Nhuế, Kim Chung, Xã Thiên Lộc, Đông Anh, Hà Nội",
      note: "Đón khách từ 10:30, khai tiệc lúc 11:00. Sự hiện diện của quý vị là niềm vinh hạnh lớn của hai gia đình.",
      mapsUrl: "https://maps.app.goo.gl/g8nvdsPrR9ZkhQKf6",
    },
  ] satisfies WeddingEvent[],

  /** Hộp Mừng Cưới (Mã QR VietQR chuẩn EMVCo) */
  giftAccounts: [
    {
      id: "groom-gift",
      role: "Mừng Cưới Chú Rể",
      ownerName: "NGUYEN HOANG LONG",
      bankName: "Vietcombank (VCB)",
      accountNumber: "1014642996",
      qrPayload:
        "00020101021138540010A00000072701240006970436011010146429960208QRIBFTTA53037045802VN6304EB29",
      qrImage: "/images/qr-groom-clean.png",
    },
    {
      id: "bride-gift",
      role: "Mừng Cưới Cô Dâu",
      ownerName: "MAC NGOC ANH",
      bankName: "MB Bank (Ngân hàng Quân Đội)",
      accountNumber: "0373764675",
      qrPayload:
        "00020101021138540010A00000072701240006970422011003737646750208QRIBFTTA53037045802VN6304f58e",
      qrImage: "/images/qr-bride-clean.png",
    },
  ] satisfies BankAccount[],
};
