"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CircleExpandButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function CircleExpandButton({ href, children, className }: CircleExpandButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex h-10 items-center gap-4 overflow-hidden rounded-full pl-5 pr-2.5",
        "bg-[var(--primary)] text-sm font-semibold",
        "shadow-[inset_1px_3px_2px_0px_rgba(255,255,255,0.25)]",
        "transition-shadow duration-400 ease-out hover:shadow-[inset_3px_3px_2px_0px_rgba(0,0,0,0.2)]",
        "motion-reduce:transition-colors motion-reduce:hover:bg-[var(--primary-hover)]",
        className,
      )}
    >
      <span className="relative z-[2] whitespace-nowrap text-white transition-opacity duration-400 ease-out group-hover:opacity-0 motion-reduce:group-hover:opacity-100">
        {children}
      </span>

      <span
        className={cn(
          "pointer-events-none absolute left-5 z-[2] whitespace-nowrap text-slate-900",
          "opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100",
          "motion-reduce:hidden",
        )}
        aria-hidden="true"
      >
        {children}
      </span>

      <span className="relative flex size-9 shrink-0 items-center justify-center motion-reduce:hidden">
        <span
          className={cn(
            "absolute left-1/2 top-1/2 z-[1] size-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white",
            "transition-[width,height] duration-500 ease-[cubic-bezier(0.34,1.45,0.64,1)]",
            "group-hover:size-[320px]",
            "motion-reduce:hidden",
          )}
          aria-hidden="true"
        />

        <span
          className={cn(
            "relative z-[2] flex size-9 items-center justify-center overflow-hidden rounded-full bg-white",
            "transition-colors duration-400 ease-out group-hover:bg-slate-900",
          )}
          aria-hidden="true"
        >
          <ArrowRight
            className={cn(
              "size-4 shrink-0 -rotate-45 text-[var(--primary)] transition-all duration-400 ease-out",
              "group-hover:rotate-0 group-hover:text-white",
            )}
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
      </span>
    </Link>
  );
}
