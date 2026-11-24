# Git workflow

## Folders vs branches (read this once)

These do two different jobs:

- **Folders** organise the code **forever**. Login lives in `client/src/pages/Login/` and stays there.
  When login breaks, you find it by folder.
- **Branches** hold **work in progress**. You make a branch for one task, finish it,
  merge it, and delete it. A branch is like a draft. The folder is where the finished work ends up.

So we don't keep a permanent "login branch". We keep a permanent **Login folder**,
and whoever is working on login opens a short-lived branch like `feature/login-page`.

## The three kinds of branches

```
main      ← stable. Only what works. This is what we demo. Only M4 merges into it, after M1 says OK.
  │
dev       ← everyone's finished work comes together here. Must always run.
  │
  ├── feature/login-page        ← one task = one branch (M2)
  ├── feature/search-page       ← (M3)
  ├── feature/auth-api          ← (M4)
  └── fix/otp-timer             ← bug fixes start with fix/
```

Branch names: `feature/<what>` for new work (documentation too: `feature/docs-<what>`), `fix/<what>` for bugs. Lowercase, dashes, no spaces.

## How you see your own tasks

Every task is a **GitHub Issue** assigned to you, with its branch already linked.
On GitHub: **Issues → filter "Assigned to me"**. Open an issue, and the branch for it is in the "Development" box on the right.

## Daily routine

```bash
# 1. Start of the day: get everyone's latest work
git checkout dev
git pull

# 2. Go to your task's branch (first time: it already exists on GitHub)
git fetch
git checkout feature/login-page
git merge dev                    # bring in the latest dev so you're not behind

# 3. Work, then save small steps often
git add client/src/pages/Login
git commit -m "feat(login): add email and password form"
git push

# 4. Task done? Open a Pull Request: base = dev, compare = your branch
```

## Pull requests

- Base branch is always **`dev`**, never `main`.
- Write `Closes #12` in the description (12 = issue number). The issue closes itself when merged.
- GitHub automatically asks the right owner to review (from `CODEOWNERS`).
- The automatic check (lint + build) must be green. If it's red, click "Details" to see what failed.
- After merge: delete the branch (GitHub shows a button).

**Keep PRs small.** One screen or one endpoint per PR is ideal. A 40-file PR nobody can review.

## Commit messages

```
feat(login): add password visibility toggle
fix(otp): resend timer didn't reset
style(navbar): match spacing to wireframe
docs(api): add booking response shape
```

Format: `type(area): what you did`. Types: `feat`, `fix`, `style`, `refactor`, `docs`, `chore`.
The area is the screen or module name, so `git log --grep="(otp)"` shows everything that ever touched OTP.

## Finding who broke what

```bash
git log --oneline -- client/src/pages/Otp       # every change to the OTP screen
git blame client/src/pages/Otp/Otp.jsx          # who wrote each line
```

## Merge conflicts

They happen when two people edit the same lines. Because everyone works in their own folders,
they should be rare. When one happens:

1. `git merge dev` on your branch.
2. Open the file. Git marks the clash with `<<<<<<<`, `=======`, `>>>>>>>`.
3. Keep the right code, delete the markers, `git add` and `git commit`.
4. If it's in someone else's file, ask them before choosing.

## Never

- Never push straight to `main` or `dev` (GitHub blocks it anyway).
- Never commit `.env` files, passwords, or `node_modules/`.
- Never commit 3D scan files (`.glb`, `.usdz`). They're huge. They go through the admin upload.
- Never `git push --force` on `dev` or `main`.
