import Link from "next/link";

type SocialPlatform = "Facebook" | "LinkedIn" | "Instagram" | "TikTok";

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  "Facebook",
  "LinkedIn",
  "Instagram",
  "TikTok",
];

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  const className = "size-4";

  switch (platform) {
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M14 8.5h2.5l-.7 3H14v9h-3.5v-9H9v-3h1.5V7.1C10.5 5.2 11.7 4 14 4h2.5v3H15c-.8 0-1 .4-1 1.1V8.5z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M6.5 8.5H10v11H6.5V8.5zM8.25 4a2 2 0 110 4 2 2 0 010-4zM11.5 8.5H15v1.5h.05c.5-.9 1.7-1.85 3.5-1.85 3.75 0 4.45 2.45 4.45 5.65V19.5H19v-5.1c0-1.2-.02-2.75-1.7-2.75-1.7 0-2 1.3-2 2.65v5.2h-3.5V8.5z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "TikTok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M14.5 5.2c.8 1.5 2.2 2.6 3.9 2.8V11c-1.4-.05-2.7-.55-3.9-1.35v6.15c0 3.2-2.6 5.8-5.8 5.8S3 18.6 3 15.4s2.6-5.8 5.8-5.8c.35 0 .7.03 1.05.1v3.35a2.55 2.55 0 00-1.05-.22c-1.4 0-2.55 1.15-2.55 2.55S7.4 18 8.8 18s2.55-1.15 2.55-2.55V5.2h3.15z" />
        </svg>
      );
  }
}

export function FooterSocialIcons() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {SOCIAL_PLATFORMS.map((platform) => (
        <Link
          key={platform}
          href="/"
          aria-label={`${platform} (coming soon)`}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-[var(--footer-divider)] bg-[var(--footer-surface)] text-[var(--footer-muted)] transition-colors hover:border-[var(--footer-accent)]/40 hover:bg-[var(--footer-accent)]/10 hover:text-[var(--footer-accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--footer-accent)]"
        >
          <SocialIcon platform={platform} />
        </Link>
      ))}
    </div>
  );
}
