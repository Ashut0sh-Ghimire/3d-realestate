#!/usr/bin/env bash
# One-time GitHub setup for the team. Needs the GitHub CLI (`gh`) logged in: gh auth login
#
#   ./scripts/setup-github.sh repo    Step 1: create the repo, push code, make dev branch,
#                                      invite the team, add labels, protect branches.
#   (everyone accepts the invite email / github.com/notifications)
#   ./scripts/setup-github.sh tasks   Step 2: create one assigned issue per screen/module,
#                                      each with its own linked branch off dev.
#
# Safe to re-run: labels are updated, existing issues with the same title are skipped.
set -euo pipefail
cd "$(dirname "$0")/.."

source scripts/team.conf
FULL="$OWNER/$REPO"
MEMBERS=("$M1" "$M2" "$M3" "$M4" "$M5")

say()  { printf '\n\033[1;32m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m  !\033[0m %s\n' "$*"; }

command -v gh >/dev/null || { echo "Install the GitHub CLI first (Arch: sudo pacman -S github-cli)"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Run: gh auth login"; exit 1; }
[[ "$OWNER" == "your-github-username" ]] && { echo "Fill in scripts/team.conf first."; exit 1; }

owner_of() { # M2 -> actual username
  case "$1" in M1) echo "$M1";; M2) echo "$M2";; M3) echo "$M3";; M4) echo "$M4";; M5) echo "$M5";; esac
}

step_repo() {
  say "Putting real usernames into CODEOWNERS and docs/TEAM.md"
  for m in M1 M2 M3 M4 M5; do
    u=$(owner_of "$m")
    sed -i "s/@$m\b/@$u/g" .github/CODEOWNERS
    sed -i "/\*\*$m\*\*/s/@_____/@$u/" docs/TEAM.md
  done

  say "Making the first commit"
  if [[ ! -d .git ]]; then
    git init -q -b main
  fi
  git add -A
  git commit -q -m "chore: project skeleton, docs and team setup" || warn "nothing new to commit"

  say "Creating $FULL on GitHub ($VISIBILITY) and pushing main"
  if gh repo view "$FULL" >/dev/null 2>&1; then
    warn "repo already exists, just pushing"
    git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$FULL.git"
    git push -u origin main
  else
    gh repo create "$FULL" "--$VISIBILITY" --source . --remote origin --push \
      --description "3D LiDAR property tours marketplace for Nepal (FYP)"
  fi

  say "Creating the dev branch and making it the default (PRs will target dev)"
  git branch -f dev main
  git push -u origin dev
  gh repo edit "$FULL" --default-branch dev --delete-branch-on-merge \
    --enable-issues --enable-wiki=false >/dev/null

  say "Inviting teammates"
  me=$(gh api user -q .login)
  for u in "${MEMBERS[@]}"; do
    [[ "$u" == "$me" ]] && continue
    gh api -X PUT "repos/$FULL/collaborators/$u" -f permission=push >/dev/null \
      && echo "  invited $u" || warn "could not invite $u (check the username)"
  done

  say "Creating labels"
  gh label create "type:feature"  --color 1f6f5c --description "New work"         -R "$FULL" --force >/dev/null
  gh label create "type:bug"      --color c0392b --description "Something broken" -R "$FULL" --force >/dev/null
  gh label create "side:frontend" --color 3b82f6 --description "client/"          -R "$FULL" --force >/dev/null
  gh label create "side:backend"  --color 8b5cf6 --description "server/"          -R "$FULL" --force >/dev/null
  gh label create "side:docs"     --color e8a33d --description "Documentation"    -R "$FULL" --force >/dev/null
  grep -v '^#' scripts/tasks.tsv | cut -f3 | tr ',' '\n' | grep -E '^(screen|api):' | sort -u |
    while read -r label; do
      gh label create "$label" --color ededed -R "$FULL" --force >/dev/null
    done
  echo "  done"

  say "Protecting main and dev (pull request + 1 approval + green CI required)"
  for b in main dev; do
    if gh api -X PUT "repos/$FULL/branches/$b/protection" --input - >/dev/null 2>&1 <<JSON
{
  "required_status_checks": { "strict": false, "contexts": ["lint-and-build"] },
  "enforce_admins": false,
  "required_pull_request_reviews": { "required_approving_review_count": 1, "dismiss_stale_reviews": true },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
JSON
    then echo "  $b protected"
    else warn "$b NOT protected. Private repos on a free plan can't use protection: make the repo public, or get GitHub Team via the Student Developer Pack."
    fi
  done

  say "Step 1 done."
  echo "  Ask everyone to accept the invite (email, or github.com/$FULL/invitations)."
  echo "  Then run:  ./scripts/setup-github.sh tasks"
}

step_tasks() {
  say "Checking everyone has accepted the invite"
  pending=$(gh api "repos/$FULL/invitations" -q '.[].invitee.login' 2>/dev/null || true)
  if [[ -n "$pending" ]]; then
    warn "Still waiting on: $(echo "$pending" | tr '\n' ' ')"
    warn "Their issues will be created unassigned. Re-run this later to retry, or assign them on GitHub."
  fi

  say "Creating one issue + one linked branch per task"
  existing=$(gh issue list -R "$FULL" --state all --limit 500 --json title -q '.[].title')
  grep -v '^#' scripts/tasks.tsv | while IFS=$'\t' read -r owner branch labels title body; do
    if grep -Fxq "$title" <<<"$existing"; then
      echo "  skip (exists): $title"; continue
    fi
    user=$(owner_of "$owner")
    full_body="$body

**Owner:** @$user ($owner, see docs/TEAM.md)
**Branch:** \`$branch\`  →  \`git fetch && git checkout $branch\`
**When done:** open a PR from \`$branch\` into \`dev\` and write \`Closes #<this issue number>\`."

    url=$(gh issue create -R "$FULL" --title "$title" --body "$full_body" \
            --label "type:feature,$labels" --assignee "$user" 2>/dev/null) \
      || url=$(gh issue create -R "$FULL" --title "$title" --body "$full_body" \
            --label "type:feature,$labels")
    num=${url##*/}
    gh issue develop "$num" -R "$FULL" --name "$branch" --base dev >/dev/null 2>&1 \
      || warn "branch $branch not linked (it may already exist)"
    printf '  #%-3s %-28s %-32s @%s\n' "$num" "$title" "$branch" "$user"
  done

  say "Done. Everyone can now open github.com/$FULL/issues/assigned/<their-username>"
}

case "${1:-}" in
  repo)  step_repo ;;
  tasks) step_tasks ;;
  *) sed -n '2,10p' "$0" | sed 's/^# \{0,1\}//'; exit 1 ;;
esac
