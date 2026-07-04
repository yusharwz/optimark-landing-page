"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/base/buttons/button";
import { gsap, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CtaSection() {
  const t = useTranslations("cta");
  const containerRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const image4Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Pin + animasi image cuma di desktop (mobile pakai gambar statis)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Set initial states
        gsap.set([image1Ref.current, image3Ref.current, image4Ref.current], {
          y: 300,
          opacity: 0,
          scale: 0.8,
        });
        gsap.set(contentRef.current, { y: 50, opacity: 0 });

        // Create a timeline for the entire section with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top", // Mulai nahan pas top section nyampe top viewport (image bisa naik penuh)
            end: "+=1200", // Jarak scroll selama section ditahan sampai animasi kelar
            scrub: 1.5,
            pin: true, // Tahan scroll selama animasi jalan
            anticipatePin: 1, // Kurangi "loncat" saat mulai pin
            // markers: true, // Uncomment untuk debug
          },
        });

        // Animate images with stagger
        tl.to(image1Ref.current, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0)
          .to(image3Ref.current, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.4)
          .to(image4Ref.current, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.6)
          .to(contentRef.current, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0.8);
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative min-h-[700px] overflow-hidden bg-white py-16 lg:min-h-[1200px] lg:py-32"
      style={{
        // Dot grid dijadikan background <section> langsung (bukan child absolute
        // inset-0). Pas di-pin (position: fixed), background elemen selalu nutup
        // penuh box-nya, jadi pattern-nya konsisten & nggak "berubah jadi putih"
        // di tengah animasi. Overlay putih 95% = efek opacity-5 pada swatch.
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url('/images/hero-swatch.png')",
        backgroundRepeat: "no-repeat, repeat",
        backgroundSize: "cover, 400px 400px",
      }}
    >

      <div className="relative mx-auto hidden h-[900px] max-w-6xl lg:block">
        <div
          ref={image1Ref}
          className="absolute left-[10%] top-0 z-10 w-[884px]"
        >
          <Image
            src="/images/cta/1.svg"
            alt=""
            width={884}
            height={720}
            className="rounded-3xl shadow-2xl"
          />
        </div>

        <div
          ref={image3Ref}
          className="absolute left-[6%] top-[52px] z-30 w-[1084px]"
        >
          <Image
            src="/images/cta/3.svg"
            alt=""
            width={1084}
            height={720}
            className="rounded-3xl shadow-2xl"
          />
        </div>

        <div
          ref={image4Ref}
          className="absolute left-0 top-[150px] z-40 w-[1184px]"
        >
          <div className="relative rounded-3xl border border-[#94C748] shadow-2xl">
            <div className="absolute inset-0 rounded-3xl bg-[#94C748]/12" />
            <Image
              src="/images/cta/4.svg"
              alt=""
              width={1184}
              height={720}
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-4 block w-full max-w-xl px-4 lg:hidden">
        <div className="relative overflow-hidden rounded-3xl border border-[#94C748] bg-[#F3F9E8]">
          <Image
            src="/images/cta-figma/cta-image.png"
            alt=""
            width={1184}
            height={720}
            className="h-auto w-full"
          />
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <h2 className="text-display text-4xl sm:text-5xl lg:text-6xl">
          {t("title")}
        </h2>
        <p className="text-lead mx-auto mt-5 max-w-xl text-lg sm:text-xl">
          {t("description")}
        </p>
        <div>
          <Button href="/pricing" size="xl" className="mt-10 sm:px-10 text-white">
            {t("button")}
          </Button>
        </div>
      </div>
    </section>
  );
}
