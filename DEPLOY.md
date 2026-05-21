# Deployment

The site is deployed to Cloudflare Workers via GitHub Actions.

## Workflow

The `.github/workflows/ci.yml` workflow has two jobs:

1. **`quality`** — Runs on every PR and push to `main`: lint, typecheck, test, build
2. **`deploy`** — Runs only on push to `main`, **gated behind `quality` passing**: build, `wrangler deploy`

Deployment only triggers after the quality gate passes — no broken code reaches production.

## Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Workers edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |

## Required GitHub Variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_CLARITY_TRACKING_ID` | Microsoft Clarity analytics tracking ID |

## Manual Deploy

```bash
bun run build && npx wrangler deploy
```

## Local Development

```bash
bun run dev        # Start dev server (platform proxy for Cloudflare bindings)
bun run build      # Production build
bun test           # Run tests
bun astro check    # Type check
```
