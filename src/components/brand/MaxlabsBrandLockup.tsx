import { MaxlabsLogo } from "@/components/brand/MaxlabsLogo";
import { MaxlabsWordmark } from "@/components/brand/MaxlabsWordmark";
import { cn } from "@/lib/utils";

export interface MaxlabsBrandLockupProps {
  className?: string;
  logoMaxHeight?: number;
  priority?: boolean;
  textClassName?: string;
}

export function MaxlabsBrandLockup({
  className,
  logoMaxHeight = 34,
  priority = false,
  textClassName = "text-lg sm:text-xl",
}: MaxlabsBrandLockupProps) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2", className)}>
      <MaxlabsLogo variant="mark" maxHeight={logoMaxHeight} priority={priority} />
      <MaxlabsWordmark textClassName={textClassName} />
    </span>
  );
}
