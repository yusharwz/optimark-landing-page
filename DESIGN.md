# OPTIMARK — Design Guidelines & System Specifications (DESIGN.md)

Dokumen ini adalah panduan tunggal (*single source of truth*) mengenai aturan desain, identitas visual, gaya penjelasan (*copywriting*), interaksi gerak (*motion*), dan arsitektur antarmuka untuk landing page dan modul produk **Optimark**.

---

## 1. Filosofi Produk & Design Dials

Optimark adalah **platform digital marketing all-in-one berbasis AI** yang menggabungkan perencanaan konten (*Content Planner*), riset & audit SEO (*SEO Analyzer*), pembuatan aset visual (*AI Image & Video Generator*), serta optimalisasi kampanye iklan (*Ads Manager*).

Untuk menjaga kualitas desain tetap terasa seperti **karya desainer profesional** dan bebas dari *generic AI-generated slop*, landing page ini mematuhi dial desain berikut:

| Dial | Level (1-3) | Karakteristik Implementasi |
|---|:---:|---|
| **ENERGY** | **2 (Balanced)** | Modern tech SaaS: segar, tajam, fokus pada efisiensi tanpa visual yang berisik atau gimmick berlebihan. |
| **RHYTHM** | **2 (Structured & Dynamic)** | Base layout terstruktur dengan modulasi komposisi: *Hero with live switcher* $\to$ *Bento Grid* $\to$ *Marquee Connect* $\to$ *Pinned Interactive Walkthrough* $\to$ *Visual Carousel* $\to$ *Pricing Calculator* $\to$ *FAQ Accordion*. |
| **MOTION** | **2 (Refined & Purposeful)** | *Lenis smooth scroll* dipadukan dengan *GSAP ScrollTrigger reveals* dan *Framer Motion micro-interactions*. Animasi memandu alur baca, bukan memperlambat pengguna. |

### Brand Persona & Karakter
* **Cerdas & Efisien**: Memberikan jalan pintas bagi tim pemasaran dan pelaku bisnis, bukan sekadar janji kosong.
* **Transparan**: Konsumsi token, biaya, dan kemampuan fitur dijelaskan secara eksplisit tanpa embel-embel teks tersembunyi.
* **Modern & Approachable**: Estetika bersih kelas dunia, namun tetap ramah dan relevan bagi pebisnis dan kreator konten Indonesia.

---

## 2. Visual Foundation & Design Tokens

### 2.1 Color Palette
Sistem warna dibangun di atas fondasi palet **Brand Lime/Chartreuse** yang dipadukan dengan warna **Forest Dark Olive** dan netral slate/zinc (menggunakan tokens Untitled UI).

```
Brand Primary (Lime)   : #94C748 (var(--color-brand-500))
Brand Light Tint       : #F1FBE4 (var(--color-brand-50))
Brand Light Surface    : #F8FDF1 (var(--color-brand-25))
Brand Dark Text        : #273515 (var(--color-brand-950))
Display Heading Olive  : #1E280E (text-display utility)
Body / Lead Neutral    : #535862 (var(--color-gray-600) / text-lead)
Detail Muted Neutral   : #717680 (var(--color-gray-500) / text-detail)
```

#### Aturan Penggunaan Warna
1. **Aksen Brand (`#94C748` / `brand-500`)**: Digunakan secara hemat untuk elemen penting: CTA primer, status badge aktif, border highlight kartu terpilih, dan progres interaktif.
2. **Surface & Background**: Latar belakang default menggunakan putih `#FFFFFF` untuk landing page, dengan elevasi kartu berbasis abu-abu netral sangat halus (`bg-gray-50`, border `border-gray-200`).
3. **Dark Mode**: Didukung penuh melalui token semantik `styles/theme.css` (`--color-bg-primary`, `--color-text-primary`, dll.) via `@custom-variant dark`.

---

### 2.2 Clarity Ladder (Hierarki Kontras Tipografi)
Landing page ini mengimplementasikan **Clarity Ladder** 3 tingkat di `styles/globals.css`. Wajib gunakan utility class ini untuk menjaga konsistensi:

```html
<!-- Level 1: Judul Utama / The one line that matters -->
<h2 class="text-display text-3xl lg:text-4xl">
  Semua tools digital marketing dalam satu platform
</h2>

<!-- Level 2: Sub-judul Pendukung / Supporting lead -->
<p class="text-lead text-base lg:text-lg">
  Dari SEO, konten, scheduling, hingga publishing — dalam satu platform.
</p>

<!-- Level 3: Penjelasan Detail, Hint, & Spesifikasi / Fine print -->
<span class="text-detail text-sm">
  Token aktif selamanya tanpa biaya langganan bulanan.
</span>
```

* **Level 1 (`text-display`)**: `#1e280e`, font-weight 700, letter-spacing -0.02em, line-height 1.05, `text-wrap: balance`.
* **Level 2 (`text-lead`)**: `#535862`, font-weight 400, line-height 1.6, `text-wrap: pretty`.
* **Level 3 (`text-detail`)**: `#717680`, font-weight 400, line-height 1.55, `text-wrap: pretty`.

