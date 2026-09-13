# Dhanik Bharat Educational Institutions

A Next.js App Router foundation for the Dhanik Bharat Educational Institutions website.

## Architecture phase

This project currently contains route, component, data, type, hook, and future integration placeholders only. No final interface, admissions workflow, chatbot, external API, or content system has been implemented.

Application code follows the existing `src/` convention:

```text
src/
├── app/          # App Router routes and future API route handlers
├── components/   # Layout, page sections, features, shared components, UI primitives
├── data/         # Typed, neutral content data
├── hooks/        # Future client-side interaction hooks
├── lib/          # Shared utilities, metadata helpers, and integration boundaries
└── types/        # Reusable TypeScript contracts
```

Static assets are reserved in `public/images`, `public/icons`, and `public/logo` for future authentic Dhanik Bharat media and brand assets.

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm run build
```
