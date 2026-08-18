"use client";

import Image from "next/image";
import { Image as ImageIcon, Layers, Palette, Wand2 } from "lucide-react";
import { FeatureDetailLayout } from "@/components/FeatureDetailLayout";

// Real generated assets, reused from the homepage image showcase.
const SHOTS = [
  { src: "/images/image-bento/01-product-photoshoot-skincare.webp", alt: "AI product photoshoot" },
  { src: "/images/image-bento/02-product-showcase-sneaker.webp", alt: "AI product showcase" },
  { src: "/images/image-bento/05-food-beverage-campaign.webp", alt: "AI food & beverage campaign" },
  { src: "/images/image-bento/06-social-media-campaign.webp", alt: "AI social media campaign" },
];

function ImageMockup() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl sm:p-6">
      <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-3 truncate text-xs font-semibold text-gray-400">
          optimark.ai/studio/image
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {SHOTS.map((shot) => (
          <div
            key={shot.src}
            className="relative aspect-[3/2] overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(min-width: 1024px) 260px, 45vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AiImagePage() {
  return (
    <FeatureDetailLayout
      id="aiImage"
      icon={ImageIcon}
      cardIcons={[Wand2, Palette, Layers]}
      accent="fuchsia"
      mockup={<ImageMockup />}
    />
  );
}
