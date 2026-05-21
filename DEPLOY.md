# Deployment

The site is deployed to Cloudflare Workers via GitHub Actions.

## Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Workers edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID (found in dashboard sidebar) |

## Required GitHub Variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_CLARITY_TRACKING_ID` | Microsoft Clarity analytics tracking ID |

## Deploy Triggers

- **Push to `main`** — automatic production deploy
- **Pull request to `main`** — no deploy (CI runs lint, typecheck, build, test)
- **Manual dispatch** — trigger from the Actions tab (`workflow_dispatch`)

## Manual Deploy

```bash
bun run build && npx wrangler deploy
```

## Preview Deployments

Push to any branch and deploy manually:

```bash
bun run build && npx wrangler deploy
```

## Local Development

```bash
bun run dev        # Start dev server (uses platform proxy for Cloudflare bindings)
bun run build      # Production build
bun run preview    # Build + preview locally
```

## Project Setup (One-time)

The Worker and bindings are auto-provisioned by `wrangler deploy`. The custom domain `stbensonimoh.com` is bound to the `official-website` Worker.
