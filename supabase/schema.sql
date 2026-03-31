-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── PROFILES ──────────────────────────────────────────────────
-- Extends Supabase auth.users
create table if not exists public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  display_name  text,
  artist_name   text,
  email         text,
  pro_affiliation text,     -- bmi, ascap, sesac, socan, prs, none
  ipi_number    text,
  plan          text not null default 'free' check (plan in ('free','pro','studio')),
  songs_today   int not null default 0,
  songs_today_reset date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─── SONGS ─────────────────────────────────────────────────────
create table if not exists public.songs (
  id            text primary key,   -- matches S.currentSong.id from frontend
  user_id       uuid references auth.users(id) on delete set null,
  title         text not null,
  lyrics        text,
  genre         text,
  topic         text,
  style_prompt  text,
  isrc          text,
  hook_score    int,
  word_count    int,
  section_count int,
  variant_of    text references public.songs(id) on delete set null,
  created_at    timestamptz not null default now()
);

-- ─── PUBLISHING REGISTRATIONS ──────────────────────────────────
create table if not exists public.publishing_registrations (
  id                uuid default gen_random_uuid() primary key,
  user_id           uuid references auth.users(id) on delete set null,
  song_id           text references public.songs(id) on delete set null,
  title             text not null,
  isrc              text,
  writer_name       text not null,
  pro               text not null,
  ipi               text,
  tier              text not null check (tier in ('admin','copub','sync')),
  soniq_share       int not null,
  writer_share      int not null,
  publisher_name    text not null default 'Nu Wav Media LLC',
  publisher_owner   text not null default 'Alvin Dean Warren',
  genre             text,
  topic             text,
  status            text not null default 'pending'
                      check (status in ('pending','registered','active','cancelled')),
  -- E-SIGN consent capture
  consent_ip        text,
  consent_timestamp timestamptz not null default now(),
  terms_version     text not null default 'v1.0',
  -- Admin
  pro_confirmation  text,   -- confirmation # from BMI/ASCAP after registration
  registered_at     timestamptz,
  notes             text,
  created_at        timestamptz not null default now()
);

-- ─── ROYALTY EVENTS ────────────────────────────────────────────
create table if not exists public.royalty_events (
  id                uuid default gen_random_uuid() primary key,
  registration_id   uuid references public.publishing_registrations(id) on delete cascade,
  user_id           uuid references auth.users(id) on delete set null,
  event_type        text not null
                      check (event_type in ('stream','sync','performance','mechanical','digital','other')),
  source            text,    -- spotify, bmi_statement, sync_placement, etc.
  gross_amount      numeric(10,2) not null default 0,
  soniq_amount      numeric(10,2) not null default 0,
  writer_amount     numeric(10,2) not null default 0,
  currency          text not null default 'usd',
  period_start      date,
  period_end        date,
  status            text not null default 'pending'
                      check (status in ('pending','processing','paid')),
  paid_at           timestamptz,
  statement_ref     text,   -- reference to source statement
  notes             text,
  created_at        timestamptz not null default now()
);

-- ─── PAYOUTS ───────────────────────────────────────────────────
create table if not exists public.payouts (
  id                uuid default gen_random_uuid() primary key,
  user_id           uuid references auth.users(id) on delete set null,
  amount            numeric(10,2) not null,
  currency          text not null default 'usd',
  method            text check (method in ('stripe','paypal','check','wire')),
  stripe_transfer_id text,
  status            text not null default 'pending'
                      check (status in ('pending','processing','paid','failed')),
  period_start      date,
  period_end        date,
  paid_at           timestamptz,
  created_at        timestamptz not null default now()
);

-- ─── INDEXES ───────────────────────────────────────────────────
create index if not exists idx_songs_user_id on public.songs(user_id);
create index if not exists idx_songs_created_at on public.songs(created_at desc);
create index if not exists idx_pub_reg_user_id on public.publishing_registrations(user_id);
create index if not exists idx_pub_reg_song_id on public.publishing_registrations(song_id);
create index if not exists idx_pub_reg_status on public.publishing_registrations(status);
create index if not exists idx_royalty_reg_id on public.royalty_events(registration_id);
create index if not exists idx_royalty_user_id on public.royalty_events(user_id);
create index if not exists idx_payouts_user_id on public.payouts(user_id);

-- ─── UPDATED_AT TRIGGER ────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();

-- ─── AUTO-CREATE PROFILE ON SIGNUP ────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
