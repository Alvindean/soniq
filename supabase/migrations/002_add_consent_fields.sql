-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 002: Add legal consent fields to profiles table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- Add consent tracking fields to profiles
alter table public.profiles
  add column if not exists terms_accepted      boolean not null default false,
  add column if not exists terms_version       text,
  add column if not exists terms_accepted_at   timestamptz,
  add column if not exists terms_accepted_ip   text,
  add column if not exists age_verified        boolean not null default false,
  add column if not exists cookie_consent      boolean not null default true,
  add column if not exists cookie_consent_at   timestamptz;

-- Backfill existing users: mark as accepted (grandfathered — no prior gate existed)
-- This prevents breaking existing logged-in users.
update public.profiles
set
  terms_accepted    = true,
  terms_version     = 'v1.0',
  terms_accepted_at = now(),
  age_verified      = true
where terms_accepted = false;

-- ─────────────────────────────────────────────────────────────────────────────
-- Update auto-create profile trigger to capture consent from signup metadata
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (
    id,
    email,
    display_name,
    terms_accepted,
    terms_version,
    terms_accepted_at,
    age_verified
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    coalesce((new.raw_user_meta_data->>'terms_accepted')::boolean, false),
    coalesce(new.raw_user_meta_data->>'terms_version', 'v1.0'),
    case
      when (new.raw_user_meta_data->>'terms_accepted')::boolean = true then now()
      else null
    end,
    coalesce((new.raw_user_meta_data->>'age_verified')::boolean, false)
  );
  return new;
end;
$$;

-- Re-attach the trigger (drop + recreate to pick up function changes)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────────────────────
-- RLS: allow users to read/update their own consent fields
-- (profiles RLS should already allow this — just confirming)
-- ─────────────────────────────────────────────────────────────────────────────
-- If RLS is enabled, ensure the existing SELECT/UPDATE policies cover the new columns.
-- No new policies needed — existing "users can read/update own row" covers them.
