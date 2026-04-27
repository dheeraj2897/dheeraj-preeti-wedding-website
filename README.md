# Dheeraj & Preethi — Wedding Website

A single-page wedding invitation site, modeled on the Tilda template you shared.
Built with Next.js 14 (App Router), TypeScript, Tailwind, Framer Motion, Prisma + PostgreSQL, and Nodemailer.

## Sections

1. **Hero** — Names, "Save the Date", date `29.06.26`
2. **Letter** — Welcome message to friends and family
3. **Countdown Timer** — Live countdown to the wedding
4. **Schedule of Events** — Ceremony · Cocktail · Dinner · Party
5. **Location** — Venue address with embedded Google Map
6. **Dress Code** — Elegant attire guidance
7. **Details** — Contact info & gift note
8. **RSVP** — Form (name, attending, intolerances, message) → saved to DB + emailed to you
9. **Footer** — Closing message

## Quick start

```bash
# 1) Install
npm install

# 2) Configure environment
cp .env.example .env
# then edit .env (SMTP credentials, your notification email)

# 3) Set DATABASE_URL to a PostgreSQL connection string (e.g. free tier on Neon), then:
npm run db:push

# 4) Run dev server
npm run dev
```

Open <http://localhost:3000>.

## Adding your photos

Drop image files into `public/images/`. Then either:

- **Hero background photo** — Edit `components/Hero.tsx` and replace the `hero-bg` gradient with a `<Image>` or a `bg-[url(...)]` class pointing at your photo (e.g. `/images/hero.jpg`).
- **Section accents** — Use `<Image src="/images/your-photo.jpg" ... />` from `next/image` in any section.

The `next.config.mjs` already permits Unsplash if you ever want stock fallbacks while waiting on real photos.

## Editing names, date, venue, contact

All copy lives in one place: `lib/wedding.ts`. Update names, the wedding `date` (drives the countdown), the schedule, the venue (drives the embedded map), and contact info there.

## Database (RSVP submissions)

- **PostgreSQL** is required (local and on Vercel). Use [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres).
- Put `DATABASE_URL` in `.env` (see `.env.example`).
- Apply schema: `npm run db:push` (dev) or `npx prisma migrate deploy` (CI / Vercel build uses migrations automatically).
- View submissions: `npm run db:studio`

## Email notifications

Each RSVP is also emailed to `RSVP_NOTIFY_TO` via SMTP. Works with any SMTP provider:

- **Gmail** — Use an [App Password](https://myaccount.google.com/apppasswords) (host `smtp.gmail.com`, port `465`, secure `true`).
- **Resend / SendGrid / Mailgun / Postmark** — Use the SMTP credentials they provide.

If SMTP env vars are missing, the API still saves to the DB; it just skips emailing.

## Deployment

### Vercel (recommended)

1. Create a Postgres database and copy its connection string as `DATABASE_URL`.
2. In the [Vercel dashboard](https://vercel.com/new), import this Git repo (or run `npx vercel` from the project root and link the repo).
3. **Environment variables** — add for Production (and Preview if you want RSVPs there too):

   | Name | Notes |
   |------|--------|
   | `DATABASE_URL` | Postgres URL (required for build: migrations run on deploy) |
   | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD` | Optional; email skipped if unset |
   | `RSVP_NOTIFY_TO`, `RSVP_NOTIFY_FROM` | Optional; who receives RSVP emails |

4. Deploy. `vercel.json` runs `prisma migrate deploy` during the build so the `Rsvp` table exists after the first successful deploy.

If the build fails with a Prisma / database error, confirm `DATABASE_URL` is set on the project **before** redeploying.

### Other hosts

- **Netlify** — Works with the same Postgres setup.
- **Static export** — Not supported as-is, because the RSVP form needs a server route. If you want a fully static site, replace the API call in `components/RsvpForm.tsx` with a third-party form service (Formspree, Getform, Basin) and remove `app/api/rsvp/`.

## Project structure

```
app/
  layout.tsx            # Fonts + metadata
  page.tsx              # Composes all sections
  globals.css           # Tailwind + design tokens
  api/rsvp/route.ts     # POST handler (DB + email)
components/
  Hero.tsx
  Letter.tsx
  Countdown.tsx
  Schedule.tsx
  Location.tsx
  DressCode.tsx
  Details.tsx
  RsvpSection.tsx
  RsvpForm.tsx
  Footer.tsx
  Reveal.tsx            # Scroll-fade animation wrapper
lib/
  wedding.ts            # All editable wedding data
  prisma.ts             # Prisma client singleton
  mail.ts               # Nodemailer transport + RSVP email
prisma/
  schema.prisma
public/
  images/               # Drop your photos here
```

## Scripts

| Script              | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start dev server                      |
| `npm run build`     | `prisma generate` + production build  |
| `npm run start`     | Run the production build              |
| `npm run lint`      | Lint the project                      |
| `npm run db:push`   | Apply Prisma schema to the DB         |
| `npm run db:studio` | Open Prisma Studio to view RSVPs      |
