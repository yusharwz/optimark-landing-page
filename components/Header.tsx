\"use client\";

import Link from \"next/link\";
import { cn } from \"@/lib/utils\";

export function Header() {
  return (
    <header className=\"sticky top-0 z-50 border-b border-[#E9EAEB] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80\">
      <div className=\"mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8\">
        <Link href=\"/\" className=\"flex items-center gap-2\">
          <span className=\"text-xl font-bold text-[#1E280E]\">OPTIMARK</span>
        </Link>

        <nav className=\"hidden items-center gap-8 md:flex\">
          <a
            href=\"#features\"
            className=\"text-sm font-medium text-[#535862] transition-colors hover:text-[#1E280E]\"
          >
            Fitur
          </a>
          <a
            href=\"#\"
            className=\"text-sm font-medium text-[#535862] transition-colors hover:text-[#1E280E]\"
          >
            Tentang
          </a>
          <a
            href=\"#\"
            className=\"text-sm font-medium text-[#535862] transition-colors hover:text-[#1E280E]\"
          >
            Kontak
          </a>
        </nav>

        <div className=\"flex items-center gap-3 sm:gap-4\">
          <a
            href=\"#\"
            className={cn(
              \"inline-flex h-9 items-center justify-center rounded-lg px-4 text-xs font-semibold sm:h-10 sm:px-5 sm:text-sm\",
              \"bg-[#5925DC] text-white\",
              \"transition-colors hover:bg-[#4c1fc4]\",
            )}
          >
            Coba Gratis
          </a>
        </div>
      </div>
    </header>
  );
}
