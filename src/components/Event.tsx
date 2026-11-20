import {
  Calendar,
  Clock,
  ExternalLink,
  HeartHandshake,
  MapPin,
  Sparkles,
} from "lucide-react";
import { WEDDING_CONFIG } from "@/config/wedding";
import ScrollReveal from "./ScrollReveal";

export default function Event() {
  const event = WEDDING_CONFIG.events[0];

  return (
    <section id="events" className="relative px-4 py-10 sm:px-6">
      <ScrollReveal delay={150} direction="up">
        <div className="mx-auto max-w-sm rounded-[28px] border border-[#DFCBB5]/80 bg-white p-2 shadow-[0_18px_45px_-20px_rgba(40,65,50,0.12)] sm:p-3">
          <article className="relative overflow-hidden rounded-[22px] border border-[#EADBCE]/80 bg-gradient-to-b from-[#FFFDFB] to-white p-5 text-center sm:p-6">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.24em] text-[#A67C43] uppercase">
              <Sparkles className="h-3 w-3 text-[#C5A059]" />
              <span>Thời Gian &amp; Địa Điểm</span>
              <Sparkles className="h-3 w-3 text-[#C5A059]" />
            </div>

            <h2 className="mt-1 font-script text-3xl font-bold text-[#2C4134] sm:text-4xl">
              Tiệc Cưới
            </h2>

            <div className="mx-auto my-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#DFCBB5] bg-[#F7FAF8] text-[#2C4134]">
              <HeartHandshake className="h-5 w-5" />
            </div>

            {/* Schedule & Venue Details */}
            <dl className="mt-4 space-y-3 text-left text-xs text-[#455A4D] sm:text-sm">
              <div className="flex items-start gap-3 rounded-xl bg-[#FAF8F5] p-3 border border-[#F0EAE1]">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A059]" />
                <div>
                  <dt className="text-[10px] font-semibold tracking-wider text-[#A67C43] uppercase">
                    Thời gian
                  </dt>
                  <dd className="font-semibold text-[#23372B]">{event.time}</dd>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-[#FAF8F5] p-3 border border-[#F0EAE1]">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A059]" />
                <div>
                  <dt className="text-[10px] font-semibold tracking-wider text-[#A67C43] uppercase">
                    Ngày tổ chức
                  </dt>
                  <dd className="font-semibold text-[#23372B]">
                    {event.dateLabel}{" "}
                    <span className="font-normal text-[#697E72]">
                      ({event.lunarDate})
                    </span>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-[#FAF8F5] p-3 border border-[#F0EAE1]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2C4134]" />
                <div>
                  <dt className="text-[10px] font-semibold tracking-wider text-[#A67C43] uppercase">
                    Địa điểm tổ chức
                  </dt>
                  <dd className="font-bold text-[#23372B] text-sm">
                    {event.venueName}
                  </dd>
                  <dd className="mt-0.5 leading-relaxed text-[#556D60]">
                    {event.address}
                  </dd>
                </div>
              </div>
            </dl>

            <p className="mt-4 rounded-xl border border-[#DCE8E0] bg-[#F4F8F5] p-3 text-[11px] leading-relaxed text-[#556D60]">
              {event.note}
            </p>

            {/* Google Maps Action Button */}
            <div className="mt-5">
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#2C4134] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#2C4134]/25 transition hover:bg-[#1E2E25] active:scale-[0.98]"
              >
                <MapPin className="h-4 w-4 text-[#DFCBB5]" />
                <span>Mở Google Maps chỉ đường</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-80" />
              </a>
            </div>
          </article>
        </div>
      </ScrollReveal>
    </section>
  );
}
