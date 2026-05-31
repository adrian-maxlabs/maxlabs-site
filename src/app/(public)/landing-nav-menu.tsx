"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigateToLandingSection } from "./landing-scroll";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "/contact" },
];

function handleAnchorClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onAfterNavigate?: () => void,
) {
  if (!href.startsWith("#")) return;
  event.preventDefault();
  onAfterNavigate?.();
  navigateToLandingSection(href.slice(1));
}

function DesktopMenu() {
  return (
    <ul className="hidden items-center gap-2 lg:flex" role="list">
      {NAV_ITEMS.map((item) => (
        <li key={item.label}>
          {item.href.startsWith("#") ? (
            <a
              href={item.href}
              onClick={(event) => handleAnchorClick(event, item.href)}
              className="rounded-md px-2.5 py-1.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
            >
              {item.label}
            </a>
          ) : (
            <Link
              href={item.href}
              className="rounded-md px-2.5 py-1.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeMenu]);

  const overlay =
    open && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true">
            <button
              type="button"
              className="absolute inset-0 bg-[#0f172a]/50"
              aria-label="Close navigation menu"
              onClick={closeMenu}
            />
            <div className="absolute inset-x-0 top-0 border-b border-[var(--border)] bg-white p-4 shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--foreground)]">Navigation</p>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex size-9 items-center justify-center rounded-md border border-[var(--border)]"
                  aria-label="Close menu"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
              <ul className="space-y-1" role="list">
                {NAV_ITEMS.map((item) => (
                  <li key={`mobile-${item.label}`}>
                    {item.href.startsWith("#") ? (
                      <a
                        href={item.href}
                        onClick={(event) => handleAnchorClick(event, item.href, closeMenu)}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex size-9 items-center justify-center rounded-md border border-[var(--border)] lg:hidden"
        aria-expanded={open}
        aria-label="Open navigation menu"
      >
        <Menu className="size-4" aria-hidden="true" />
      </button>
      {overlay}
    </>
  );
}

export function LandingNavMenu({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-end lg:justify-center", className)}>
      <DesktopMenu />
      <MobileMenu />
    </div>
  );
}
