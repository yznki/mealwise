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

- `app/app.vue` — root layout; bare mobile shell with safe area insets and page transitions
- `app/app.config.ts` — Nuxt UI theme config (colors, component defaults)
- `app/pages/` — file-based routing via `NuxtPage`
- `app/components/` — auto-imported Vue components
- `app/stores/` — Pinia stores (auto-imported by `@pinia/nuxt`)
- `app/assets/css/main.css` — global styles, Tailwind v4 theme tokens, brand colours, dark mode overrides

### Key modules

| Module                    | Purpose                                          |
| ------------------------- | ------------------------------------------------ |
| `@nuxt/ui`                | Component library (prefix `U`) + Tailwind CSS v4 |
| `@nuxt/fonts`             | Auto-loads DM Sans + Inter from Google Fonts     |
| `@pinia/nuxt`             | State management (stores auto-imported)          |
| `@vueuse/nuxt`            | Composables auto-imported                        |
| `@nuxt/image`             | Optimized `<NuxtImg>` component                  |
| `@anthropic-ai/sdk`       | Claude API integration (server-side only)        |
| `@vercel/analytics`       | Vercel Analytics (auto-injected)                 |
| `@vercel/speed-insights`  | Vercel Speed Insights (auto-injected)            |

### Icons

Two icon sets are available:

- `i-lucide-*` — Lucide icons (via `nuxt-lucide-icons` + `@iconify-json/lucide`)
- `i-simple-icons-*` — Simple Icons (via `@iconify-json/simple-icons`)

### Server / AI

`runtimeConfig.anthropicApiKey` reads from `ANTHROPIC_API_KEY` env var. This key is **server-only** (no `public:` prefix). Use it exclusively in `server/api/` route handlers — never expose it to the client.

The AI call lives in `server/api/generate.post.ts`. It receives budget, meals per day, number of days, and dietary preference, calls Claude Haiku 3.5, and returns a structured JSON meal plan + shopping list.

Rate limiting lives in `server/middleware/rate-limit.ts`: 3 requests per IP per 60 seconds on `POST /api/generate`, returning HTTP 429 with a user-facing message on breach.

## File structure

```
app/
  app.vue                          # Root shell — safe area insets, page transitions
  app.config.ts                    # Nuxt UI theme
  assets/css/main.css              # Tailwind v4 theme tokens + dark mode overrides
  pages/
    index.vue                      # S1 — Input Form (bare template, mounts <InputForm />)
    plan.vue                       # S2/S3/S4/S5 — Plan screen (mounts <PlanScreen />)
  stores/
    meal-plan.store.ts             # Single Pinia store for all app state
  components/
    InputForm/
      InputForm.vue                # S1 — full input form screen
      useInputForm.ts              # Composable: store bindings, onGenerate, budget input
      DevToolbar.vue               # Dev-only prefill toolbar (hidden on phone)
    PlanScreen/
      PlanScreen.vue               # Orchestrates S2/S3/S4/S5 based on store state
    MealPlanOutput/
      MealPlanOutput.vue           # S3/S4 — tab switcher (plan | shopping)
      useMealPlanOutput.ts         # Composable: activeTab, TAB_OPTIONS, onRegenerate
    GeneratingScreen/
      GeneratingScreen.vue         # S2 — spinner / loading state
    ErrorScreen/
      ErrorScreen.vue              # S5 — error state with retry button
    DayPlanList/
      DayPlanList.vue              # Lists <DayCard /> for each day
    DayCard/
      DayCard.vue                  # Single day card with collapsible meals
    MealRow/
      MealRow.vue                  # Single meal row (emoji, name, type pill)
    ShoppingList/
      ShoppingList.vue             # Shopping list grouped by category
    ShoppingCategoryCard/
      ShoppingCategoryCard.vue     # Category header + <ShoppingItemRow /> list
    ShoppingItemRow/
      ShoppingItemRow.vue          # Single shopping item row
    UI/
      TheLogo.vue                  # Mealwise wordmark (DM Sans, primary-500)
      SegmentedToggle.vue          # Reusable pill toggle (generic T value)
      CurrencyModal.vue            # Currency picker modal, grouped by region
      ColorModeToggle.vue          # 3-state toggle: system / light / dark
      RecapBar.vue                 # Recap bar showing budget/days/meals summary
server/
  api/
    generate.post.ts               # POST /api/generate — calls Claude, returns meal plan
  middleware/
    rate-limit.ts                  # 3 req/60s per IP on /api/generate
shared/
  constants/
    supported-currencies.ts        # SUPPORTED_CURRENCIES array + getCurrencyByCode()
  types/
    meal-plan.types.ts             # MealPlanResponse, DayPlan, Meal, ShoppingItem etc.
```

## State — `useMealPlanStore`

Single Pinia store in `app/stores/meal-plan.store.ts`. Key shape:

```ts
// State
weeklyBudget: number | null
currencyCode: string          // ISO 4217, default "EUR"
currencySymbol: string        // default "€"
mealsPerDay: 2 | 3
numberOfDays: 5 | 6 | 7
dietaryPreference: "no-restriction" | "halal" | "vegetarian" | "vegan"
isGenerating: boolean
generationError: string | null
mealPlanResponse: MealPlanResponse | null

// Key getters
isFormValid: boolean          // weeklyBudget > 0
selectedCurrency: SupportedCurrency | undefined

// Key actions
generatePlan()   // fires POST /api/generate, sets isGenerating, handles error
resetPlan()      // clears mealPlanResponse + generationError
resetAll()       // resets entire store to defaults
```

