"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/base/buttons/button";
import { fadeInUp, staggerContainer, staggerItem, heroButton } from "@/lib/animations";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import { useCallback, useRef, useState } from "react";

export default function PrivacyPolicyPage() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-white overflow-hidden"
    >
      {/* Interactive dot grid background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
        aria-hidden
      >
        <InteractiveDotGrid
          className="absolute inset-0 w-full h-full"
          mousePosition={mousePos}
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <motion.div variants={staggerItem} className="space-y-8">
          <div>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-[#1E280E] sm:text-4xl">
              KEBIJAKAN PRIVASI OPTIMARK
            </h1>
            <p className="mt-2 text-sm text-[#535862]">
              Terakhir diperbarui: 23 April 2026
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1E280E]">1. Pendahuluan</h2>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Selamat datang di Optimark ("Kami", "Kita", atau "Optimark").
            Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan,
            menyimpan, dan melindungi informasi pribadi Anda saat menggunakan platform
            digital marketing all-in-one kami, termasuk situs web, aplikasi, dan layanan
            terkait (secara bersama-sama disebut "Layanan").
          </p>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Dengan mengakses atau menggunakan Layanan kami, Anda menyetujui praktik yang
            dijelaskan dalam Kebijakan Privasi ini. Jika Anda tidak menyetujui kebijakan
            ini, mohon untuk tidak menggunakan Layanan kami.
          </p>

          <h2 className="text-2xl font-semibold text-[#1E280E]">2. Pengontrol Data</h2>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">Pengontrol data untuk informasi pribadi Anda adalah:</p>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <ol className="pl-6">
              <li>- PT Usaha Kreatif Indonesia</li>
              <li>- Alamat: alamat perusahaan - menyusul</li>
              <li>- Email: admin@usahakreatif.co.id</li>
              <li>- Telepon: nomor telepon - menyusul</li>
            </ol>
          </ul>

          <h2 className="text-2xl font-semibold text-[#1E280E]">3. Informasi yang Kami Kumpulkan</h2>

          <h3 className="text-xl font-semibold text-[#1E280E]">3.1 Informasi yang Anda Berikan Secara Langsung</h3>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0 space-y-2">
            <li>
              <strong className="text-base font-semibold text-[#1E280E]">Informasi Akun:</strong> Nama lengkap, alamat email, nomor telepon, nama perusahaan, dan kata sandi saat Anda mendaftar akun.
            </li>
            <li>
              <strong className="text-base font-semibold text-[#1E280E]">Informasi Profil:</strong> Foto profil, jabatan, dan informasi bisnis yang Anda tambahkan ke profil Anda.
            </li>
            <li>
              <strong className="text-base font-semibold text-[#1E280E]">Informasi Pembayaran:</strong> Data yang diperlukan untuk memproses pembayaran, termasuk informasi tagihan. Kami tidak menyimpan data kartu kredit secara langsung; pemrosesan pembayaran dilakukan melalui penyedia layanan pembayaran pihak ketiga yang aman.
            </li>
            <li>
              <strong className="text-base font-semibold text-[#1E280E]">Konten dan Data Pemasaran:</strong> Konten yang Anda buat, jadwal postingan, data kampanye iklan, hasil analisis SEO, dan konten yang dihasilkan oleh fitur AI Content Maker.
            </li>
            <li>
              <strong className="text-base font-semibold text-[#1E280E]">Komunikasi:</strong> Pesan, umpan balik, dan korespondensi yang Anda kirimkan kepada kami melalui formulir kontak, email, atau fitur dukungan pelanggan.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E280E]">3.2 Informasi yang Dikumpulkan Secara Otomatis</h3>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>
              <strong>Data Penggunaan:</strong> Informasi tentang bagaimana Anda menggunakan
              Layanan, termasuk halaman yang dikunjungi, fitur yang digunakan, waktu akses,
              durasi penggunaan, dan frekuensi penggunaan.
            </li>
            <li>
              <strong>Data Perangkat dan Teknis:</strong> Jenis perangkat, sistem operasi,
              jenis browser, alamat IP, pengidentifikasi perangkat unik, resolusi layar,
              dan bahasa browser.
            </li>
            <li>
              <strong>Cookie dan Teknologi Pelacakan:</strong> Kami menggunakan cookie, web
              beacon, dan teknologi serupa untuk mengumpulkan informasi tentang aktivitas
              browsing Anda. Lihat Bagian 6 untuk informasi lebih lanjut.
            </li>
            <li>
              <strong>Data Analitik:</strong> Metrik kinerja konten, data interaksi pengguna,
              dan statistik terkait kampanye pemasaran Anda.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E280E]">3.3 Informasi dari Pihak Ketiga</h3>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>
              <strong>Akun Media Sosial dan Platform E-Commerce:</strong> Saat Anda
              menghubungkan akun Instagram, Facebook, TikTok, Threads, Blibli, Shopee,
              atau TikTok Shop ke Layanan kami, kami menerima informasi dari platform
              tersebut sesuai dengan izin yang Anda berikan, termasuk:
              <ol className="pl-6">
                <li>- Informasi profil akun</li>
                <li>- Metrik dan analitik postingan</li>
                <li>- Data performa kampanye iklan</li>
                <li>- Data interaksi audiens</li>
              </ol>
            </li>
            <li>
              <strong>Penyedia Layanan Login Sosial:</strong> Jika Anda memilih untuk
              mendaftar atau masuk menggunakan akun media sosial pihak ketiga, kami
              menerima informasi dasar profil dari penyedia tersebut.
            </li>
            <li>
              <strong>Mitra Bisnis:</strong> Informasi yang dibagikan oleh mitra bisnis
              kami untuk tujuan peningkatan layanan.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#1E280E]">4. Tujuan Penggunaan Informasi</h2>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">Kami menggunakan informasi pribadi Anda untuk tujuan berikut:</p>

          <h3 className="text-xl font-semibold text-[#1E280E]">4.1 Menyediakan dan Meningkatkan Layanan</h3>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>Menyediakan, mengoperasikan, dan memelihara Layanan</li>
            <li>Membuat dan mengelola akun Anda</li>
            <li>Memproses pembayaran dan transaksi</li>
            <li>
              Menghubungkan dan menyinkronkan data dari platform media sosial dan
              e-commerce yang terhubung
            </li>
            <li>
              Menyediakan fitur Perencana Konten, SEO Analyzer, Ads Manager, dan AI
              Content Maker
            </li>
            <li>
              Mengirim notifikasi terkait Layanan, termasuk pembaruan jadwal konten dan
              laporan kampanye
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E280E]">4.2 Personalisasi dan Pengembangan</h3>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>Mempersonalisasi pengalaman pengguna Anda</li>
            <li>Mengembangkan fitur dan layanan baru</li>
            <li>
              Melakukan analisis tren dan pola penggunaan untuk peningkatan Layanan
            </li>
            <li>Mengoptimalkan kinerja dan keamanan platform</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E280E]">4.3 Komunikasi</h3>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>
              Mengirimkan informasi teknis, pembaruan, dan pemberitahuan terkait Layanan
            </li>
            <li>Menanggapi pertanyaan, permintaan dukungan, dan umpan balik</li>
            <li>Mengirimkan informasi promosi dan penawaran khusus (dengan persetujuan Anda)</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E280E]">4.4 Keamanan dan Kepatuhan</h3>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>
              Mendeteksi, mencegah, dan mengatasi aktivitas penipuan, penyalahgunaan,
              atau pelanggaran keamanan
            </li>
            <li>Mematuhi kewajiban hukum dan peraturan yang berlaku</li>
            <li>Menegakkan perjanjian dan ketentuan kami</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#1E280E]">5. Dasar Hukum Pemrosesan Data</h2>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">Kami memproses data pribadi Anda berdasarkan dasar hukum berikut:</p>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>
              <strong>Persetujuan:</strong> Ketika Anda memberikan persetujuan secara
              eksplisit untuk pemrosesan data tertentu, seperti pemasaran langsung atau
              penggunaan cookie non-esensial.
            </li>
            <li>
              <strong>Pelaksanaan Kontrak:</strong> Ketika pemrosesan diperlukan untuk
              memenuhi kontrak dengan Anda, termasuk penyediaan Layanan yang Anda minta.
            </li>
            <li>
              <strong>Kepentingan yang Sah:</strong> Ketika pemrosesan diperlukan untuk
              tujuan yang sah, seperti keamanan, pencegahan penipuan, dan peningkatan
              Layanan.
            </li>
            <li>
              <strong>Kewajiban Hukum:</strong> Ketika pemrosesan diperlukan untuk mematuhi
              hukum dan peraturan yang berlaku.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#1E280E]">6. Cookie dan Teknologi Pelacakan</h2>

          <h3 className="text-xl font-semibold text-[#1E280E]">6.1 Jenis Cookie yang Kami Gunakan</h3>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">a) <strong>Cookie Esensial</strong></p>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0 mb-0">
            <li>Tujuan: Diperlukan untuk fungsi dasar Layanan</li>
            <li>Contoh: Otentikasi sesi, preferensi keamanan</li>
          </ul>

          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">b) <strong>Cookie Fungsional</strong></p>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0 mb-0">
            <li>Tujuan: Mengingat pilihan dan preferensi Anda</li>
            <li>Contoh: Bahasa, pengaturan tampilan</li>
          </ul>

          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">c) <strong>Cookie Analitik</strong></p>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0 mb-0">
            <li>Tujuan: Membantu kami memahami penggunaan Layanan</li>
            <li>Contoh: Google Analytics, data penggunaan fitur</li>
          </ul>

          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">d) <strong>Cookie Pemasaran</strong></p>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>Tujuan: Digunakan untuk menampilkan iklan yang relevan</li>
            <li>Contoh: Piksel pelacakan konversi, retargeting</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E280E]">6.2 Pengelolaan Cookie</h3>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Anda dapat mengelola preferensi cookie Anda melalui pengaturan browser Anda.
            Perlu diperhatikan bahwa menonaktifkan cookie tertentu dapat memengaruhi
            fungsionalitas Layanan.
          </p>

          <h2 className="text-2xl font-semibold text-[#1E280E]">7. Berbagi dan Pengungkapan Informasi</h2>

          <h3 className="text-xl font-semibold text-[#1E280E]">7.1 Kami Dapat Membagikan Informasi Anda Kepada:</h3>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>
              <strong>Penyedia Layanan Pihak Ketiga:</strong> Perusahaan yang membantu
              kami menyediakan Layanan, termasuk hosting, pemrosesan pembayaran, analitik,
              dukungan pelanggan, dan pengiriman email. Penyedia layanan ini terikat oleh
              perjanjian kerahasiaan dan hanya dapat menggunakan data sesuai instruksi kami.
            </li>
            <li>
              <strong>Platform Terhubung:</strong> Instagram, Facebook, TikTok, Threads,
              Blibli, Shopee, dan TikTok Shop sesuai dengan yang diperlukan untuk
              menyediakan fitur integrasi.
            </li>
            <li>
              <strong>Kewajiban Hukum:</strong> Jika diwajibkan oleh hukum, proses hukum,
              permintaan pemerintah, atau peraturan yang berlaku.
            </li>
            <li>
              <strong>Transaksi Korporasi:</strong> Dalam konteks merger, akuisisi, penjualan
              aset, atau transfer bisnis, informasi Anda dapat dialihkan kepada pihak yang
              terkait.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E280E]">7.2 Kami Tidak Akan:</h3>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>Menjual informasi pribadi Anda kepada pihak ketiga</li>
            <li>
              Membagikan informasi pribadi Anda untuk tujuan pemasaran pihak ketiga tanpa
              persetujuan Anda
            </li>
            <li>
              Menggunakan informasi Anda dengan cara yang bertentangan dengan Kebijakan
              Privasi ini
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#1E280E]">8. Penyimpanan dan Keamanan Data</h2>

          <h3 className="text-xl font-semibold text-[#1E280E]">8.1 Penyimpanan Data</h3>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Kami menyimpan informasi pribadi Anda selama diperlukan untuk memenuhi
            tujuan yang dijelaskan dalam Kebijakan Privasi ini, atau selama diwajibkan
            oleh hukum. Kriteria yang kami gunakan untuk menentukan periode penyimpanan
            meliputi:
          </p>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>Durasi hubungan bisnis kami dengan Anda</li>
            <li>Apakah ada kewajiban hukum yang mengharuskan penyimpanan data</li>
            <li>
              Apakah penyimpanan diperlukan untuk penyelesaian sengketa atau penegakan
              perjanjian
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E280E]">8.2 Keamanan Data</h3>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar
            untuk melindungi informasi pribadi Anda, termasuk:
          </p>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>Enkripsi data saat transit (SSL/TLS) dan saat disimpan</li>
            <li>
              Pembatasan akses terhadap data pribadi hanya kepada karyawan yang membutuhkan
            </li>
            <li>Pemantauan keamanan secara berkala</li>
            <li>Cadangan data (backup) secara teratur</li>
            <li>Pelatihan keamanan untuk staf yang menangani data pribadi</li>
          </ul>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Meskipun demikian, tidak ada metode transmisi atau penyimpanan elektronik yang
            sepenuhnya aman. Kami tidak dapat menjamin keamanan mutlak dari data Anda.
          </p>

          <h2 className="text-2xl font-semibold text-[#1E280E]">9. Hak-Hak Anda</h2>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">Sebagai pengguna, Anda memiliki hak-hak berikut terkait data pribadi Anda:</p>

          <h3 className="text-xl font-semibold text-[#1E280E]">9.1 Hak Akses</h3>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Anda berhak meminta salinan informasi pribadi yang kami simpan tentang Anda.
          </p>

          <h3 className="text-xl font-semibold text-[#1E280E]">9.2 Hak Koreksi</h3>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Anda berhak meminta perbaikan atas informasi pribadi yang tidak akurat atau
            tidak lengkap.
          </p>

          <h3 className="text-xl font-semibold text-[#1E280E]">9.3 Hak Penghapusan</h3>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Anda berhak meminta penghapusan informasi pribadi Anda, dengan tunduk pada
            kewajiban hukum yang mengharuskan kami menyimpan data tertentu.
          </p>

          <h3 className="text-xl font-semibold text-[#1E280E]">9.4 Hak Pembatasan Pemrosesan</h3>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Anda berhak meminta pembatasan pemrosesan informasi pribadi Anda dalam keadaan
            tertentu.
          </p>

          <h3 className="text-xl font-semibold text-[#1E280E]">9.5 Hak Portabilitas Data</h3>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Anda berhak menerima informasi pribadi Anda dalam format yang terstruktur,
            umum digunakan, dan dapat dibaca mesin.
          </p>

          <h3 className="text-xl font-semibold text-[#1E280E]">9.6 Hak Keberatan</h3>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Anda berhak menolak pemrosesan informasi pribadi Anda untuk tujuan tertentu,
            termasuk pemasaran langsung.
          </p>

          <h3 className="text-xl font-semibold text-[#1E280E]">9.7 Hak Terkait Keputusan Otomatis</h3>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Anda berhak tidak menjadi subjek keputusan yang sepenuhnya otomatis, termasuk
            pembuatan profil, yang menghasilkan efek hukum atau serupa yang signifikan bagi
            Anda.
          </p>

          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Untuk menggunakan hak-hak tersebut, silakan hubungi kami di{" "}
            <a href="mailto:admin@usahakreatif.co.id" className="text-[#535862] underline">
              admin@usahakreatif.co.id
            </a>
            . Kami akan merespons permintaan Anda dalam waktu paling lambat 30 hari kerja.
          </p>

          <h2 className="text-2xl font-semibold text-[#1E280E]">10. Penanganan Data AI Content Maker</h2>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Fitur AI Content Maker kami memproses konten dan instruksi yang Anda berikan
            untuk menghasilkan konten pemasaran. Ketentuan berikut berlaku:
          </p>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>
              Input yang Anda berikan ke fitur AI digunakan semata-mata untuk menghasilkan
              output yang Anda minta
            </li>
            <li>
              Kami dapat menggunakan data penggunaan secara agregat dan anonim untuk
              meningkatkan kualitas model AI kami
            </li>
            <li>
              Kami tidak menggunakan output yang dihasilkan AI untuk melatih model yang
              dibagikan kepada pihak ketiga tanpa persetujuan Anda
            </li>
            <li>
              Anda bertanggung jawab untuk memastikan konten yang Anda buat menggunakan
              fitur AI mematuhi hukum yang berlaku dan tidak melanggar hak pihak ketiga
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#1E280E]">11. Transfer Data Internasional</h2>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Informasi pribadi Anda mungkin ditransfer ke dan diproses di negara selain
            negara tempat tinggal Anda. Kami memastikan bahwa transfer data internasional
            dilakukan dengan perlindungan yang memadai, termasuk:
          </p>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>
              Penggunaan klausul kontrak standar yang disetujui oleh otoritas yang berwenang
            </li>
            <li>
              Pemastian bahwa penerima data memiliki tingkat perlindungan data yang memadai
            </li>
            <li>
              Kepatuhan terhadap peraturan perlindungan data yang berlaku di yurisdiksi
              terkait
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#1E280E]">12. Tautan ke Situs Pihak Ketiga</h2>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Layanan kami mungkin berisi tautan ke situs web atau layanan pihak ketiga yang
            tidak dioperasikan oleh kami. Kami tidak bertanggung jawab atas praktik privasi
            situs web pihak ketiga tersebut. Kami menyarankan Anda untuk membaca kebijakan
            privasi setiap situs yang Anda kunjungi.
          </p>

          <h2 className="text-2xl font-semibold text-[#1E280E]">13. Privasi Anak</h2>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Layanan kami tidak ditujukan untuk anak-anak di bawah usia 18 tahun. Kami
            tidak secara sadar mengumpulkan informasi pribadi dari anak-anak. Jika kami
            mengetahui bahwa kami telah mengumpulkan data pribadi dari anak di bawah usia
            18 tahun, kami akan segera menghapus informasi tersebut.
          </p>

          <h2 className="text-2xl font-semibold text-[#1E280E]">14. Perubahan Kebijakan Privasi</h2>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Kami berhak memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan
            akan berlaku efektif segera setelah dipublikasikan di halaman ini dengan tanggal
            "Terakhir diperbarui" yang direvisi. Kami akan memberitahukan perubahan material
            melalui:
          </p>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>Pemberitahuan email ke alamat email yang terdaftar</li>
            <li>Pemberitahuan di dalam platform Layanan</li>
            <li>Pengumuman di situs web kami</li>
          </ul>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Penggunaan Layanan yang berkelanjutan setelah perubahan menjadi efektif
            merupakan penerimaan Anda terhadap kebijakan yang direvisi.
          </p>

          <h2 className="text-2xl font-semibold text-[#1E280E]">15. Hubungi Kami</h2>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait Kebijakan
            Privasi ini atau praktik penanganan data kami, silakan hubungi:
          </p>
          <ul className="text-base text-[#535862] sm:text-lg lg:mx-0">
            <li>PT Usaha Kreatif Indonesia</li>
            <li>
              Email:{" "}
              <a href="mailto:admin@usahakreatif.co.id" className="text-[#535862] underline">
                admin@usahakreatif.co.id
              </a>
            </li>
            <li>Alamat: alamat perusahaan - menyusul</li>
            <li>Telepon: nomor telepon - menyusul</li>
          </ul>
          <p className="text-base text-[#535862] sm:text-lg lg:mx-0">
            Kami akan berusaha merespons semua permintaan dalam waktu 30 hari kerja.
          </p>
          </section>

          <motion.div variants={heroButton} initial="hidden" animate="visible">
            <Button
              href="/"
              color="primary"
              size="lg"
              className="mt-4 w-full sm:w-auto sm:px-8"
            >
              Kembali ke Beranda
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
