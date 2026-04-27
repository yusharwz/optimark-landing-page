"use client";

import { useCallback, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

export type ScrollUpButtonProps = {
  threshold?: number;
  className?: string;
  ariaLabel?: string;
};

export function ScrollUpButton({
  threshold = 0.85,
  className,
  ariaLabel = "Scroll to top",
}: ScrollUpButtonProps) {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setVisible(latest > threshold);
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      initial={false}
      animate={visible ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 8, pointerEvents: "none" },
        visible: { opacity: 1, y: 0, pointerEvents: "auto" },
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cx("fixed bottom-6 right-6 z-60", className)}
    >
      <Button
        color="secondary"
        size="sm"
        iconLeading={ArrowUp}
        aria-label={ariaLabel}
        onClick={scrollToTop}
        className="rounded-full shadow-md"
      />
    </motion.div>
  );
}

