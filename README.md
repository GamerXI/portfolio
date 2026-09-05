# Suhail Saifi — Portfolio

Cinematic, scroll-driven portfolio with a dark sci-fi aesthetic: WebGL stage, HUD chrome, and Framer Motion storytelling.

**Live (GitHub Pages):** https://gamerxi.github.io/portfolio/

## Features

- Cinematic boot sequence with terminal-style status lines
- WebGL background (Three.js / R3F) with scroll-linked camera
- Smooth scrolling (Lenis) + HUD progress rail
- Chapters: Init → Identity → Systems → Missions → Timeline → Uplink
- `prefers-reduced-motion` fallback (no WebGL / reduced animation)
- Content centralized in `src/content/portfolio.ts`

## Tech Stack

- Vite + React 19 + TypeScript
- Three.js, `@react-three/fiber`, `@react-three/drei`
- Framer Motion, Lenis

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5847 (base defaults to /portfolio/)
npm run build
npm run preview
```

For local root serving during development:

```bash
VITE_BASE=/ npm run dev
```

## GitHub Pages Deploy

Site URL: **https://gamerxi.github.io/portfolio/**

1. Push this repo to GitHub (e.g. `GamerXI/portfolio`).
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. On every push to `main`, `.github/workflows/deploy-pages.yml` builds with `VITE_BASE=/portfolio/` and deploys via `actions/deploy-pages`.

Vite `base` is set in `vite.config.ts`:

```ts
base: process.env.VITE_BASE || '/portfolio/',
```

## Customization

Edit `src/content/portfolio.ts` for name, bio, skills, projects, experience, and socials.

Current profiles:

- GitHub: https://github.com/GamerXI (`@GamerXI`)
- LinkedIn: https://linkedin.com/in/suhail-saifi
- npm: https://www.npmjs.com/~itsgamerx (`~itsgamerx`)
- Email: suhailsaifi2020@gmail.com

## License

MIT
