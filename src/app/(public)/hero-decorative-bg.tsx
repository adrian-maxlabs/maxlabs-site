"use client";

export function HeroDecorativeBg() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 size-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      <div className="hero-orb hero-orb-1 absolute left-[8%] top-[18%] size-64 rounded-full bg-[#1d4ed8]/20 blur-3xl" />
      <div className="hero-orb hero-orb-2 absolute right-[12%] top-[35%] size-72 rounded-full bg-[#38bdf8]/15 blur-3xl" />
      <div className="hero-orb hero-orb-3 absolute bottom-[20%] left-[35%] size-56 rounded-full bg-[#4ade80]/10 blur-3xl" />

      <svg
        className="absolute bottom-0 left-0 w-full opacity-20"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C240,100 480,20 720,50 C960,80 1200,30 1440,70 L1440,120 L0,120 Z"
          fill="url(#hero-wave)"
        />
        <defs>
          <linearGradient id="hero-wave" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
