"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/base/buttons/button";

export function Header() {
  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-gray-100/50 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/optimark-logo.svg"
                alt="Optimark"
                width={32}
                height={32}
                priority
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-sm font-semibold tracking-tight text-gray-900">
                Optimark
              </span>
            </Link>

            <Button color="primary" size="sm">
              Coming soon
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
