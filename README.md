# Valentine's Week — For Srushti

A small, day-by-day Valentine's Week web app (Feb 7–14) with gifts, countdowns, and optional AI-powered messages via Google Gemini.

## Tech stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **AI (optional):** Google Gemini API for horoscope, birthday wish, Valentine’s Day, Promise Day, and Hug Day responses

## Features

- **Calendar view:** One tile per day (Rose Day → Valentine’s Day); days unlock by real date
- **List view:** `/gentle-days` — all days in a single scroll
- **Gift modals:** Day-specific content (images, quizzes, static messages for Srushti)
- **Gemini (when configured):** Horoscope (Promise Day), birthday wish, Valentine’s question, Hug Day question
- **Static messages:** Rose, Chocolate, Teddy, Mood & Care use pre-written copy (no API)
- **Countdown:** Header countdown to next locked day; tap locked day for timer modal
- **Sound toggle, panda bubble, decorations**

## Setup

```bash
# Install
npm install

# Copy env and add your key (optional, for Gemini features)
cp .env.example .env
# Edit .env and set GEMINI_API_KEY (get one at https://aistudio.google.com/apikey)

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable          | Required | Description |
|------------------|----------|-------------|
| `GEMINI_API_KEY` | No       | Google AI Studio API key for horoscope, wish, and daily-fun responses |
| `GEMINI_MODEL`   | No       | Model name (default: `gemini-1.5-flash`). See `.env.example` for options |

Without `GEMINI_API_KEY`, the app still runs; Gemini-backed blocks show a friendly fallback.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — run production build locally
- `npm run lint` — run ESLint

## Deploy on Vercel

1. Push this repo to GitHub (see below).
2. Go to [vercel.com](https://vercel.com) and sign in (GitHub is easiest).
3. Click **Add New…** → **Project** and import your GitHub repo.
4. Leave **Framework Preset** as Next.js and **Root Directory** as `.` (or the folder that contains `package.json`).
5. Under **Environment Variables**, add:
   - `GEMINI_API_KEY` = your Google AI Studio key (if you use Gemini).
   - Optionally `GEMINI_MODEL` (e.g. `gemini-2.5-flash`).
6. Click **Deploy**. Vercel will build and give you a URL.

**Redeploy:** Push to the connected branch (e.g. `main`); Vercel deploys automatically.

## Project structure

```
valentine-week/
├── app/
│   ├── api/fun/     # Gemini daily-fun (hug, valentine)
│   ├── api/wish/    # Gemini birthday wish
│   ├── gentle-days/ # List view page
│   ├── layout.tsx
│   └── page.tsx     # Home (calendar)
├── components/      # UI (modals, calendar, timer, etc.)
├── contexts/        # Sound, panda bubble
├── hooks/
├── public/          # Images (rose, teddy, etc.)
└── scripts/         # fix-encoding.js (optional)
```

## License

Private / personal use.
