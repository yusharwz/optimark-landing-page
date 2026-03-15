<div align="center">

# Optimark Landing Page

**Platform all-in-one digital marketing dalam satu dashboard**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com)

</div>

## About Optimark

Optimark adalah platform digital marketing all-in-one yang membantu Anda menjadwalkan konten, meningkatkan visibilitas SEO, mengoptimalkan iklan, dan membuat konten lebih cepat dengan bantuan AI.

### Fitur Utama

- **Perencana Konten** - Jadwalkan dan kelola postingan konten secara otomatis di berbagai platform media sosial
- **SEO Analyzer** - Analisis kata kunci dan optimasi konten dengan teknologi analisis terbaru *(Coming Soon)*
- **Ads Manager** - Kelola dan optimalkan kampanye iklan untuk meningkatkan traffic dan konversi *(Coming Soon)*
- **AI Content Maker** - Buat konten berkualitas dengan bantuan AI untuk hasil yang relevan *(Coming Soon)*

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org) | React framework dengan App Router |
| [React 19](https://reactjs.org) | UI library |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion) | Animasi library |
| [Lenis](https://github.com/studio-freight/lenis) | Smooth scroll |
| [Lucide Icons](https://lucide.dev) | Icon set |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark mode support |

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Run development server
npm run dev

# Open [http://localhost:3000](http://localhost:3000) in your browser
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
landing-page/
├── app/                      # Next.js App Router
│   ├── api/health/          # Health check endpoint
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── base/               # Base components (buttons, cards, etc.)
│   ├── HeroSection.tsx     # Hero section
│   ├── FeaturesSection.tsx # Features section
│   ├── ConnectSection.tsx  # Connect section
│   ├── CtaSection.tsx      # CTA section
│   ├── Footer.tsx          # Footer
│   └── Header.tsx          # Header with navigation
├── lib/                    # Utilities and configs
│   └── animations.ts       # Framer Motion animations
├── public/                  # Static assets
│   └── images/             # Images and SVGs
├── scripts/                # Deployment scripts
│   ├── deploy.sh          # Zero-downtime deployment
│   └── healthcheck.sh     # Health check script
└── styles/                 # Global styles
```

## Deployment

### Docker (Recommended)

For production deployment with zero downtime:

```bash
# Build and deploy (zero downtime)
./scripts/deploy.sh deploy

# View logs
./scripts/deploy.sh logs

# Check status
./scripts/deploy.sh status
```

See [DOCKER.md](./DOCKER.md) for complete Docker documentation.

### Vercel

The easiest way to deploy:

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com/new)
3. Deploy

### Environment Variables

Create `.env.production`:

```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.optimark.com
# Add other environment variables as needed
```

## Development Guidelines

### Component Architecture

- Components use `app/` directory structure (App Router)
- All page components are in `components/` directory
- Reusable components are in `components/base/`
- Use TypeScript for type safety

### Styling

- Tailwind CSS v4 for styling
- Custom utilities via `lib/animations.ts`
- Responsive design with mobile-first approach

### Animations

- Framer Motion for component animations
- Smooth scroll using Lenis
- Performance optimized animations

## Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run format      # Format code with Prettier

# Deployment
./scripts/deploy.sh deploy    # Zero downtime deployment
./scripts/deploy.sh logs      # View container logs
./scripts/deploy.sh status    # Check container status
```

## Performance

- Next.js Image optimization
- Static generation where possible
- Code splitting with App Router
- Font optimization with next/font
- Lazy loading components
- Optimized Docker image (~50MB)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and confidential.

## Contact

For questions or support, please contact the team.

---

<div align="center">

Built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com)

</div>
