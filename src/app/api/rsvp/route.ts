import { NextResponse } from "next/server";

interface RsvpPayload {
  name?: string;
  phone?: string;
  attendance?: "attending" | "absent";
  guests?: number;
  wishes?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RsvpPayload;

    const name = body.name?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const attendance = body.attendance === "absent" ? "absent" : "attending";
    const guests =
      attendance === "attending"
        ? Math.max(1, Math.min(20, Number(body.guests) || 1))
        : 0;
    const wishes = body.wishes?.trim() ?? "";

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập tên khách mời." },
        { status: 400 }
      );
    }

    if (!phone || phone.replace(/\D/g, "").length < 9) {
      return NextResponse.json(
        { success: false, error: "Số điện thoại không hợp lệ." },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error(
        "[RSVP API] Thiếu biến môi trường TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID."
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Hệ thống chưa được cấu hình Telegram Bot (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID).",
        },
        { status: 500 }
      );
    }

    const statusLabel =
      attendance === "attending"
        ? `✅ Sẽ đến tham dự (${guests} người)`
        : "💌 Xin phép vắng mặt";

    const timestamp = new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Asia/Ho_Chi_Minh",
    }).format(new Date());

    const messageLines = [
      "💍 <b>XÁC NHẬN THAM DỰ ĐÁM CƯỚI MỚI</b>",
      "━━━━━━━━━━━━━━━━━━",
      `👤 <b>Khách mời:</b> ${escapeHtml(name)}`,
      `📞 <b>Số điện thoại:</b> <code>${escapeHtml(phone)}</code>`,
      `📌 <b>Trạng thái:</b> ${statusLabel}`,
      `💌 <b>Lời chúc:</b> ${wishes ? escapeHtml(wishes) : "<i>(Không để lại lời chúc)</i>"}`,
      "━━━━━━━━━━━━━━━━━━",
      `🕒 <i>Gửi lúc: ${timestamp}</i>`,
    ];

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageLines.join("\n"),
          parse_mode: "HTML",
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorDetails = await telegramResponse.text();
      console.error("[RSVP API] Telegram API error:", errorDetails);
      return NextResponse.json(
        {
          success: false,
          error:
            "Không thể gửi thông báo tới Telegram. Vui lòng kiểm tra lại cấu hình Bot.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[RSVP API] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại sau.",
      },
      { status: 500 }
    );
  }
}
