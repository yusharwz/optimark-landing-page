import Image from "next/image";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  /** Render the wordmark in white — for use over dark backgrounds. */
  inverted?: boolean;
}

/**
 * `icon` is the intrinsic size handed to next/image; `iconClass` / `fontSize`
 * are what actually render. The `lg` header mark steps down on small phones
 * (320px-wide viewports like the iPhone SE) — at full size the wordmark alone
 * ate more than half the bar and pushed the language switcher off-screen.
 */
const sizeConfig = {
  sm: { icon: 16, iconClass: "h-4 w-4", fontSize: "text-lg" },
  md: { icon: 24, iconClass: "h-6 w-6", fontSize: "text-2xl" },
  lg: { icon: 40, iconClass: "h-7 w-7 sm:h-10 sm:w-10", fontSize: "text-xl sm:text-[29px]" },
};

export function Logo({ className = "", showText = true, size = "md", inverted = false }: LogoProps) {
  const config = sizeConfig[size];

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 ${className}`}>
      <Image
        src="/images/optimark-logo.svg"
        alt="Optimark"
        width={config.icon}
        height={config.icon}
        className={`shrink-0 ${config.iconClass}`}
        priority
      />
      {showText && (
        <span
          className={`font-gothic font-normal uppercase transition-colors ${
            inverted ? "text-white" : "text-gray-900"
          } ${config.fontSize}`}
        >
          optimark
        </span>
      )}
    </div>
  );
}
