-- Enable PostGIS
create extension if not exists postgis;
create extension if not exists pg_trgm;

-- Users/profiles
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid unique,
  display_name text,
  favorite_vibes text[] default '{}',
  availability jsonb,
  created_at timestamptz default now()
);

-- Spots
create table if not exists public.spots (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text,
  rating int check (rating between 1 and 5),
  busy_level text check (busy_level in ('low','medium','high')),
  accessibility jsonb,
  vibes text[] not null default '{}',
  is_420 boolean default false,
  geom geometry(point, 4326) not null,
  created_at timestamptz default now()
);
create index if not exists idx_spots_geom on public.spots using gist (geom);
create index if not exists idx_spots_vibes on public.spots using gin (vibes);

-- Reviews
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  spot_id uuid references public.spots(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  rating int not null check (rating between 1 and 5),
  text text,
  photos text[],
  created_at timestamptz default now()
);

-- Reports
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  spot_id uuid references public.spots(id) on delete cascade,
  reporter_id uuid references public.profiles(id) on delete set null,
  reason text not null,
  created_at timestamptz default now(),
  status text default 'queued'
);
