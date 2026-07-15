# RemoteDev — Project Roadmap

## Project Vision
Remote IDE control platform with crypto payments and Clerk auth.
Monitor and control VS Code from mobile/web via WebSocket relay.

## Tech Stack
| Layer | Tech |
|---|---|
| Agent | Bun + WebSocket |
| Extension | VS Code API + Node |
| Web | React 19 + Vite 8 + Tailwind 4 + Clerk |
| Mobile | React Native + Expo v57 + Clerk Expo |
| Auth | Clerk (JWT verification on agent) |
| Payments | USDT Celo / USDC Base (crypto only) |
| DB | Postgres (planned, not implemented) |

## Architecture (Simple Relay)
```
Extension ──WS──▶ Agent Server ◀──WS── Mobile / Web
                     │
                     ├── Postgres (planned)
                     ├── Clerk (auth, orgs, JWT)
                     └── Payment Verifier (skeleton)
```

## Key Decisions
- Simple relay architecture (P2P deferred to v0.3.0+)
- No free tier, 7-day trial only
- Crypto payments only (no Stripe)
- Secure-by-default permission model (terminal access opt-in)
- Soft palette design (teal accent #2dd4bf, no gradients, no Claude browns)

## Wallet
`0xcC67A55fb90d788779a4b58b50786ed488BaC34b`

## Pricing
| Tier | Monthly | Yearly (~20% off) |
|---|---|---|
| Individual | $20 | ~$192 |
| Company | $100 base + $20/seat | ~$960 |
| Custom | $250 (direct support) | Negotiable |
- Trial: 7 days max, no free tier
- Payments: USDT on Celo, USDC on Base only

## Clerk
- Domain: `eager-hedgehog-95.clerk.accounts.dev`
- JWKS: `https://eager-hedgehog-95.clerk.accounts.dev/.well-known/jwks.json`

---

## M1: Build/Task Notification — COMPLETE

Goal: VS Code detects build/test completion → agent relays → mobile/web shows notification.

### Completed
- [x] `build_complete` event type in shared (`shared/src/index.ts`)
- [x] Extension task completion detection (`vscode.tasks.onDidEndTaskProcess`)
- [x] Agent event relay (no changes needed — existing relay works)
- [x] Web: `useAgentEvents` WebSocket hook (`web/src/hooks/useAgentEvents.ts`)
- [x] Web: `NotificationToast` component with success/failure styling
- [x] Mobile: `build_complete` event rendering in `DashboardScreen`
- [x] Agent JWKS URL derivation fixed (decodes `pk_test_` key format)
- [x] `.env.example` files for all 6 packages
- [x] Clerk Expo SDK installed on mobile app
- [x] Mobile auth: Clerk provider, `<SignedIn>/<SignedOut>`, replaces email/password
- [x] All packages use local shared dependency (`file:../shared`)
- [x] `.vscode/launch.json` for F5 debugging
- [x] Unused files removed (`App.css`, `CLAUDE.md`, `code-workspace`)
- [x] `.env` gitignored across all repos, `.env.example` allowed

### Not Yet Verified
- [ ] End-to-end test: build task → agent → client event
- [ ] Web toast appears on build completion (needs Clerk auth or hardcoded token)
- [ ] Mobile card appears on build completion

### Known M1 Issues
- Agent doesn't log event broadcasts — relays silently. Use wscat or Node script to verify.
- Web toast requires Clerk JWT — for quick test, hardcode `"dev-token-change-me"` in `useAgentEvents.ts`.
- Build task classification uses regex patterns on task name — may miss edge cases.
- Mobile WebSocket has no reconnection logic (planned for later).

---

## M2: Read-Only Viewer — IN PROGRESS

Goal: Browse files, view file contents, and see git status/diff from mobile/web.

### Completed
- [x] Web: FilesBrowser component (directory listing, breadcrumb nav, file preview)
- [x] Web: GitViewer component (branch, changes list, status colors, diff viewer)
- [x] Web: Dashboard tab navigation (Dashboard | Files | Git)
- [x] Web: useAgent hook refactored — supports both events and command sending
- [x] Mobile: FilesScreen breadcrumb navigation (replaced bare path input)
- [x] Mobile: GitScreen read-only mode (commit/push hidden), status color coding
- [x] Mobile: Directory names highlighted with accent color

### Not Yet Done
- [ ] File content syntax highlighting (currently plain monospace)
- [ ] Pull-to-refresh on file listing and git status
- [ ] File size metadata in listing
- [ ] Diff syntax coloring
- [ ] Sort options (name, type, date)
- [ ] Real-time `file_opened` event display

---

## M3: Remote Execution — NOT STARTED

Goal: Run commands, commit code, and push from mobile/web.

### Planned
- [ ] Terminal input + output streaming — web + mobile
- [ ] Run shell commands from mobile/web
- [ ] Git commit with message input — mobile/web
- [ ] Git push trigger — mobile/web
- [ ] Confirmation prompts for destructive actions
- [ ] Permission model enforcement (extension-side)

---

## M4: SaaS Platform — NOT STARTED

Goal: Production-ready multi-tenant platform.

### Backend (needs building)
- [ ] API server — implements all `/api/*` routes (14+ endpoints)
- [ ] Postgres database + Drizzle ORM + migrations
- [ ] User management (CRUD, roles, Clerk webhook sync)
- [ ] Session lifecycle (start, end, duration tracking, billing)
- [ ] Subscription management (trial → active → past_due → expired)
- [ ] Usage metering + quota enforcement
- [ ] Admin panel backend (stats, user list, session logs)
- [ ] Payment verifier webhook handler (subscription activation)

### Payments
- [x] Pricing types and plans defined (`shared/src/pricing.ts`)
- [x] Payment verifier skeleton (`payment-verifier/src/verifier.ts`)
- [ ] Persistent transaction deduplication
- [ ] Webhook retry logic
- [ ] Webhook authentication (HMAC)
- [ ] Transaction confirmation depth checking

### Infrastructure
- [ ] Dockerfiles for agent + API + verifier
- [ ] `docker-compose.yml` for local dev
- [ ] GitHub Actions CI (lint, typecheck, build, test)
- [ ] Health check endpoints (`/health`, `/ready`)
- [ ] Structured logging (JSON, request IDs)
- [ ] Graceful shutdown (SIGTERM)

### Security (critical)
- [ ] Rate limiting on agent WebSocket server
- [ ] WebSocket message size limits
- [ ] Input validation with Zod across agent + API
- [ ] CORS headers on agent HTTP endpoint
- [ ] Remove hardcoded `"dev-token-change-me"` default in production

### Code Quality
- [ ] `tsconfig.json` for `shared/`, `agent/`, `payment-verifier/`
- [ ] Oxlint config for all packages
- [ ] Prettier / `.editorconfig`
- [ ] Pre-commit hooks
- [ ] Error boundaries in React (web + app)
- [ ] Vitest test framework + critical path tests
- [ ] `strict: true` in web `tsconfig.app.json`

### Mobile Fixes
- [ ] WebSocket auto-reconnection (exponential backoff)
- [ ] Secure credential storage (Keychain/Keystore)
- [ ] Error boundary component
- [ ] Loading states (skeletons, spinners)

### Documentation & Polish
- [ ] Root README
- [ ] Per-package READMEs
- [ ] API endpoint documentation
- [ ] Toast notification system (web)
- [ ] Admin pagination
- [ ] Admin role toggle confirmation dialog
- [ ] Replace `window.location.href` with `<Navigate>` in web
- [ ] Settings/profile page (web + app)

---

## Critical Gaps (blocks production use)

| # | Gap | Impact |
|---|---|---|
| 1 | No API server | All `/api/*` calls from web/mobile are dead ends |
| 2 | No database | No persistence. Sessions, users, usage stats not stored |
| 3 | No input validation | Malformed messages blindly trusted |
| 4 | No rate limiting | Agent is trivially DOS-able |
| 5 | Hardcoded dev token | `dev-token-change-me` default in extension + agent |
| 6 | Mobile: no WebSocket reconnect | User must manually reconnect on disconnect |
| 7 | No CI/CD | No automated builds, tests, or deployment |
| 8 | Zero tests | No test framework or test files anywhere |
