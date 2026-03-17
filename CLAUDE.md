# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Workflow

**Direct pushes to `main` are blocked by branch protection.** Always work on a feature branch and open a PR.

```bash
git checkout -b feature/my-feature
# ... make changes, commit ...
git push -u origin feature/my-feature
gh pr create
```

## Commands

```bash
npm run dev      # Start dev server (may use a port other than 3000 if taken)
npm run build    # Production build
npm run lint     # ESLint
npx tsc --noEmit # Type-check without emitting files (preferred over `next build` locally)
```

## Architecture

Next.js 15 App Router project with Tailwind CSS v3 and TypeScript. No backend — all pages are static React server components except `Navbar` (client component for mobile menu state).

**Routing**: File-based under `app/`. Current pages: `/` (home), `/about`, `/fish`, `/contact`, `/members`.

**Styling**: Tailwind with custom color tokens defined in `tailwind.config.ts`:
- `forest-*` — primary green scale (nav, headers, dark sections)
- `gold-*` — accent/CTA scale (buttons, highlights)
- `cream` / `parchment` — background and border tones

Reusable utility classes (`btn-primary`, `btn-outline`, `card`, `section-heading`) are defined in `app/globals.css` under `@layer components`.

**Fonts**: Playfair Display (`font-serif`) for headings, Inter (`font-sans`) for body — loaded via `next/font/google` in `app/layout.tsx`.

**Deferred features** (not yet implemented):
- CMS for meeting notes / club news
- Real member authentication (members page is a placeholder with a disabled form)
- Contact form submission (form is UI-only)
