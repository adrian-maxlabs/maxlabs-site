export const LANDING_HEADER_SCROLL_OFFSET_PX = 88;

export function scrollToLandingSection(
  id: string,
  behavior: ScrollBehavior = "smooth",
): void {
  const element = document.getElementById(id);
  if (!element) return;

  const top =
    element.getBoundingClientRect().top +
    window.scrollY -
    LANDING_HEADER_SCROLL_OFFSET_PX;

  window.scrollTo({ top: Math.max(0, top), behavior });
}

export function navigateToLandingSection(id: string): void {
  const hash = `#${id}`;
  if (window.location.hash !== hash) {
    history.pushState(null, "", hash);
  }
  requestAnimationFrame(() => scrollToLandingSection(id));
}
