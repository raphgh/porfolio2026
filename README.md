# portfolio2026

Personal portfolio — Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Motion. Fully static; deploys to Vercel with no config.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Editing content

All content lives in `src/data/` — pages never hardcode copy.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, hero copy, nav, contact links (empty values render as placeholders), resume path |
| `projects.ts` | WORK projects and their case studies. Array order = display order; `featured` puts a project on the homepage |
| `experience.ts` | Professional roles. Multiple terms at one company go in one entry's `roles`; `display: "grouped" \| "separate"` |
| `extracurriculars.ts` | Hackathons, community, leadership |
| `lab.ts` | Small experiments (`status`: SHIPPED / ONGOING / PAUSED / ABANDONED) |
| `about.ts` | About copy and the "A few things I make" scrapbook |
| `process.ts` | HOW I BUILD steps |

Types for everything are in `src/data/types.ts`.

**Case studies** are a list of `sections`, each with a `kind` (problem, architecture, apis, research, frontend…) and `blocks`: `text`, `list`, `media`, `artifact` (empty slot), `code`, `flow` (HTML box-and-arrow diagram), `compare` (before/after) and `note` (margin annotations: WHY THIS? / REJECTED / CHANGED / TRADEOFF / LEARNED). Pick whatever sequence fits the project — `projects.ts` has three starting skeletons (system, product, full-stack). A project without `caseStudy` links straight to `links.live` / `links.repo`.

**Images** go in `public/` and are referenced as `{ type: "image", src: "/work/foo.jpg", alt: "…" }`. Videos use `type: "video"` (muted loop, paused off-screen and for reduced-motion users).

**Resume**: drop the PDF at `public/resume.pdf`.

**Doodles**: the hero objects are in `src/components/doodles/` — swap any component in `art.tsx` for a real illustration, and tune positions in `doodles.ts`.

**Deploy**: set `NEXT_PUBLIC_SITE_URL` in Vercel for canonical URLs and the sitemap.
