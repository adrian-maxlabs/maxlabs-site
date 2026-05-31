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
        "group relative inline-flex h-9 w-[3.25rem] shrink-0 items-center rounded-full border border-[var(--border)] bg-[var(--surface)] p-0.5 transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]",
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5">
        <Sun
          className={cn(
            "size-3.5 transition-colors",
            isDark ? "text-[var(--muted)]" : "text-amber-500",
          )}
          aria-hidden="true"
        />
        <Moon
          className={cn(
            "size-3.5 transition-colors",
            isDark ? "text-sky-300" : "text-[var(--muted)]",
          )}
          aria-hidden="true"
        />
      </span>
      <span
        className={cn(
          "relative z-[1] size-7 rounded-full bg-[var(--card)] shadow-sm ring-1 ring-[var(--border)] transition-transform duration-200",
          isDark ? "translate-x-[1.35rem]" : "translate-x-0",
          !mounted && "opacity-0",
        )}
        aria-hidden="true"
      />
      {showLabel ? (
        <span className="sr-only">{isDark ? "Dark mode on" : "Light mode on"}</span>
      ) : null}
    </button>
  );
}
