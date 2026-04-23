import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-[#717680]">© 2026 OPTIMARK</p>
          <Link
            href="/privacy-policy"
            className="text-sm text-[#717680] hover:text-gray-900 transition-colors"
          >
            Kebijakan Privasi
          </Link>
        </div>
      </div>
    </footer>
  );
}
