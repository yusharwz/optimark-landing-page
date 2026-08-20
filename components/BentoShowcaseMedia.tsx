"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Full-bleed media for the AI Image / AI Video bento cards. Both fill their
 * card edge to edge and sit behind the card's scrim, so they are decorative:
 * no alt text, no pointer events.
 */

// Real generated assets, the same ones the image showcase section uses.
const SHOTS = [
  "/images/image-bento/01-product-photoshoot-skincare.webp",
  "/images/image-bento/02-product-showcase-sneaker.webp",
  "/images/image-bento/05-food-beverage-campaign.webp",
  "/images/image-bento/06-social-media-campaign.webp",
];

export function AiImageShowcase() {
  return (
    <div aria-hidden className="grid h-full w-full grid-cols-2 grid-rows-2">
      {SHOTS.map((src) => (
        <div key={src} className="relative overflow-hidden">
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export function AiVideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only run the clip while the card is on screen — a homepage that autoplays
  // video the visitor never scrolls to burns their data for nothing.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            // Autoplay can still be refused (low power mode); the poster frame
            // is a fine fallback.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden
      className="h-full w-full object-cover"
      src="/videos/01-product-reveal.mp4"
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
