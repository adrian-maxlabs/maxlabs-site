import { cn } from "@/lib/utils";

export interface MaxlabsWordmarkProps {
  className?: string;
  textClassName?: string;
}

export function MaxlabsWordmark({ className, textClassName }: MaxlabsWordmarkProps) {
  return (
    <span className={cn("inline-flex min-w-0 flex-col leading-none", className)}>
      <span
        className={cn(
          "inline-flex items-baseline font-bold tracking-tight text-[var(--foreground)]",
          textClassName,
        )}
      >
        <span>MAX</span>
        <span>LABS</span>
      </span>
      <span className="mt-0.5 hidden text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]/75 min-[380px]:inline sm:text-[10px] sm:tracking-[0.18em]">
        I.T SOLUTIONS
      </span>
    </span>
  );
}
