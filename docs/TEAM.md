# Team & ownership

Five people. Every screen, module and document has exactly **one owner**.
The owner builds it, fixes its bugs, and reviews other people's changes to it
(GitHub enforces this through `.github/CODEOWNERS`).

The full plan, with every task explained step by step, is **`docs/TEAM-WORK-PLAN.docx`**.
This page is the short version.

| Code | Name | Role | GitHub |
|---|---|---|---|
| **M1** | Ashutosh Ghimire | Team lead · 3D tours · Admin screens | @Ashut0sh-Ghimire |
| **M2** | Simon Khatri | Frontend: accounts & chat · **extra:** technical docs | @khatri69simon-ui |
| **M3** | Nirmal Yadav | Frontend: marketplace · **extra:** report docs | @nirmalyadav-eng |
| **M4** | Ashutosh Karki | Backend: auth & listings · **extra:** GitHub setup & care | @ashut000sh |
| **M5** | Purshottam Yadav | Backend: scans, bookings, chat, admin, database | @yadavpurshotam071-droid |

Everyone has the same amount of core coding. Ashutosh Karki, Simon Khatri and Nirmal Yadav each have one extra job on top.

---

## M1 · Ashutosh Ghimire · Team lead, 3D tours, admin screens

- **Screens:** `Tour` (3D viewer + measure tool), `AdminDashboard`
- **Also owns:** the 3D scan pipeline (iPhone LiDAR → `.glb` → upload), `shared/`, `client/src/services/admin.service.js`
- **Lead:** runs the weekly meeting, decides scope, says OK before `dev` is merged into `main`

## M2 · Simon Khatri · Frontend, accounts & chat

- **Screens:** `Splash`, `Onboarding`, `Signup`, `Login`, `Otp`, `Chat`, `NotFound`
- **Also owns:** `client/src/components/` (except ListingCard), `styles/`, `layouts/`, `hooks/useAuth.jsx`, `services/api.js`, `auth.service.js`, `chat.service.js`
- **Extra, technical docs:** `README.md`, `docs/SETUP.md`, `docs/DATABASE.md`, `docs/TESTING.md`, keeps `docs/` tidy

## M3 · Nirmal Yadav · Frontend, marketplace

- **Screens:** `Home`, `Search`, `Listing`, `Compare`, `Booking`, `ScanRequest`
- **Also owns:** `components/ListingCard.jsx`, `listings.service.js`, `bookings.service.js`, `scans.service.js`
- **Extra, report docs:** FYP final report, `docs/meetings/`, `docs/PROGRESS.md`, `docs/USER-MANUAL.md`, references (APA 7), defence slides

## M4 · Ashutosh Karki · Backend, auth & listings

- **Modules:** `server/src/modules/auth/`, `server/src/modules/listings/`, `server/src/middleware/` (JWT)
- **Extra, GitHub:** creates the repo, branches, invites, labels, issues, branch protection; keeps CI green; merges `dev` into `main`; helps with git problems

## M5 · Purshottam Yadav · Backend, operations & database

- **Modules:** `scans/` (including 3D tour upload), `bookings/`, `chat/` (REST + Socket.IO), `admin/`
- **Also owns:** `server/db/` (migrations + `seed.js` sample data)

---

## Timeline

| Phase | Weeks | Goal |
|---|---|---|
| 0 | 1 | Repo live, everyone runs the project, sample data loaded |
| 1 | 2 to 4 | Shared components, auth API, first screens on fake data, first 3D scan in the browser |
| 2 | 5 to 8 | All screens and all endpoints built |
| 3 | 9 to 11 | Frontend connected to real API, full scan → tour flow works |
| 4 | 12 to 14 | Testing, bug fixes, report, slides, demo |

Ashutosh Ghimire puts real dates on these weeks.

## Agreements

- Need something in another person's area? **Open an issue and assign them.** Don't edit their files quietly.
- New constant, status or endpoint? Say it in the team chat first. It goes into `shared/` and `docs/API.md` **before** anyone uses it.
- Stuck for more than a day? Say so in the chat. That's normal.
