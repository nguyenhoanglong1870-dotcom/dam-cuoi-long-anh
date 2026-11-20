"use client";

import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Heart,
  Loader2,
  MessageSquareHeart,
  Phone,
  Send,
  User,
  Users,
} from "lucide-react";

type AttendanceStatus = "attending" | "absent";
type GuestSide = "groom" | "bride";

interface FormState {
  name: string;
  phone: string;
  side: GuestSide;
  attendance: AttendanceStatus;
  guests: string;
  wishes: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  side: "groom",
  attendance: "attending",
  guests: "1",
  wishes: "",
};

export default function RSVP() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!form.name.trim()) {
      setErrorMessage("Vui lòng nhập họ và tên của bạn.");
      return;
    }

    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 9) {
      setErrorMessage("Vui lòng nhập số điện thoại hợp lệ (ít nhất 9 chữ số).");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          side: form.side === "groom" ? "Nhà Trai (Hoàng Long)" : "Nhà Gái (Ngọc Ánh)",
          attendance: form.attendance,
          guests: form.attendance === "attending" ? Number(form.guests) : 0,
          wishes: form.wishes.trim(),
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Không thể gửi xác nhận lúc này. Vui lòng thử lại sau."
        );
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Đã có lỗi xảy ra. Vui lòng thử lại sau."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="relative px-4 py-16 sm:px-6">
      {/* Distinctive Arched Top Peach-Blush Card (Chuẩn NgayChungDoi) */}
      <div className="mx-auto max-w-sm sm:max-w-md rounded-t-[100px] sm:rounded-t-[130px] rounded-b-[32px] border border-[#C69C6D]/40 bg-[#FBEEE8] p-6 pt-12 shadow-[0_22px_55px_-20px_rgba(35,61,49,0.25)] text-center sm:p-8 sm:pt-14">
        {/* Monogram Heart Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C69C6D]/60 bg-white text-[#9F3A4B] shadow-sm">
          <Heart className="h-6 w-6 fill-[#9F3A4B]" />
        </div>

        {/* Section Header */}
        <div className="mt-4">
          <p className="font-serif text-sm font-semibold tracking-[0.3em] text-[#9C6E3B] uppercase">
            R.S.V.P.
          </p>
          <h2 className="mt-1 font-script text-4xl font-bold text-[#233D31] sm:text-5xl">
            Xác nhận tham dự
          </h2>
          <p className="mx-auto mt-2 text-xs leading-relaxed text-[#6E5459]">
            Vui lòng xác nhận tham dự để chúng mình chuẩn bị lễ cưới được thuận
            lợi và trọn vẹn nhất.
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm text-left sm:p-6">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-3 font-serif text-xl font-bold text-[#233D31]">
                Cảm ơn {form.name}!
              </h3>
              <p className="mx-auto mt-2 text-xs leading-relaxed text-[#6E5459]">
                {form.attendance === "attending"
                  ? "Thông tin xác nhận tham dự và lời chúc của bạn đã được chuyển tới Hoàng Long & Ngọc Ánh. Hẹn gặp bạn vào ngày 20/12/2026!"
                  : "Cảm ơn bạn đã gửi lời chúc tốt đẹp tới Hoàng Long & Ngọc Ánh. Rất mong sớm gặp lại bạn!"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm(INITIAL_FORM);
                  setSubmitted(false);
                }}
                className="mt-5 inline-flex min-h-[42px] items-center justify-center rounded-full border border-[#C69C6D]/60 px-5 py-2 text-xs font-semibold text-[#233D31] transition hover:bg-[#FCEEF0]/60"
              >
                Gửi thêm phản hồi khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Tên khách mời */}
              <div>
                <label
                  htmlFor="rsvp-name"
                  className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-[#352629]"
                >
                  <User className="h-3.5 w-3.5 text-[#C69C6D]" />
                  <span>
                    Họ và tên của bạn <span className="text-[#9F3A4B]">*</span>
                  </span>
                </label>
                <input
                  id="rsvp-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn Nam"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="min-h-[46px] w-full rounded-xl border border-[#E7D5D9] bg-[#FDFBFC] px-3.5 py-2.5 text-sm text-[#352629] placeholder:text-[#B0989D] transition focus:border-[#233D31] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Số điện thoại */}
              <div>
                <label
                  htmlFor="rsvp-phone"
                  className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-[#352629]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#C69C6D]" />
                  <span>
                    Số điện thoại <span className="text-[#9F3A4B]">*</span>
                  </span>
                </label>
                <input
                  id="rsvp-phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="tel"
                  placeholder="Ví dụ: 0987 654 321"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="min-h-[46px] w-full rounded-xl border border-[#E7D5D9] bg-[#FDFBFC] px-3.5 py-2.5 text-sm text-[#352629] placeholder:text-[#B0989D] transition focus:border-[#233D31] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Bạn là khách của (Segmented selector) */}
              <div>
                <span className="mb-1 block text-xs font-semibold text-[#352629]">
                  Bạn là khách của:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, side: "groom" }))}
                    className={`min-h-[40px] rounded-xl border px-3 text-xs font-semibold transition ${
                      form.side === "groom"
                        ? "border-[#233D31] bg-[#233D31] text-white shadow-sm"
                        : "border-[#E7D5D9] bg-[#FDFBFC] text-[#5B4549] hover:border-[#C69C6D]"
                    }`}
                  >
                    Nhà Trai (Hoàng Long)
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, side: "bride" }))}
                    className={`min-h-[40px] rounded-xl border px-3 text-xs font-semibold transition ${
                      form.side === "bride"
                        ? "border-[#233D31] bg-[#233D31] text-white shadow-sm"
                        : "border-[#E7D5D9] bg-[#FDFBFC] text-[#5B4549] hover:border-[#C69C6D]"
                    }`}
                  >
                    Nhà Gái (Ngọc Ánh)
                  </button>
                </div>
              </div>

              {/* Trạng thái tham dự */}
              <div>
                <span className="mb-1 block text-xs font-semibold text-[#352629]">
                  Khả năng tham dự:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <label
                    className={`flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 text-xs font-semibold transition ${
                      form.attendance === "attending"
                        ? "border-[#233D31] bg-[#E8F0EC] text-[#233D31] ring-1 ring-[#233D31]"
                        : "border-[#E7D5D9] bg-[#FDFBFC] text-[#5B4549]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="attending"
                      checked={form.attendance === "attending"}
                      onChange={() =>
                        setForm((prev) => ({ ...prev, attendance: "attending" }))
                      }
                      className="accent-[#233D31]"
                    />
                    <span>Tham dự được</span>
                  </label>

                  <label
                    className={`flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 text-xs font-semibold transition ${
                      form.attendance === "absent"
                        ? "border-[#233D31] bg-[#E8F0EC] text-[#233D31] ring-1 ring-[#233D31]"
                        : "border-[#E7D5D9] bg-[#FDFBFC] text-[#5B4549]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="absent"
                      checked={form.attendance === "absent"}
                      onChange={() =>
                        setForm((prev) => ({ ...prev, attendance: "absent" }))
                      }
                      className="accent-[#233D31]"
                    />
                    <span>Không tham dự được</span>
                  </label>
                </div>
              </div>

              {/* Số người đi cùng */}
              {form.attendance === "attending" && (
                <div>
                  <label
                    htmlFor="rsvp-guests"
                    className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-[#352629]"
                  >
                    <Users className="h-3.5 w-3.5 text-[#C69C6D]" />
                    <span>Số người tham dự</span>
                  </label>
                  <select
                    id="rsvp-guests"
                    name="guests"
                    value={form.guests}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, guests: e.target.value }))
                    }
                    className="min-h-[46px] w-full rounded-xl border border-[#E7D5D9] bg-[#FDFBFC] px-3.5 py-2 text-sm text-[#352629] transition focus:border-[#233D31] focus:bg-white focus:outline-none"
                  >
                    <option value="1">1 người (Đi một mình)</option>
                    <option value="2">2 người (Đi cùng người thương)</option>
                    <option value="3">3 người (Gia đình)</option>
                    <option value="4">4+ người</option>
                  </select>
                </div>
              )}

              {/* Lời chúc */}
              <div>
                <label
                  htmlFor="rsvp-wishes"
                  className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-[#352629]"
                >
                  <MessageSquareHeart className="h-3.5 w-3.5 text-[#C69C6D]" />
                  <span>Lời chúc gửi đến cô dâu &amp; chú rể</span>
                </label>
                <textarea
                  id="rsvp-wishes"
                  name="wishes"
                  rows={3}
                  placeholder="Chúc hai bạn trăm năm hạnh phúc, mãi mãi bên nhau..."
                  value={form.wishes}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, wishes: e.target.value }))
                  }
                  className="w-full resize-none rounded-xl border border-[#E7D5D9] bg-[#FDFBFC] px-3.5 py-2.5 text-sm leading-relaxed text-[#352629] placeholder:text-[#B0989D] transition focus:border-[#233D31] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Error message */}
              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#233D31] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#233D31]/25 transition hover:bg-[#1A2E25] active:scale-[0.98] disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Đang gửi xác nhận...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Gửi xác nhận</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
