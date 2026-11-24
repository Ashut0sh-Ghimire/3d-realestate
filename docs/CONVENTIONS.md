# Conventions

The point of this file: any of us can open any file and it looks like the same person wrote it.
Most rules are checked automatically. Run `npm run lint` and `npm run format` before pushing.

## Naming

| What | Style | Example |
|---|---|---|
| Variables, functions | camelCase | `userName`, `getListing()`, `isLoading` |
| True/false values | start with is / has / can | `isVerified`, `hasTour`, `canEdit` |
| React components & their files | PascalCase | `ListingCard.jsx`, `<ListingCard />` |
| Page folders | PascalCase, same as the component | `pages/ScanRequest/ScanRequest.jsx` |
| Other JS files | camelCase or dot-names | `api.js`, `auth.service.js` |
| Constants | UPPER_SNAKE_CASE | `ROLES.ADMIN`, `LIMITS.OTP_LENGTH` |
| Database tables & columns | snake_case, plural tables | `scan_requests.preferred_date` |
| JSON sent over the API | camelCase | `{ "preferredDate": "2026-11-01" }` |
| API URLs | lowercase, dashes, plural | `/api/scan-requests/:id/status` |
| CSS classes | Tailwind utilities; custom ones in kebab-case | `page-title` |
| Branches | `feature/...` or `fix/...` | `feature/otp-page` |

**Database ↔ API:** the database says `preferred_date`, the API says `preferredDate`.
The backend converts in the service file before sending. The frontend never sees snake_case.

## The golden rule: never type the same value twice

If a value is used in more than one file, it lives in exactly one place:

| Value | Lives in | Use it like |
|---|---|---|
| Roles, statuses, limits | `shared/constants.js` | `SCAN_STATUS.PENDING` (not `"pending"`) |
| Backend URLs | `shared/api-endpoints.js` | `API.AUTH.LOGIN` (not `"/api/auth/login"`) |
| Chat event names | `shared/socket-events.js` | `SOCKET_EVENTS.NEW_MESSAGE` |
| Frontend URLs | `client/src/constants/routes.js` | `ROUTES.OTP` (not `"/verify"`) |
| Colours, fonts | `client/src/styles/index.css` `@theme` | `bg-primary` (not `bg-[#1f6f5c]`) |
| Env settings | `.env` files, read in `config/env.js` | `env.PORT` |

Typo in `"pendng"` → silent bug that takes an hour to find.
Typo in `SCAN_STATUS.PENDNG` → instant error that points at the line.

## Where code goes

**Frontend**

- Used by **one screen only** → inside that screen's folder (`pages/Search/FilterPanel.jsx`)
- Used by **two or more screens** → `client/src/components/`
- Talks to the backend → `client/src/services/<module>.service.js`. Pages never call `fetch` themselves.
- Pages never hard-code colours. Need a new colour? Add a token to `index.css` and tell M2.

**Backend** (every module has the same three files)

- `<module>.routes.js` → which URL goes to which function, and who's allowed (`requireAuth`, `requireRole`)
- `<module>.controller.js` → reads the request, calls the service, sends the response. No SQL.
- `<module>.service.js` → all SQL for that module. Nothing else touches those tables.

## API rules

- Success: send the shape from `docs/API.md`, exactly.
- Errors: always `{ "error": "Human-readable message" }` with the right status code.

| Code | When |
|---|---|
| 200 | OK |
| 201 | Created something |
| 400 | The request is missing or has wrong fields |
| 401 | Not logged in |
| 403 | Logged in but not allowed (wrong role) |
| 404 | That thing doesn't exist |
| 409 | Conflict (email already used) |
| 500 | Our bug |

## Changing something shared

`shared/`, `docs/API.md`, and the database schema affect everyone. To change them:

1. Say it in the team chat first ("I need a new booking status: `rescheduled`").
2. M1 makes the change for `shared/`, the owning backend person for `docs/API.md`, M5 for the database. Each in its own small PR.
3. Then you use it.

## Code style

- Prettier formats everything. Don't argue about spacing; run `npm run format`.
- Functions do one thing. If you need to scroll to read it, split it.
- Comment **why**, not **what**. `// OTP expires after 10 min because SMS can be slow` is useful.
- No `console.log` left in frontend code you push.
