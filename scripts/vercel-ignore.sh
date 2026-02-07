#!/bin/bash

# Vercel Deployment Control Script
# Purpose: Restrict production builds to Git Tags while allowing Preview builds.

echo "VERCEL_ENV: $VERCEL_ENV"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_ENV" == "production" ]]; then
  if [[ "$VERCEL_GIT_COMMIT_REF" == v* ]]; then
    echo "✅ Production build requested for tag $VERCEL_GIT_COMMIT_REF. Proceeding..."
    exit 1 # Proceed
  else
    echo "🛑 Production build skipped. Production only allows release tags (v*)."
    exit 0 # Skip
  fi
else
  echo "✅ Non-production environment ($VERCEL_ENV). Proceeding with Preview build..."
  exit 1 # Proceed
fi
