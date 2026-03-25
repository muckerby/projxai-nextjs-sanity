# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

No test runner is configured. Prettier is available via `npx prettier --write <file>`.

## Architecture

**ProjxAI** is a Next.js 16 (App Router) SaaS landing site for an AI automation business, built on a startup template. It uses React 19, TypeScript 5.3, Tailwind CSS v4, and next-themes for dark mode.

### Routing & Pages (`src/app/`)
All routes use the App Router. The homepage (`page.tsx`) composes section components in sequence: Hero → Features → About → Testimonials → Pricing → Blog → Contact. The root layout (`layout.tsx`) wraps everything with `<Header>`, `<Footer>`, and `<ScrollToTop>`.

Theme setup lives in `providers.tsx` which wraps children with `next-themes`' `ThemeProvider` using class-based dark mode.

### Components (`src/components/`)
Each major section is a self-contained directory. Data is co-located with components (e.g., `blogData.tsx`, `featuresData.tsx`, `menuData.tsx`). Static/mock data lives in these files; blog content comes from Sanity CMS at runtime.

### Styling
Tailwind CSS v4 is configured via `@tailwindcss/postcss` in `postcss.config.js`. Global styles and the custom theme (primary: `#6B3FE7`, dark mode palette) are in `src/styles/index.css`. Prettier uses `prettier-plugin-tailwindcss` for class sorting.

### Path Aliases
`@/*` resolves to `./src/*` (configured in both `tsconfig.json` and `jsconfig.json`).

### Sanity CMS
Blog content is sourced from Sanity. Environment variables required:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

Remote images from `cdn.sanity.io` are allowed in `next.config.js`.
