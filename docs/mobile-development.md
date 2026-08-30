# iPhone development — BIG CRUISE

Use **Cruise Deck** (the Grok remote workspace) from Safari as the iPhone console.
GitHub remains the source of truth. This repo deploys to Vercel on push to `main`.

## Loop

1. Open Cruise Deck and sign in.
2. Cut `feature/…` or `codex/…` from `main`.
3. Edit, save drafts, commit on the feature branch.
4. Open a pull request.
5. Dispatch CI from the Run tab (this `ci.yml`) or ask Grok to run gates.
6. Merge to `main` → Vercel production.

Never commit directly on `main`.

## Remote commands

GitHub Actions `workflow_dispatch` accepts `task`: lint, test, typecheck, build, all.

## Tokens

GitHub and Vercel tokens belong in Cruise Deck Settings, never in this repo.
