import {
  Calendar,
  Clock,
  ExternalLink,
  HeartHandshake,
  MapPin,
  Sparkles,
} from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";

export default function Event() {
  const isSingleEvent = WEDDING_CONFIG.events.length === 1;

  return (
    <section
      id="events"
      className="relative bg-gradient-to-b from-[#FDFBF7] via-[#FCEEF0]/45 to-[#FDFBF7] px-4 py-16 sm:px-6 md:py-22"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-[#B88B58] uppercase">
            <Sparkles className="h-4 w-4 text-[#C69C6D]" />
            <span>Thông Tin Sự Kiện</span>
          </div>
          <h2 className="mt-2 font-script text-4xl font-bold text-[#9F3A4B] sm:text-5xl">
            Thời Gian &amp; Địa Điểm
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#6E5459] sm:text-base">
            Kính mời quý vị đến chung vui và chứng kiến khoảnh khắc thiêng liêng
            của chúng tôi tại Đông Anh, Hà Nội.
          </p>
        </div>

        {/* Event Card(s) — Centered elegantly when single event */}
        <div
          className={`mt-10 ${
            isSingleEvent
              ? "mx-auto max-w-2xl"
              : "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
          }`}
        >
          {WEDDING_CONFIG.events.map((event, index) => (
            <div
              key={event.id}
              className="rounded-[28px] border border-[#C69C6D]/40 bg-white p-2 shadow-[0_22px_55px_-24px_rgba(159,58,75,0.22)] sm:p-3"
            >
              <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] border border-[#F0E1D4] bg-gradient-to-b from-[#FFFDF9] to-white p-6 sm:p-8">
                {/* Top ornamental accent bar */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#E6B8C0] via-[#9F3A4B] to-[#C69C6D]"
                />

                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 border-b border-[#F3E3E6] pb-5">
                    <div>
                      <span className="inline-block rounded-full bg-[#FCEEF0] px-3.5 py-1 text-xs font-semibold tracking-[0.16em] text-[#9F3A4B] uppercase">
                        {isSingleEvent
                          ? event.subtitle
                          : `Sự kiện 0${index + 1} • ${event.subtitle}`}
                      </span>
                      <h3 className="mt-3 font-serif text-3xl font-bold text-[#352629] sm:text-4xl">
                        {event.title}
                      </h3>
                    </div>
                    <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-[#EBD8C3] bg-[#FFF8F9] text-[#9F3A4B]">
                      <HeartHandshake className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Schedule & Venue Details */}
                  <dl className="mt-6 space-y-4 text-sm text-[#4D3B3F] sm:text-base">
                    <div className="flex items-start gap-3.5">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#C69C6D]" />
                      <div>
                        <dt className="text-xs font-medium tracking-wider text-[#8F6F75] uppercase">
                          Thời gian
                        </dt>
                        <dd className="font-semibold text-[#352629]">
                          {event.time}
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[#C69C6D]" />
                      <div>
                        <dt className="text-xs font-medium tracking-wider text-[#8F6F75] uppercase">
                          Ngày tổ chức
                        </dt>
                        <dd className="font-semibold text-[#352629]">
                          {event.dateLabel}{" "}
                          <span className="font-normal text-[#7A5B61]">
                            ({event.lunarDate})
                          </span>
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#9F3A4B]" />
                      <div>
                        <dt className="text-xs font-medium tracking-wider text-[#8F6F75] uppercase">
                          Địa điểm tổ chức
                        </dt>
                        <dd className="text-base font-bold text-[#352629] sm:text-lg">
                          {event.venueName}
                        </dd>
                        <dd className="mt-0.5 leading-relaxed text-[#6A5358]">
                          {event.address}
                        </dd>
                      </div>
                    </div>
                  </dl>

                  {/* Note */}
                  <p className="mt-6 rounded-2xl border border-[#F3E5E8] bg-[#FDF8F9] p-4 text-xs leading-relaxed text-[#7A5B61] sm:text-sm">
                    {event.note}
                  </p>
                </div>

                {/* Google Maps Action Button (Mobile-first large touch target) */}
                <div className="mt-6 pt-2">
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#9F3A4B] px-5 py-3 text-base font-semibold text-white shadow-md shadow-[#9F3A4B]/20 transition hover:bg-[#872E3E] active:scale-[0.98]"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>Mở Google Maps</span>
                    <ExternalLink className="h-4 w-4 opacity-85" />
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
