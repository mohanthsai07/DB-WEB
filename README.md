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

## Deployment configuration

Configure these server-side environment variables in Vercel or the production host:

```text
GROQ_API_KEY=your_groq_api_key
AI_MODEL=openai/gpt-oss-120b
AI_BASE_URL=https://api.groq.com/openai/v1
NEXT_PUBLIC_DHANIK_WHATSAPP_NUMBER=your_international_digits_only_number
```

`GROQ_API_KEY` must be available to the server at runtime. It must not use a `NEXT_PUBLIC_` prefix.
The AI model and base URL are optional because the application has defaults, but both can be set explicitly.
The WhatsApp number must contain international digits only, without `+`, spaces, or punctuation.

After changing environment variables in Vercel, redeploy the project. Use these routes to verify the deployment:

- `/api/chat` should return `{"provider":"groq","groqConfigured":true,"modelConfigured":true}`
- `/api/leads` should return `{"whatsappConfigured":true}` after a valid WhatsApp number is configured

## Student video posters

Student testimonial videos belong in `public/images/students/`. Before `npm run dev` and `npm run build`, the project scans that folder and uses FFmpeg to generate a matching WebP poster beside every MP4:

```text
public/images/students/1.mp4
public/images/students/1.webp  # generated automatically
```

The generated poster is captured at approximately one second into the video. Very short videos fall back to their opening frame. Posters are regenerated only when a source video changes; corrupt videos are skipped with a warning and never prevent the site from building. The generated mapping at `src/data/generated/student-video-posters.ts` is maintained automatically and should not be edited by hand.

### Install FFmpeg

Install FFmpeg locally and ensure both `ffmpeg` and `ffprobe` are available on your `PATH` before running the project:

```powershell
winget install --id=Gyan.FFmpeg -e
```

Restart the terminal or IDE after installation, then verify it:

```powershell
ffmpeg -version
ffprobe -version
```

Your production build environment must install FFmpeg too. On Debian/Ubuntu-based CI images, use:

```bash
apt-get update && apt-get install -y ffmpeg
```

## Validation

```bash
npm run lint
npm run build
```