## Component conventions

- **Pages are bare templates** — `index.vue` and `plan.vue` contain only `useSeoMeta`/`useHead` and a single feature component. No logic in pages except URL params/slugs.
- **Feature components** live at `ComponentName/ComponentName.vue` with a sibling `useComponentName.ts` composable for all logic.
- **UI primitives** live under `UI/` — shared across features, no business logic.
- **Props**: export the interface with JSDoc comments, use `defineModel` for v-model bindings.
- **No logic in templates** beyond simple conditionals — move to composables.

## Design

- **Hi-Fi Figma**: https://www.figma.com/design/KxHaRbQhsPdlnyPZ4ECIef/Mealwise
- **Lo-Fi Figma**: https://www.figma.com/board/A75vcw0xt970lCpcxIJjR6/Mealwise
- Always reference the **Hi-Fi page** before building any component or page
- 5 screens built:
  1. S1 — Input Form (`/` → `<InputForm />`)
  2. S2 — Generating (`/plan` while `isGenerating` → `<GeneratingScreen />`)
  3. S3 — Meal Plan output (`/plan` plan tab → `<DayPlanList />`)
  4. S4 — Shopping List output (`/plan` shopping tab → `<ShoppingList />`)
  5. S5 — Error State (`/plan` on `generationError` → `<ErrorScreen />`)

## Brand & Tokens

| Token         | Value     | Tailwind class         | Usage                                        |
| ------------- | --------- | ---------------------- | -------------------------------------------- |
| Primary green | `#16A37F` | `text-primary-500`     | Buttons, active states, links                |
| Deep green    | `#0D6E56` | `text-primary-700`     | Hover states, recap bar text                 |
| Surface green | `#E6F7F2` | `bg-surface-brand`     | Tinted backgrounds, recap bar, emoji circles |
| Accent orange | `#F97316` | `text-orange-500`      | CTAs only — use sparingly                    |
| Text primary  | `#111827` | `text-neutral-900`     | Headings, body                               |
| Text muted    | `#6B7280` | `text-neutral-500`     | Secondary text, placeholders                 |
| Background    | `#F9FAFB` | `bg-neutral-50`        | Page background                              |
| Border        | `#E5E7EB` | `border-neutral-200`   | Dividers, input borders                      |

**Always use token classes — never raw hex values.** e.g. use `text-primary-500` not `text-[#16a37f]`.

- **Font display**: DM Sans — headings, buttons, wordmark (`font-display`)
- **Font body**: Inter — all other text (`font-sans`)
- **Spacing grid**: 8pt — all padding, gap, and margin values must be multiples of 4 or 8
- **Base width**: 390px mobile-first

## Dark mode

Dark mode is class-based (`.dark` on `<html>`), controlled by `@nuxtjs/color-mode` (bundled with Nuxt UI). The `ColorModeToggle` component cycles through `system → light → dark`.

**Critical rule**: never use `@theme dark { }` in CSS — that compiles to `@media (prefers-color-scheme: dark)` which conflicts with the class-based toggle. All dark overrides go in `.dark { }` blocks or `dark:` Tailwind variants.

Dark palette (Material Design-inspired, warm neutrals):

| Token                   | Light          | Dark       |
| ----------------------- | -------------- | ---------- |
| `--color-neutral-100`   | `#f3f4f6`      | `#e8e8e8`  |
| `--color-neutral-700`   | `#374151`      | `#242424`  |
| `--color-neutral-800`   | `#1f2937`      | `#1e1e1e`  |
| `--color-neutral-900`   | `#111827`      | `#121212`  |
| `--color-neutral-950`   | `#030712`      | `#0f0f0f`  |
| `--color-surface`       | `#f9fafb`      | `#121212`  |
| `--color-surface-brand` | `#e6f7f2`      | `#0d3d30`  |

Use `dark:text-neutral-100` (not `dark:text-white`) for primary text in dark mode. Off-white (`#e8e8e8`) is easier on the eyes than pure white on dark backgrounds.

## Mobile / iOS

- `viewport-fit=cover` set in `nuxt.config.ts` for edge-to-edge on iOS
- Safe area insets exposed as CSS vars: `--safe-area-top`, `--safe-area-bottom`
- Used in `app.vue`: `pt-(--safe-area-top) pb-(--safe-area-bottom)` (Tailwind v4 CSS var syntax)
- CTA button uses `pb-[max(16px,env(safe-area-inset-bottom))]` to respect home indicator
- `touch-action: manipulation` on `button` and `[role="button"]` prevents double-tap zoom
- `-webkit-text-size-adjust: 100%` prevents font scaling on orientation change
- Number inputs hide spin buttons on iOS/WebKit

## Deployment

- Platform: Vercel
- `vercel.json` contains only `{ "buildCommand": "pnpm build" }` — Nitro's Vercel preset handles everything else automatically. Do not add `framework`, `rewrites`, or `routes` — they break the serverless functions.
- Environment variable required: `ANTHROPIC_API_KEY`

## Phase status

- Phase 1 — Backend ✅
- Phase 2 — Input screen ✅
- Phase 3 — Output screens ✅
- Phase 4 — Polish & Deploy ✅
