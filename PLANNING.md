# Personal Budget Tracker — Project Plan

> Carried over from planning done in a separate chat (2026-08-15). This is the
> agreed design; nothing in this repo has been built yet. The user is building
> this themselves with guidance — Claude should not write feature code here
> unless explicitly asked to for a specific step.

## Stack

- Frontend: React (Vite) + Tailwind CSS
- Backend: Django + Django REST Framework
- Database: PostgreSQL
- Frontend and backend are separate, decoupled projects communicating over a REST API (not a Next.js-style monolith).

## Core architectural principle

The server is the source of truth for all persisted data and all business
logic — including every financial calculation (totals, category sums,
budget-vs-actual percentages). The frontend never re-derives money math from
raw data; it only renders numbers the API already computed.

Client-side state (`useState`) is reserved strictly for UI-only concerns that
don't need to survive a refresh: form input values before submit, modal
open/closed state, active filter/tab selection.

**Check every new component that touches money against this rule.** This
principle is easy to violate by accident — `BudgetList` summed transactions
client-side to compute "spent" for a while before it was caught, purely
because no one re-checked it against this rule after it was first built.
Before adding a component that reads `Transaction`/`Budget`/`Summary` data,
search for `.reduce(`, `+=`, or any place touching `.amount` across multiple
records — a `Summary`/`BudgetVsActual`/`TrendPoint` field should already
carry the computed number; the frontend should only be reading it, not
calculating it. The one accepted exception found so far is `CategoryBreakdown`
bucketing several small categories into a display-only "Other" total — that's
regrouping numbers the API already returned, not deriving new ones from raw
transaction data, which is a materially different thing from what `BudgetList`
was doing.

## MVP features

- User auth (register/login/password reset)
- Categories (CRUD)
- Transactions (CRUD: amount, category, date, title)
- Dashboard (spending by category, spending trend over time, total spent)
- Budgets (monthly limit per category, with progress shown)

**Stretch goals (later):** recurring transactions, multi-month trend history, CSV export.

## Database schema (Postgres via Django models)

- `User` — Django's built-in auth user (or a custom user model)
- `Category` — id, user_id (FK), name, color, created_at
  - `color` is a hex string (e.g. `#ec4899`) chosen from a frontend swatch picker, not a fixed enum — model it as a `CharField` with hex-format validation (e.g. a regex validator for `#RRGGBB`), not `choices=[...]`
- `Transaction` — id, user_id (FK), category_id (FK), amount, date, title, created_at
- `Budget` — id, user_id (FK), category_id (FK), month, limit_amount

## Backend responsibilities (Django + DRF)

- Auth endpoints (token/JWT, e.g. `djangorestframework-simplejwt`)
- Standard CRUD via DRF `ModelViewSet`s for categories/transactions/budgets
- Every queryset filtered by `request.user` — users can only ever touch their
  own data. This is the real security boundary: `permission_classes =
  [IsAuthenticated]` on every endpoint, not just a frontend redirect.
- Server-side validation in serializers (client-side validation is UX-only, never trusted)
- Dedicated aggregation endpoints that return pre-computed numbers rather than
  making the frontend sum raw transactions itself:
  - `GET /api/summary/?month=YYYY-MM` — total spent, spend by category, budget vs. actual
  - `GET /api/trends/?months=N` — spending history for the trend chart

## Frontend component structure

```
App / AuthProvider (auth state + route guard)
  ├─ LoginPage
  │    └─ LoginForm
  ├─ CreateAccountPage
  │    └─ CreateAccountForm
  ├─ ForgotPasswordPage
  │    └─ ForgotPasswordForm
  └─ Layout
       ├─ DashboardPage
       │    ├─ SummaryCards
       │    ├─ CategoryBreakdown (chart)
       │    ├─ SpendingTrend (chart)
       │    ├─ BudgetProgressList
       │    └─ TransactionList (reused, limited to recent items)
       ├─ TransactionsPage
       │    ├─ TransactionList
       │    ├─ TransactionForm
       │    └─ CategoryPicker
       ├─ CategoriesPage
       │    ├─ CategoryList
       │    └─ CategoryForm
       └─ BudgetsPage
            ├─ BudgetList
            └─ BudgetForm
```

`DashboardPage` fetches `/api/summary/` once and passes slices down as props
to `SummaryCards` / `CategoryBreakdown` / `BudgetProgressList` rather than
each fetching independently — avoids duplicate requests, keeps them in sync.

`LoginForm` / `CreateAccountForm` / `ForgotPasswordForm` follow the same
Page-owns-data/Form-owns-inputs split as the other `*Form` components, but for
a different reason: `TransactionForm`/`CategoryForm`/`BudgetForm` are split
out because one component is reused for both create and edit. The auth forms
are each used exactly once on their own page — no add/edit duality — so the
split there is purely for consistency with the rest of the app, not reuse.

## Auth / routing expectations

- Unauthenticated users never see protected pages — a route guard
  (`ProtectedRoute` / `RequireAuth`) checks for a valid token on load and
  redirects to `/login` before rendering, avoiding a flash of dashboard content.
- A 401 from any API call mid-session clears auth state and redirects to
  login with a "session expired" message.
- No separate marketing landing page needed at this scale — root URL can just
  be the login/register screen.

## Add Transaction modal (design spec)

Rendered as a true fixed-position overlay via a React portal to
`document.body`, not inline in the page.

- Backdrop: `fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-5`
- Card: `w-[380px] rounded-2xl border border-black/10 bg-white p-6 pb-5 shadow-2xl dark:bg-neutral-900 dark:border-white/10`
- Closes on backdrop click or Escape
- Locks body scroll while open

## Build order

1. Django models + migrations — no frontend yet.
2. Build and manually test every endpoint (DRF browsable API / Postman) before any UI touches them.
3. Auth flow end-to-end.
4. React + Vite + Tailwind scaffold, wired to the real API for categories/transactions CRUD.
5. `/api/summary/` endpoint + dashboard + charts.
6. Budgets.
7. Deploy (Django on Render/Railway, React on Vercel/Netlify).

## Current phase — where this repo starts

Building all frontend client components first, in their own repo, in
isolation from the backend — **no Django/Postgres work yet.**

- Use hardcoded mock data shaped exactly like the future real API responses
  (matching the schema/endpoints above).
- Isolate all data access behind API-shaped functions in a `src/api/` folder
  (e.g. `getTransactions()`, `getSummary()`) that return mocks today but have
  the same signature they'll have once wired to the real backend — so
  swapping mock data for real fetch calls later is a small, localized change,
  not a rewrite across components.
- The real Postgres database only gets seeded with dummy data once the
  Django backend is actually being built (management command or fixtures) —
  not before.
