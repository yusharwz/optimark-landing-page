import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FeatureBadge } from "./FeatureBadge";
import { featureCardHover } from "@/lib/animations";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  comingSoon?: boolean;
  coverImage?: string;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  comingSoon = false,
  coverImage,
  className,
}: FeatureCardProps) {
  return (
    <motion.article
      className={cn(
        "overflow-hidden rounded-[24px] p-2 h-full",
        "bg-[rgba(148,199,72,0.12)]",
        "border border-[#94C748]",
        className,
      )}
      {...featureCardHover}
    >
      {/* Inner white card */}
      <div className="flex flex-[1] overflow-hidden rounded-[16px] bg-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] border border-[rgba(0,0,0,0.08)] h-full">
        {/* Main Content Area */}
        <div className="flex flex-[3] flex-col justify-center gap-8 p-6">
          {/* Icon + Text */}
          <div className="flex flex-col gap-2">
            {/* Icon Container */}
            <div
              className={cn(
                "flex h-fit w-fit items-center gap-2 rounded-full p-3",
                "bg-[#94C748]",
                "shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]",
              )}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-1">
              <h3 className="text-[20px] font-semibold leading-[1.5em] text-[#1E280E]">
                {title}
              </h3>
              <p className="text-[16px] font-normal leading-[1.5em] text-[#717680]">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Cover Section */}
        <div
          className={cn(
            "flex flex-[1] items-center justify-center",
            "rounded-r-[12px]",
            coverImage ? "bg-[#FDFDFD]" : "flex-col gap-2 bg-[#F5F5F5] px-11 py-12",
          )}
        >
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="h-full w-auto"
            />
          ) : (
            <>
              {/* Icon Container in Cover */}
              <div
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-full p-5",
                  "bg-[#FDFDFD]",
                  "shadow-[0px_0.8px_1.6px_0px_rgba(10,13,18,0.05),inset_0px_0px_0px_0.8px_rgba(10,13,18,0.18),inset_0px_-1.6px_0px_0px_rgba(10,13,18,0.05)]",
                )}
              >
                <Icon className="h-8 w-8 text-[#D5D7DA]" />
              </div>

              {/* Badge */}
              {badge || comingSoon ? (
                <FeatureBadge>{badge || "Coming soon"}</FeatureBadge>
              ) : null}
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}
