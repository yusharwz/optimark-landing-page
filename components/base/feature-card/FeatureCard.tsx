import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cx } from "@/utils/cx";
import { FeatureBadge } from "./FeatureBadge";
import { featureCardHover } from "@/lib/animations";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  coverImage?: string;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  coverImage,
  className,
}: FeatureCardProps) {
  return (
    <motion.article
      className={cx(
        "h-full overflow-hidden rounded-[24px] border border-[#94C748] bg-[rgba(148,199,72,0.12)] p-2",
        className,
      )}
      {...featureCardHover}
    >
      <div className="flex h-full flex-1 overflow-hidden rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
        <div className="flex flex-3 flex-col justify-center gap-8 p-6">
          <div className="flex flex-col gap-2">
            <div
              className={cx(
                "flex h-fit w-fit items-center gap-2 rounded-full bg-[#94C748] p-3",
                "shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]",
              )}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>

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

        <div
          className={cx(
            "flex flex-1 items-center justify-center rounded-r-[12px]",
            coverImage
              ? "bg-[#FDFDFD]"
              : "flex-col gap-2 bg-[#F5F5F5] px-11 py-12",
          )}
        >
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              width={179}
              height={183}
              className="h-full w-auto"
            />
          ) : (
            <>
              <div
                className={cx(
                  "flex h-16 w-16 items-center justify-center rounded-full bg-[#FDFDFD] p-5",
                  "shadow-[0px_0.8px_1.6px_0px_rgba(10,13,18,0.05),inset_0px_0px_0px_0.8px_rgba(10,13,18,0.18),inset_0px_-1.6px_0px_0px_rgba(10,13,18,0.05)]",
                )}
              >
                <Icon className="h-8 w-8 text-[#D5D7DA]" />
              </div>

              {badge ? <FeatureBadge>{badge}</FeatureBadge> : null}
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}
