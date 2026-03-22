# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
  pnpm install        # Install dependencies
  pnpm dev            # Start dev server at http://localhost:3000
  pnpm build          # Build for production
  pnpm preview        # Preview production build
  pnpm lint           # Run ESLint
  pnpm typecheck      # Run TypeScript type checking
```

CI runs lint and typecheck on every push (no test suite currently).

## Architecture

This is a **Nuxt 4** app using the `app/` directory convention (Nuxt 4 layout). All application code lives under `app/`:

- `app/app.vue` — root layout, stripped to a bare mobile shell (no UHeader/UFooter — Mealwise is a mobile-first app, not a website)
- `app/app.config.ts` — Nuxt UI theme config (colors, component defaults)
- `app/pages/` — file-based routing via `NuxtPage`
- `app/components/` — auto-imported Vue components
- `app/assets/css/main.css` — global styles, Tailwind v4 theme tokens, brand colours

### Key modules

| Module              | Purpose                                          |
| ------------------- | ------------------------------------------------ |
| `@nuxt/ui`          | Component library (prefix `U`) + Tailwind CSS v4 |
| `@nuxt/fonts`       | Auto-loads DM Sans + Inter from Google Fonts     |
| `@pinia/nuxt`       | State management (stores auto-imported)          |
| `@vueuse/nuxt`      | Composables auto-imported                        |
| `@nuxt/image`       | Optimized `<NuxtImg>` component                  |
| `@anthropic-ai/sdk` | Claude API integration (server-side only)        |

### Icons

Two icon sets are available:

- `i-lucide-*` — Lucide icons (via `nuxt-lucide-icons` + `@iconify-json/lucide`)
- `i-simple-icons-*` — Simple Icons (via `@iconify-json/simple-icons`)

### Server / AI

`runtimeConfig.anthropicApiKey` reads from `ANTHROPIC_API_KEY` env var. This key is **server-only** (no `public:` prefix). Use it exclusively in `server/api/` route handlers — never expose it to the client.

The AI call lives in `server/api/generate.post.ts`. It receives budget, meals per day, number of days, and dietary preference, calls Claude Haiku 3.5, and returns a structured JSON meal plan + shopping list.

## Design

- **Hi-Fi Figma**: https://www.figma.com/design/KxHaRbQhsPdlnyPZ4ECIef/Mealwise
- **Lo-Fi Figma**: https://www.figma.com/board/A75vcw0xt970lCpcxIJjR6/Mealwise
- Always reference the **Hi-Fi page** before building any component or page
- 5 screens to build in order:
  1. S1 — Input Form (index page)
  2. S2 — Generating (loading state)
  3. S3 — Meal Plan output (plan tab)
  4. S4 — Shopping List output (shopping tab)
  5. S5 — Error State

## Brand

| Token         | Value     | Usage                                        |
| ------------- | --------- | -------------------------------------------- |
| Primary green | `#16A37F` | Buttons, active states, links                |
| Deep green    | `#0D6E56` | Hover states, recap bar text                 |
| Surface green | `#E6F7F2` | Tinted backgrounds, recap bar, emoji circles |
| Accent orange | `#F97316` | CTAs only — use sparingly                    |
| Text primary  | `#111827` | Headings, body                               |
| Text muted    | `#6B7280` | Secondary text, placeholders                 |
| Background    | `#F9FAFB` | Page background                              |
| Border        | `#E5E7EB` | Dividers, input borders                      |

- **Font display**: DM Sans (headings, buttons, wordmark)
- **Font body**: Inter (all other text)
- **Spacing grid**: 8pt — all padding, gap, and margin values must be multiples of 4 or 8
- **Base width**: 390px mobile-first

## MVP Scope (Phase 1 only)

Build only these five features — nothing else:

1. Budget input with currency selector
2. Meals per day toggle (2 / 3)
3. Days of the week toggle (5 / 6 / 7)
4. Dietary preference chips (No Restriction / Halal / Vegetarian / Vegan)
5. AI-generated 5–7 day meal plan with meal names
6. Consolidated shopping list grouped by category with approximate quantities

**Out of scope for Phase 1**: user accounts, auth, saving plans, dark mode, push notifications, social sharing, nutrition tracking, supermarket price integration, native mobile app.

## Rules

- **No auth** — app opens directly to the input form, zero login friction
- **AI server-side only** — `ANTHROPIC_API_KEY` never reaches the browser
- **Mobile-first** — design and test at 390px; must work on Chrome/Safari iOS and Android
- **No scope creep** — if a feature isn't in MVP Scope above, park it, don't build it
- **One active task at a time** — finish and verify before moving to the next
- **No polish before function** — get it working first, then refine

## Code style

- **Formatter**: Prettier with tabs (width 2), no trailing commas, double quotes, 140 char print width
- **Linter**: `@nuxt/eslint` with stylistic rules (comma-dangle: never, brace-style: 1tbs)
- Run both before committing; CI enforces them

## Deployment

- Platform: Vercel
- Build command: pnpm build
- Output directory: .output/public
- Environment variable required: ANTHROPIC_API_KEY

## Phase status

- Phase 1 — Backend ✅
- Phase 2 — Input screen ✅
- Phase 3 — Output screens ✅
- Phase 4 — Polish & Deploy ✅
