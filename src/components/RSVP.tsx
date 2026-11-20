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

interface FormState {
  name: string;
  phone: string;
  attendance: AttendanceStatus;
  guests: string;
  wishes: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
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
    <section
      id="rsvp"
      className="relative bg-gradient-to-b from-[#FDFBF7] to-[#FCEEF0]/75 px-4 py-16 sm:px-6 md:py-22"
    >
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-[#C69C6D] uppercase">
            <MessageSquareHeart className="h-4 w-4" />
            <span>Xác Nhận Tham Dự</span>
          </div>
          <h2 className="mt-2 font-script text-4xl font-bold text-[#9F3A4B] sm:text-5xl">
            Gửi Lời Chúc &amp; RSVP
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6E5459] sm:text-base">
            Vui lòng xác nhận sự hiện diện của bạn để gia đình chúng tôi chuẩn
            bị đón tiếp chu đáo nhất.
          </p>
        </div>

        {/* Form Card */}
        <div className="mt-9 rounded-3xl border border-[#C69C6D]/35 bg-white p-6 shadow-[0_22px_55px_-24px_rgba(159,58,75,0.25)] sm:p-9">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold text-[#352629] sm:text-3xl">
                Cảm ơn {form.name}!
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#6E5459] sm:text-base">
                {form.attendance === "attending"
                  ? "Thông tin xác nhận tham dự và lời chúc của bạn đã được gửi tới Hoàng Long & Ngọc Ánh. Hẹn gặp bạn vào ngày 20/12/2026!"
                  : "Cảm ơn bạn đã gửi lời chúc phúc tốt đẹp đến Hoàng Long & Ngọc Ánh. Rất mong sớm được gặp lại bạn trong dịp gần nhất!"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm(INITIAL_FORM);
                  setSubmitted(false);
                }}
                className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#C69C6D]/60 px-6 py-2.5 text-sm font-medium text-[#7A3542] transition hover:bg-[#FCEEF0]/60"
              >
                Gửi thêm xác nhận khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Tên khách mời */}
              <div>
                <label
                  htmlFor="rsvp-name"
                  className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#4A3438]"
                >
                  <User className="h-4 w-4 text-[#C69C6D]" />
                  <span>
                    Tên khách mời <span className="text-[#9F3A4B]">*</span>
                  </span>
                </label>
                <input
                  id="rsvp-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Ví dụ: Nguyễn Minh Anh"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="min-h-[50px] w-full rounded-2xl border border-[#E7D5D9] bg-[#FDFBFC] px-4 py-3 text-base text-[#352629] placeholder:text-[#B0989D] transition focus:border-[#9F3A4B] focus:bg-white focus:ring-2 focus:ring-[#9F3A4B]/20 focus:outline-none"
                />
              </div>

              {/* Số điện thoại */}
              <div>
                <label
                  htmlFor="rsvp-phone"
                  className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#4A3438]"
                >
                  <Phone className="h-4 w-4 text-[#C69C6D]" />
                  <span>
                    Số điện thoại <span className="text-[#9F3A4B]">*</span>
                  </span>
                </label>
                <input
                  id="rsvp-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Ví dụ: 0987 654 321"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="min-h-[50px] w-full rounded-2xl border border-[#E7D5D9] bg-[#FDFBFC] px-4 py-3 text-base text-[#352629] placeholder:text-[#B0989D] transition focus:border-[#9F3A4B] focus:bg-white focus:ring-2 focus:ring-[#9F3A4B]/20 focus:outline-none"
                />
              </div>

              {/* Trạng thái tham dự (Large touch-friendly radio cards) */}
              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-[#4A3438]">
                  Trạng thái tham dự <span className="text-[#9F3A4B]">*</span>
                </legend>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label
                    className={`flex min-h-[56px] cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                      form.attendance === "attending"
                        ? "border-[#9F3A4B] bg-[#FCEEF0]/70 text-[#7A2736] shadow-sm ring-1 ring-[#9F3A4B]"
                        : "border-[#E7D5D9] bg-[#FDFBFC] text-[#5B4549] hover:border-[#D9A7B0]"
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
                      className="h-4 w-4 accent-[#9F3A4B]"
                    />
                    <div>
                      <span className="block text-sm font-semibold sm:text-base">
                        Sẽ đến tham dự
                      </span>
                      <span className="block text-xs opacity-75">
                        Rất vui được chung vui!
                      </span>
                    </div>
                  </label>

                  <label
                    className={`flex min-h-[56px] cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                      form.attendance === "absent"
                        ? "border-[#9F3A4B] bg-[#FCEEF0]/70 text-[#7A2736] shadow-sm ring-1 ring-[#9F3A4B]"
                        : "border-[#E7D5D9] bg-[#FDFBFC] text-[#5B4549] hover:border-[#D9A7B0]"
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
                      className="h-4 w-4 accent-[#9F3A4B]"
                    />
                    <div>
                      <span className="block text-sm font-semibold sm:text-base">
                        Xin phép vắng mặt
                      </span>
                      <span className="block text-xs opacity-75">
                        Gửi lời chúc từ xa
                      </span>
                    </div>
                  </label>
                </div>
              </fieldset>

              {/* Số lượng khách đi cùng (hiện khi chọn tham dự) */}
              {form.attendance === "attending" && (
                <div>
                  <label
                    htmlFor="rsvp-guests"
                    className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#4A3438]"
                  >
                    <Users className="h-4 w-4 text-[#C69C6D]" />
                    <span>Số lượng khách tham dự</span>
                  </label>
                  <select
                    id="rsvp-guests"
                    name="guests"
                    value={form.guests}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, guests: e.target.value }))
                    }
                    className="min-h-[50px] w-full rounded-2xl border border-[#E7D5D9] bg-[#FDFBFC] px-4 py-3 text-base text-[#352629] transition focus:border-[#9F3A4B] focus:bg-white focus:ring-2 focus:ring-[#9F3A4B]/20 focus:outline-none"
                  >
                    <option value="1">1 người (Mình tôi)</option>
                    <option value="2">2 người</option>
                    <option value="3">3 người</option>
                    <option value="4">4 người (Gia đình)</option>
                    <option value="5">5+ người</option>
                  </select>
                </div>
              )}

              {/* Lời chúc */}
              <div>
                <label
                  htmlFor="rsvp-wishes"
                  className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#4A3438]"
                >
                  <Heart className="h-4 w-4 text-[#C69C6D]" />
                  <span>Lời chúc gửi đến cô dâu &amp; chú rể</span>
                </label>
                <textarea
                  id="rsvp-wishes"
                  name="wishes"
                  rows={4}
                  placeholder="Chúc Hoàng Long & Ngọc Ánh trăm năm hạnh phúc, sớm sinh quý tử..."
                  value={form.wishes}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, wishes: e.target.value }))
                  }
                  className="w-full resize-none rounded-2xl border border-[#E7D5D9] bg-[#FDFBFC] px-4 py-3 text-base leading-relaxed text-[#352629] placeholder:text-[#B0989D] transition focus:border-[#9F3A4B] focus:bg-white focus:ring-2 focus:ring-[#9F3A4B]/20 focus:outline-none"
                />
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-[#9F3A4B] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#9F3A4B]/25 transition hover:bg-[#872E3E] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-65"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Đang gửi xác nhận...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Gửi Xác Nhận Tham Dự</span>
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
