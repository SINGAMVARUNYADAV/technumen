# Technumen Career Portal

A modern, responsive React career portal for **Technumen** — an IT consulting firm.

## Stack
- **React 18** + **Vite** (frontend)
- **Tailwind CSS v4** (styling)
- Brand colors: Deep Teal `#008080`, Dark Navy `#0A192F`

## How to run

```
npm run dev
```

Starts the Vite dev server on **port 5000**. The configured workflow `Start application` handles this automatically.

## Project structure

```
src/
  components/
    Header.jsx       — Sticky nav with logo and links
    Hero.jsx         — Full-width banner with headline and CTAs
    JobListings.jsx  — Card grid of job postings
    ApplyModal.jsx   — Application form modal (ATS-branded)
    Footer.jsx       — Links, contact info, copyright
  App.jsx            — Root component, manages modal state
  main.jsx           — ReactDOM entry point
  index.css          — Tailwind CSS v4 imports + theme tokens
index.html           — HTML shell
vite.config.js       — Vite config (host 0.0.0.0, port 5000)
postcss.config.js    — Uses @tailwindcss/postcss (required for v4)
tailwind.config.js   — Content paths (v4 auto-detects, kept for reference)
```

## Key notes
- PostCSS config uses `@tailwindcss/postcss` — required for Tailwind CSS v4 (the `tailwindcss` plugin was removed from the main package).
- Job data is hardcoded in `src/components/JobListings.jsx`.
- The apply modal is purely client-side (no backend); form submission shows a success state.
