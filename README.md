# HiFinder

A geosocial map to share relaxing/vibe spots, leave feedback, and match with friends based on vibe preferences—plus.

## Stack
- Next.js 14 (App Router)
- Supabase (Auth, Postgres, Storage)
- Mapbox GL + Supercluster
- PostGIS + FTS
- PostHog, Sentry

## Setup
1. Copy .env.example to .env.local and fill values:
`
copy .env.example .env.local
`
2. Install deps and run dev:
`
npm i
npm run dev
`
3. In Supabase: enable PostGIS, run schema in prisma/supabase.sql.
4. Set auth callback URL to NEXT_PUBLIC_SITE_URL.

## Dev Notes
- API routes: pp/api/*.
- Map: src/components/Map.tsx.
- 420 layer is opt-in, age-gated, and geofenced via REGION_ALLOWLIST.

## Cost controls
- Supabase: use Row Level Security; avoid RPC loops; set usage limits/alerts in Project Settings → Billing → Spend caps and alerts; use server-side rate limits (added) and avoid polling.
- Mapbox: set URL-restricted public tokens, enable usage caps in your Mapbox account; keep zoom modest and cluster client-side to reduce tile requests.
- App: RATE_LIMIT_MAX/Window are in .env.local. Default is 60 req/min per client.
