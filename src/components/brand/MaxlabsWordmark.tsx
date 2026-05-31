import { cn } from "@/lib/utils";

export interface MaxlabsWordmarkProps {
  className?: string;
  textClassName?: string;
}

export function MaxlabsWordmark({ className, textClassName }: MaxlabsWordmarkProps) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "inline-flex items-baseline font-bold tracking-tight text-[var(--foreground)]",
          textClassName,
        )}
      >
        <span>MAX</span>
        <span
          className={cn(
            "bg-gradient-to-r from-[#1d4ed8] via-[#38bdf8] to-[#7928CA] bg-clip-text font-bold text-transparent",
            textClassName,
          )}
        >
          LABS
        </span>
      </span>
      <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/75 sm:text-[10px]">
        I.T SOLUTIONS
      </span>
    </span>
  );
}
