# Deployment

The site is deployed to Cloudflare Pages via GitHub Actions.

## Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Pages edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID (found in dashboard sidebar) |

## Required GitHub Variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_CLARITY_TRACKING_ID` | Microsoft Clarity analytics tracking ID |

## Deploy Triggers

- **Push to `main`** — automatic production deploy
- **Pull request to `main`** — preview deploy on a `.pages.dev` URL
- **Manual dispatch** — trigger from the Actions tab (`workflow_dispatch`)

## Manual Deploy

1. Go to **Actions → Deploy to Cloudflare Pages**
2. Click **Run workflow**
3. Select the branch → **Run workflow**

## Preview Deployments

Every pull request to `main` gets a preview URL at `<branch>.stbensonimoh-com.pages.dev`. The URL is posted as a comment on the PR by the deploy workflow.

## Local Development

```bash
bun run dev        # Start dev server (uses platform proxy for Cloudflare bindings)
bun run build      # Production build
bun run preview    # Build + serve with wrangler pages dev
```

## Project Setup (One-time)

The Cloudflare Pages project must exist before the first deploy:

```bash
npx wrangler pages project create stbensonimoh-com --production-branch=main
```
