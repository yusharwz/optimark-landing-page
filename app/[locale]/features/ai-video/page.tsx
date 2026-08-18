"use client";

import { Clapperboard, Film, Sparkles, Video } from "lucide-react";
import { FeatureDetailLayout } from "@/components/FeatureDetailLayout";

function VideoMockup() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl sm:p-6">
      <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-3 truncate text-xs font-semibold text-gray-400">
          optimark.ai/studio/video
        </span>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-gray-100 bg-black">
        {/* Muted + inline so it can autoplay on mobile without a user gesture. */}
        <video
          className="aspect-video w-full object-cover"
          src="/videos/01-product-reveal.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}

export default function AiVideoPage() {
  return (
    <FeatureDetailLayout
      id="aiVideo"
      icon={Video}
      cardIcons={[Sparkles, Clapperboard, Film]}
      accent="indigo"
      mockup={<VideoMockup />}
    />
  );
}
