/**
 * Keeps the `dark` class in Tailwind's content scan so `:root.dark` theme
 * variables are not stripped from the production CSS bundle.
 */
export function ThemeSafelist() {
  return <span className="dark hidden" aria-hidden="true" />;
}
