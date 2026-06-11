"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";

const FLOATING_SHAPES = [
  { size: "size-16 sm:size-20", blur: "blur-xl", color: "bg-sky-500/10", delay: "0s", x: "10%", y: "15%" },
  { size: "size-24 sm:size-28", blur: "blur-2xl", color: "bg-indigo-500/8", delay: "-3s", x: "75%", y: "10%" },
  { size: "size-12 sm:size-14", blur: "blur-lg", color: "bg-blue-400/10", delay: "-6s", x: "20%", y: "65%" },
  { size: "size-20 sm:size-24", blur: "blur-2xl", color: "bg-violet-500/6", delay: "-9s", x: "80%", y: "70%" },
  { size: "size-8 sm:size-10", blur: "blur-md", color: "bg-cyan-400/12", delay: "-4s", x: "50%", y: "25%" },
] as const;

function FloatingShape({
  className,
  delay,
  style,
}: {
  className: string;
  delay: string;
  style: React.CSSProperties;
}) {
  return (
    <span
      className={`pointer-events-none absolute rounded-full ${className} animate-cta-float motion-reduce:hidden`}
      style={{ animationDelay: delay, ...style }}
      aria-hidden="true"
    />
  );
}

export function CtaSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--footer)] motion-reduce:bg-[var(--surface)]"
      aria-label="Call to action"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {FLOATING_SHAPES.map((shape, i) => (
          <FloatingShape
            key={i}
            className={`${shape.size} ${shape.blur} ${shape.color}`}
            delay={shape.delay}
            style={{ left: shape.x, top: shape.y }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
        <div
          className={`text-center transition-all duration-700 ease-out ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          } motion-reduce:translate-y-0 motion-reduce:opacity-100`}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--footer-accent)]">
            Get Started Today
          </p>

          <h2 className="mb-4 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--footer-foreground)] sm:text-4xl lg:text-5xl">
            Ready to Build Something{" "}
            <span className="text-[var(--footer-accent)]">Great</span>?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-[var(--footer-muted)] sm:text-base">
            Let us discuss your project during a free, no-obligation consultation. Well help you
            identify the right approach and outline a clear path forward.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <CircleExpandButton href="/contact">Start Your Project</CircleExpandButton>
            <Link
              href="/contact"
              className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-[var(--footer-foreground)] transition-colors hover:bg-white/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
