"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

type ThemeToggleProps = {
  className?: string;
  showLabel?: boolean;
};

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className={cn(
        "group relative inline-flex h-9 w-14 shrink-0 items-center rounded-full border border-[var(--border)] p-0.5",
        "bg-[var(--icon-bg)] transition-[background-color,box-shadow] duration-300 ease-out",
        isDark && "bg-[var(--accent-subtle)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]",
        "hover:shadow-[0_2px_10px_color-mix(in_srgb,var(--primary)_22%,transparent)]",
        className,
      )}
    >
      <span
        className={cn(
          "relative z-[1] flex size-7 items-center justify-center rounded-full bg-white shadow-[0_1px_4px_color-mix(in_srgb,var(--primary)_28%,transparent)] ring-1 ring-[var(--border)] dark:bg-slate-50",
          "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)]",
          "group-active:scale-95",
          isDark ? "translate-x-6" : "translate-x-0",
          !mounted && "opacity-0",
        )}
        aria-hidden="true"
      >
        <Sun
          className={cn(
            "absolute size-3.5 text-[var(--primary)] transition-all duration-300",
            isDark
              ? "scale-0 rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100",
          )}
          aria-hidden="true"
        />
        <Moon
          className={cn(
            "absolute size-3.5 text-[var(--primary)] transition-all duration-300",
            isDark
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 -rotate-90 opacity-0",
          )}
          aria-hidden="true"
        />
      </span>
      {showLabel ? (
        <span className="sr-only">{isDark ? "Dark mode on" : "Light mode on"}</span>
      ) : null}
    </button>
  );
}
