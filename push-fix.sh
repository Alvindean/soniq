#!/bin/bash
# One-shot push script — removes lock files and pushes the layout fix
echo "🔧 Removing stale git lock files..."
rm -f .git/index.lock .git/HEAD.lock .git/refs/heads/main.lock .git/objects/maintenance.lock 2>/dev/null
echo "✅ Lock files cleared"

echo "📦 Staging changes..."
git add public/index.html api/analytics.js

echo "💾 Committing..."
git commit -m "fix: UX Grid System — body-level sidebar offset + centered content

- body padding-left:64px at >=901px (sidebar offset at body level)
- .wrap: max-width:1400px, margin:0 auto, clamp(2rem,4vw,4rem) padding
- Removed max-width:none from Community and Profile pages
- Removed ad rail 1500px+ breakpoint
- Profile banner horizontal padding zeroed (inherits from .wrap)
- Analytics API error hardening (safeFetch wrapper)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Done! Vercel will auto-deploy in ~30 seconds."