---

### 2.3 Fluid Display-Scale Adaptation
Untuk mencegah elemen layout terpotong atau terlalu padat pada layar laptop (misal MacBook Air 13" resolusi 1280×800) atau layar monitor Windows 1080p dengan OS display scaling 125%:

* Ukuran root `html` font-size dikomputasi dinamis melalui fluid clamp:
  ```css
  @media (min-width: 1024px) {
    html {
      font-size: min(
        clamp(13.5px, 0.390625vw + 8.5px, 16px),
        clamp(12.5px, 1.5vh + 1px, 16px)
      );
    }
  }
  ```
* **Aturan Pengembang**: Gunakan satuan `rem` untuk padding section, gap, ukuran font, dan tinggi container agar layout otomatis mengecil secara proporsional di layar laptop pendek.

---

### 2.4 Border Radius & Elevation
* **Button & Chip**: `rounded-full` (pills) atau `rounded-lg` (0.5rem) sesuai konteks UI.
* **Card & Bento Box**: `rounded-2xl` (1rem) atau `rounded-3xl` (1.5rem) untuk kesan modern dan empuk (*soft tech*).
* **Modal & Dialog**: `rounded-2xl` (1rem) dengan padding luas dan backdrop blur (`backdrop-blur-md bg-black/40`).
* **Border Style**: Gunakan border subtil `border border-gray-200/80` (bukan border hitam kontras tinggi) dengan transisi `transition-colors duration-200`.

---

## 3. Aturan Copywriting & Gaya Penjelasan (*Tone of Voice*)

Bahasa adalah bagian integral dari desain. Salinan teks (*copy*) di Optimark harus mematuhi standar berikut:

### 3.1 Anti-AI Slop Writing
* **DILARANG** menggunakan jargon korporat klise seperti: *"Merevolusi lanskap digital Anda"*, *"Sinergi holistik tak terbatas"*, *"Solusi mutakhir untuk masa depan cerah"*.
* **WAJIB** menggunakan kalimat konkret berbahasa Indonesia yang lugas dan berorientasi pada manfaat (*benefit-driven*):
  * *Hindari*: "Platform kami memanfaatkan sinergi AI mutakhir untuk akselerasi bisnis."
  * *Gunakan*: "Buat caption siap posting, riset kata kunci SEO, dan jadwalkan ke Instagram dalam satu tempat."

### 3.2 Rumus Penjelasan Fitur (3 Langkah)
Setiap kali menjelaskan fitur atau card produk, gunakan formula:
$$\text{Masalah Nyata} \longrightarrow \text{Aksi Konkret AI} \longrightarrow \text{Hasil yang Terukur}$$

* **Contoh (AI Image)**:
  * *Masalah*: "Tanpa studio foto, tanpa kru, tanpa jadwal pemotretan yang mahal."
  * *Aksi*: "Tulis brief singkat tentang konsep produk dan suasana yang diinginkan."
  * *Hasil*: "AI menghasilkan visual packshot katalog dan foto lifestyle siap unggah dalam berbagai rasio."
* **Contoh (SEO Analyzer)**:
  * *Masalah*: "Tidak tahu mengapa artikel tidak kunjung masuk halaman pertama Google."
  * *Aksi*: "Audit draf konten sebelum tayang dengan skor 0–100 dan cek kepadatan kata kunci."
  * *Hasil*: "Pantau pergerakan peringkat kata kunci dan kutipan di mesin jawaban AI (ChatGPT, Perplexity)."

### 3.3 Penjelasan Sistem Token & Transparansi Harga
Model bisnis Optimark mengedepankan **Pay-As-You-Go**:
1. **Jelaskan nilainya**: "Beli paket token sesuai kebutuhan tanpa langganan bulanan."
2. **Klarifikasi masa aktif**: Wajib tegaskan bahwa **"Token aktif selamanya tanpa kadaluarsa"**.
3. **Rincikan konsumsi token secara transparan**:
   * Caption media sosial: **2 token / post**
   * Audit SEO & kata kunci: **5 token / audit**
   * Artikel panjang (long-form): **5 token / artikel**
   * Gambar AI (packshot/studio): **10 token / gambar**
   * Optimasi kampanye iklan: **15 token / kampanye**

---

## 4. Komponen & Aturan Interaktivitas

### 4.1 Arsitektur Komponen
1. **Base Foundation (`@/components/base/`)**: Komponen atomik berbasis Untitled UI (`button`, `input`, `badge`, `dropdown`, `toggle`, `slider`). Jangan mengubah token global di dalam komponen atomik tanpa persetujuan sistem.
2. **Section Modules (`@/components/*Section.tsx`)**: Modul landing page independen (`HeroSection`, `BentoFeaturesSection`, `HowItWorksSection`, `ImageShowcaseSection`, `PricingSection`, `FaqSection`, `CtaSection`).
3. **Interactive Demo Modals (`@/components/ai-caption/`, `@/components/best-time/`)**:
   * Pengguna harus bisa merasakan demo interaktif secara langsung di landing page sebelum mendaftar.
   * Simulator harus memberikan contoh nyata yang dapat dimodifikasi (misal: tombol penyempurnaan chip: *"Lebih pendek"*, *"Lebih persuasif"*, *"Tambah hashtag"*).

### 4.2 Standard Tombol CTA (*Call to Action*)
* **Primary CTA**:
  * Teks: *"Mulai Gratis"* atau *"Coba Gratis"*.
  * URL: Mengarah ke `GET_STARTED_URL` (`https://app.optimark.ai/login`) dari `config/site.ts`.
  * Catatan pendukung: Selalu sertakan penegasan *"Tanpa kartu kredit"*.
* **Secondary CTA**:
  * Teks: *"Jelajahi fitur"* (smooth scroll ke `#features`) atau *"Tanya via WhatsApp"* (mengarah ke `WHATSAPP_URL`).

---

## 5. Motion, Scroll, & Animasi

### 5.1 Smooth Scroll & GSAP Integration
* Landing page menggunakan **Lenis** (`SmoothScrollProvider`) untuk scroll yang mulus dan elegan.
* Untuk scroll-triggered reveal, gunakan komponen `@/components/motion/Reveal`:
  ```tsx
  <Reveal y={30} duration={0.7} stagger staggerAmount={0.1}>
    <Card1 />
    <Card2 />
  </Reveal>
  ```
* **Aturan GSAP Wajib**:
  1. Selalu gunakan `fromTo` dengan `clearProps: "all"` agar posisi elemen kembali ke CSS aslinya setelah animasi selesai (mencegah bug layout saat browser di-resize).
  2. Gunakan easing standar: `power3.out` untuk animasi masuk.
  3. Cek `prefers-reduced-motion`: Jika aktif, nonaktifkan animasi transform dan tampilkan elemen dalam status natural.

### 5.2 Responsive Scroll Behavior (`HowItWorksSection`)
* **Desktop ($\ge 1024\text{px}$)**: Menggunakan **GSAP ScrollTrigger Pinned Section**. Saat pengguna menggulir layar, mockup di sisi kanan terkunci (*sticky pin*) sementara langkah 1, 2, dan 3 berganti secara mulus.
* **Mobile / Tablet ($< 1024\text{px}$)**: Nonaktifkan pin scroll. Beralih ke **Auto-rotating Step Cards** dengan timer 6 detik, yang otomatis berhenti ketika disentuh atau di-tap oleh pengguna.

---

## 6. Tata Kelola Konten & Internasionalisasi (i18n)

1. **Aturan Single Source of Copy**:
   * **DILARANG KERAS** melakukan hardcode string teks langsung di dalam file komponen `.tsx`.
   * Semua teks judul, deskripsi, placeholder, badge, dan label tombol **wajib** didefinisikan di `messages/id.json` dan `messages/en.json`.
2. **Pola Pemanggilan**:
   ```tsx
   import { useTranslations } from "next-intl";

   export function MyComponent() {
     const t = useTranslations("hero");
     return <h1>{t("title")}</h1>;
   }
   ```
3. **Standar Kunci JSON**:
   * Gunakan format camelCase: `title`, `subtitle`, `cta`, `description`, `features`.
   * Kelompokkan berdasarkan nama section/komponen.

---

## 7. Responsive & Aksesibilitas

### 7.1 Breakpoints
* **Mobile Kecil (`xxs`)**: `320px`
* **Mobile Standar (`xs`)**: `600px`
* **Tablet (`md`)**: `768px`
* **Desktop (`lg`)**: `1024px`
* **Desktop Lebar (`xl` / `max-width-container`)**: `1280px`

### 7.2 Pedoman Aksesibilitas (WCAG AA)
1. **Area Sentuh (Tap Target)**: Semua tombol dan link di tampilan mobile harus memiliki ukuran minimal $44 \times 44\text{ px}$.
2. **Kontras Teks**: Rasio kontras teks tubuh minimal 4.5:1 terhadap background. Teks judul `#1e280e` pada background putih memiliki rasio kontras > 12:1 (lulus WCAG AAA).
3. **Keyboard Navigasi**: Pastikan semua modal interaktif dapat ditutup menggunakan tombol `Esc` dan elemen interaktif memiliki `focus-visible:ring-2`.

---

## 8. Checklist Verifikasi Desain

Sebelum mempublikasikan atau me-merge perubahan UI baru:
- [ ] Apakah teks menggunakan Clarity Ladder (`text-display`, `text-lead`, `text-detail`)?
- [ ] Apakah seluruh copy berasal dari `messages/{id,en}.json` tanpa hardcode string?
- [ ] Apakah penjelasan fitur bebas dari jargon AI slop dan berfokus pada masalah riil pengguna?
- [ ] Apakah tampilan sudah dicek pada viewport laptop pendek ($1280 \times 800\text{px}$)?
- [ ] Apakah interaksi animasi menghormati `prefers-reduced-motion`?
- [ ] Apakah seluruh CTA utama mengarah ke link resmi di `config/site.ts`?
