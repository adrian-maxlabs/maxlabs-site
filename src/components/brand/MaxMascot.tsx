import { useId } from "react";
import { cn } from "@/lib/utils";

type MaxMascotProps = {
  className?: string;
  /** Render size in pixels (square). */
  size?: number;
  /** Show a soft glow behind the mascot — useful on the FAB. */
  glow?: boolean;
};

/**
 * MAX — MAXLABS company mascot. Friendly robotic face using brand blue → sky → purple.
 */
export function MaxMascot({ className, size = 36, glow = false }: MaxMascotProps) {
  const gradientId = useId().replace(/:/g, "");
  const glowId = `${gradientId}-glow`;

  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {glow && (
        <span
          className="absolute inset-0 rounded-full bg-sky-400/35 blur-md"
          aria-hidden="true"
        />
      )}
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        className="relative"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="8" y1="10" x2="40" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="45%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#7928CA" />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Antenna */}
        <line x1="24" y1="8" x2="24" y2="13" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="6" r="2.75" fill="#38bdf8" filter={`url(#${glowId})`} />

        {/* Side bolts */}
        <rect x="5" y="22" width="4" height="8" rx="2" fill="#1d4ed8" />
        <rect x="39" y="22" width="4" height="8" rx="2" fill="#7928CA" />

        {/* Head shell */}
        <rect x="9" y="13" width="30" height="28" rx="9" fill={`url(#${gradientId})`} />
        <rect
          x="10.5"
          y="14.5"
          width="27"
          height="25"
          rx="7.5"
          stroke="white"
          strokeOpacity="0.22"
          strokeWidth="1"
        />

        {/* Face screen */}
        <rect x="14" y="19" width="20" height="17" rx="5" fill="#0f172a" fillOpacity="0.92" />

        {/* Eyes */}
        <circle cx="19.5" cy="26" r="2.6" fill="#38bdf8" filter={`url(#${glowId})`} />
        <circle cx="28.5" cy="26" r="2.6" fill="#38bdf8" filter={`url(#${glowId})`} />
        <circle cx="20.2" cy="25.2" r="0.9" fill="white" fillOpacity="0.85" />
        <circle cx="29.2" cy="25.2" r="0.9" fill="white" fillOpacity="0.85" />

        {/* Smiley mouth */}
        <path
          d="M18.5 31.5C20.8 34.2 27.2 34.2 29.5 31.5"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Cheek accents */}
        <circle cx="16" cy="30" r="1.1" fill="#7928CA" fillOpacity="0.55" />
        <circle cx="32" cy="30" r="1.1" fill="#7928CA" fillOpacity="0.55" />
      </svg>
    </span>
  );
}
