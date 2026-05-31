"use client";

import { useEffect } from "react";
import { LANDING_HEADER_SCROLL_OFFSET_PX, navigateToLandingSection } from "./landing-scroll";

export function LandingHashSync() {
  useEffect(() => {
    const html = document.documentElement;
    const previousPadding = html.style.scrollPaddingTop;
    html.style.scrollPaddingTop = `${LANDING_HEADER_SCROLL_OFFSET_PX}px`;

    const current = window.location.hash.replace(/^#/, "");
    if (current) navigateToLandingSection(current);

    const onHashChange = () => {
      const next = window.location.hash.replace(/^#/, "");
      if (next) navigateToLandingSection(next);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => {
      html.style.scrollPaddingTop = previousPadding;
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
