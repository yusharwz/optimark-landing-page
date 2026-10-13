import type { Metadata } from "next";
import { NotFoundView } from "@/components/NotFoundView";

export const metadata: Metadata = {
  title: "404 — Halaman Tidak Ditemukan | Optimark",
  description:
    "Halaman yang Anda tuju tidak ditemukan. Kembali ke beranda Optimark untuk menjelajahi platform otomasi konten dan pemasaran AI terdepan.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundPage() {
  return <NotFoundView />;
}
