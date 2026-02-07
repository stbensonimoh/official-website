#!/bin/bash

# Vercel Deployment Control Script
# Purpose: Only allow production builds when a Git Tag is pushed.

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == v* ]]; then
  echo "✅ Build requested for tag $VERCEL_GIT_COMMIT_REF. Proceeding with build..."
  exit 1 # Exit code 1 tells Vercel to proceed
else
  echo "🛑 Build skipped. Current ref ($VERCEL_GIT_COMMIT_REF) is not a release tag."
  exit 0 # Exit code 0 tells Vercel to skip
fi
