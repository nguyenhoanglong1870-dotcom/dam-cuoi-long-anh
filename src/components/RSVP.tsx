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
import ScrollReveal from "./ScrollReveal";

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
    <section id="rsvp" className="relative px-4 py-10 sm:px-6">
      <ScrollReveal delay={150} direction="up">
        {/* Arched Top Light Ivory/Peach Card */}
        <div className="mx-auto max-w-sm rounded-t-[80px] rounded-b-[28px] border border-[#DFCBB5]/80 bg-[#FCF8F5] p-5 pt-10 text-center shadow-[0_18px_45px_-20px_rgba(40,65,50,0.12)] sm:p-7 sm:pt-12">
          {/* Monogram Heart Icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#DFCBB5] bg-white text-[#2C4134] shadow-sm">
            <Heart className="h-5 w-5 fill-[#2C4134] text-[#2C4134]" />
          </div>

          {/* Section Header */}
          <div className="mt-3">
            <p className="font-serif text-xs font-semibold tracking-[0.26em] text-[#A67C43] uppercase">
              R.S.V.P.
            </p>
            <h2 className="mt-0.5 font-script text-3xl font-bold text-[#2C4134] sm:text-4xl">
              Xác nhận tham dự
            </h2>
            <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-[#556D60]">
              Vui lòng xác nhận tham dự để chúng mình chuẩn bị lễ cưới được chu đáo nhất.
            </p>
          </div>

          {/* Form Container */}
          <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm text-left sm:p-5">
            {submitted ? (
              <div className="py-5 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EBF2ED] text-[#2C4134]">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mt-2 font-serif text-lg font-bold text-[#23372B]">
                  Cảm ơn {form.name}!
                </h3>
                <p className="mx-auto mt-1.5 max-w-xs text-xs leading-relaxed text-[#556D60]">
                  {form.attendance === "attending"
                    ? "Thông tin xác nhận tham dự và lời chúc đã được chuyển tới Hoàng Long & Ngọc Ánh. Hẹn gặp bạn vào ngày 20/12/2026!"
                    : "Cảm ơn bạn đã gửi lời chúc tốt đẹp tới Hoàng Long & Ngọc Ánh!"}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(INITIAL_FORM);
                    setSubmitted(false);
                  }}
                  className="mt-4 inline-flex min-h-[38px] items-center justify-center rounded-full border border-[#DFCBB5] px-4 py-1.5 text-xs font-semibold text-[#2C4134] transition hover:bg-[#F4F8F5]"
                >
                  Gửi thêm phản hồi khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                {/* Tên khách mời */}
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-[#23372B]"
                  >
                    <User className="h-3.5 w-3.5 text-[#C5A059]" />
                    <span>
                      Họ và tên của bạn <span className="text-[#A34857]">*</span>
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
                    className="min-h-[42px] w-full rounded-xl border border-[#E2D8CC] bg-[#FDFBF9] px-3 py-2 text-xs text-[#23372B] placeholder:text-[#A6B8AD] transition focus:border-[#2C4134] focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label
                    htmlFor="rsvp-phone"
                    className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-[#23372B]"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#C5A059]" />
                    <span>
                      Số điện thoại <span className="text-[#A34857]">*</span>
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
                    className="min-h-[42px] w-full rounded-xl border border-[#E2D8CC] bg-[#FDFBF9] px-3 py-2 text-xs text-[#23372B] placeholder:text-[#A6B8AD] transition focus:border-[#2C4134] focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Bạn là khách của */}
                <div>
                  <span className="mb-1 block text-xs font-semibold text-[#23372B]">
                    Bạn là khách của:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, side: "groom" }))}
                      className={`min-h-[38px] rounded-xl border px-2 text-xs font-semibold transition ${
                        form.side === "groom"
                          ? "border-[#2C4134] bg-[#2C4134] text-white shadow-sm"
                          : "border-[#E2D8CC] bg-[#FDFBF9] text-[#556D60] hover:border-[#C5A059]"
                      }`}
                    >
                      Nhà Trai (Hoàng Long)
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, side: "bride" }))}
                      className={`min-h-[38px] rounded-xl border px-2 text-xs font-semibold transition ${
                        form.side === "bride"
                          ? "border-[#2C4134] bg-[#2C4134] text-white shadow-sm"
                          : "border-[#E2D8CC] bg-[#FDFBF9] text-[#556D60] hover:border-[#C5A059]"
                      }`}
                    >
                      Nhà Gái (Ngọc Ánh)
                    </button>
                  </div>
                </div>

                {/* Trạng thái tham dự */}
                <div>
                  <span className="mb-1 block text-xs font-semibold text-[#23372B]">
                    Khả năng tham dự:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <label
                      className={`flex min-h-[40px] cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-2 text-xs font-semibold transition ${
                        form.attendance === "attending"
                          ? "border-[#2C4134] bg-[#EBF2ED] text-[#2C4134]"
                          : "border-[#E2D8CC] bg-[#FDFBF9] text-[#556D60]"
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
                        className="accent-[#2C4134]"
                      />
                      <span>Tham dự được</span>
                    </label>

                    <label
                      className={`flex min-h-[40px] cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-2 text-xs font-semibold transition ${
                        form.attendance === "absent"
                          ? "border-[#2C4134] bg-[#EBF2ED] text-[#2C4134]"
                          : "border-[#E2D8CC] bg-[#FDFBF9] text-[#556D60]"
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
                        className="accent-[#2C4134]"
                      />
                      <span>Không tham dự</span>
                    </label>
                  </div>
                </div>

                {/* Số người đi cùng */}
                {form.attendance === "attending" && (
                  <div>
                    <label
                      htmlFor="rsvp-guests"
                      className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-[#23372B]"
                    >
                      <Users className="h-3.5 w-3.5 text-[#C5A059]" />
                      <span>Số người tham dự</span>
                    </label>
                    <select
                      id="rsvp-guests"
                      name="guests"
                      value={form.guests}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, guests: e.target.value }))
                      }
                      className="min-h-[42px] w-full rounded-xl border border-[#E2D8CC] bg-[#FDFBF9] px-3 py-2 text-xs text-[#23372B] transition focus:border-[#2C4134] focus:bg-white focus:outline-none"
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
                    className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-[#23372B]"
                  >
                    <MessageSquareHeart className="h-3.5 w-3.5 text-[#C5A059]" />
                    <span>Lời chúc gửi đến cô dâu &amp; chú rể</span>
                  </label>
                  <textarea
                    id="rsvp-wishes"
                    name="wishes"
                    rows={2}
                    placeholder="Chúc hai bạn trăm năm hạnh phúc, vạn sự cát tường..."
                    value={form.wishes}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, wishes: e.target.value }))
                    }
                    className="w-full resize-none rounded-xl border border-[#E2D8CC] bg-[#FDFBF9] px-3 py-2 text-xs leading-relaxed text-[#23372B] placeholder:text-[#A6B8AD] transition focus:border-[#2C4134] focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Error message */}
                {errorMessage && (
                  <div
                    role="alert"
                    className="flex items-start gap-1.5 rounded-xl border border-red-200 bg-red-50 p-2.5 text-[11px] text-red-700"
                  >
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#2C4134] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#2C4134]/20 transition hover:bg-[#1E2E25] active:scale-[0.98] disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Đang gửi xác nhận...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Gửi xác nhận tham dự</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
