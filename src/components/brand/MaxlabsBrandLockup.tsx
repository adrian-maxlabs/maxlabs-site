import { MaxlabsLogo } from "@/components/brand/MaxlabsLogo";
import { MaxlabsWordmark } from "@/components/brand/MaxlabsWordmark";
import { cn } from "@/lib/utils";

export interface MaxlabsBrandLockupProps {
  className?: string;
  logoMaxHeight?: number;
  priority?: boolean;
  textClassName?: string;
  logoContrastBackdrop?: boolean;
}

export function MaxlabsBrandLockup({
  className,
  logoMaxHeight = 34,
  priority = false,
  textClassName = "text-base sm:text-lg md:text-xl",
  logoContrastBackdrop = false,
}: MaxlabsBrandLockupProps) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2", className)}>
      <MaxlabsLogo
        variant="mark"
        maxHeight={logoMaxHeight}
        priority={priority}
        contrastBackdrop={logoContrastBackdrop}
      />
      <MaxlabsWordmark textClassName={textClassName} />
    </span>
  );
}
