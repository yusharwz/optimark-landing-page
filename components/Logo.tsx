import Image from "next/image";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: { icon: 16, fontSize: "text-lg" },
  md: { icon: 24, fontSize: "text-2xl" },
  lg: { icon: 40, fontSize: "text-[29px]" },
};

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const config = sizeConfig[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/images/optimark-logo.svg"
        alt="Optimark"
        width={config.icon}
        height={config.icon}
        priority
      />
      {showText && (
        <span className={`font-gothic font-normal uppercase text-gray-900 ${config.fontSize}`}>
          optimark
        </span>
      )}
    </div>
  );
}
