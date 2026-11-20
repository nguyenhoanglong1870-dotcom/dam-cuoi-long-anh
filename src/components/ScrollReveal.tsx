"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: "up" | "down" | "left" | "right" | "fade";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.12,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate-x-0 translate-y-0 opacity-100 scale-100";

    switch (direction) {
      case "up":
        return "translate-y-10 opacity-0 scale-[0.98]";
      case "down":
        return "-translate-y-10 opacity-0 scale-[0.98]";
      case "left":
        return "translate-x-10 opacity-0 scale-[0.98]";
      case "right":
        return "-translate-x-10 opacity-0 scale-[0.98]";
      case "fade":
      default:
        return "opacity-0 scale-[0.97]";
    }
  };

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: "850ms",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transform transition-all ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
}
