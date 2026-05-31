import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_ASSETS = {
  /** Full circular lockup — footer, about, etc. */
  full: { src: "/brand/maxlabs-logo.png", width: 1742, height: 1736 },
  /** Center hexagon mark — header (transparent PNG, no white box) */
  mark: { src: "/brand/maxlabs-logo-mark.png", width: 768, height: 557 },
} as const;

export type MaxlabsLogoVariant = keyof typeof LOGO_ASSETS;

export interface MaxlabsLogoProps {
  className?: string;
  priority?: boolean;
  alt?: string;
  width?: number;
  maxHeight?: number;
  variant?: MaxlabsLogoVariant;
}

export function MaxlabsLogo({
  className,
  priority = false,
  alt,
  width,
  maxHeight,
  variant = "full",
}: MaxlabsLogoProps) {
  if (width != null && maxHeight != null) {
    throw new Error("MaxlabsLogo: pass only one of width or maxHeight");
  }

  const { src, width: fw, height: fh } = LOGO_ASSETS[variant];

  if (width != null) {
    const h = Math.round((width * fh) / fw);
    return (
      <Image
        src={src}
        alt={alt ?? "MAXLABS I.T. SOLUTIONS"}
        width={width}
        height={h}
        unoptimized
        className={cn("shrink-0 object-contain object-left", className)}
        style={{ width, height: h }}
        priority={priority}
      />
    );
  }

  const mh = maxHeight ?? 36;
  const w = Math.round((mh * fw) / fh);
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={w}
      height={mh}
      unoptimized
      className={cn("shrink-0 object-contain object-left", className)}
      style={{ width: w, height: mh }}
      priority={priority}
      aria-hidden={!alt}
    />
  );
}
