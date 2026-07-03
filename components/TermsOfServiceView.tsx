"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/base/buttons/button";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import { Header } from "@/components/Header";
import { TermsOfServiceContent } from "@/components/TermsOfServiceContent";
import { ScrollUpButton } from "@/components/ScrollUpButton";
import { SCROLL_UP_THRESHOLD } from "@/config/site";
import { useRouter } from "@/i18n/navigation";
import { heroButton, staggerContainer, staggerItem } from "@/lib/animations";

export function TermsOfServiceView() {
  const t = useTranslations("terms");
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <>
      <Header />
      <section
        ref={containerRef}
        onMouseMove={onMouseMove}
        className="relative min-h-screen overflow-hidden bg-white"
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ y }}
          aria-hidden
        >
          <InteractiveDotGrid
            className="absolute inset-0 h-full w-full"
            mousePosition={mousePos}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 lg:px-8"
        >
          <motion.div variants={staggerItem} className="space-y-8">
            <div>
              <motion.div variants={heroButton} initial="hidden" animate="visible">
                <Button
                  color="secondary"
                  size="sm"
                  iconLeading={ArrowLeft}
                  onClick={() => router.push("/")}
                >
                  {t("back")}
                </Button>
              </motion.div>

              <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-[#1E280E] sm:text-4xl">
                {t("title")}
              </h1>
              <p className="mt-2 text-sm text-[#535862]">{t("lastUpdated")}</p>
            </div>

            <TermsOfServiceContent />
          </motion.div>
        </motion.div>
      </section>
      <ScrollUpButton threshold={SCROLL_UP_THRESHOLD} />
    </>
  );
}
