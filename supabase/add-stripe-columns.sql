-- SONIQ — Add Stripe subscription columns to profiles
-- Run this in Supabase SQL Editor: Dashboard → SQL Editor → New query

-- Add Stripe columns to profiles (safe — uses IF NOT EXISTS logic)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id      TEXT,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id  TEXT,
  ADD COLUMN IF NOT EXISTS subscription_status     TEXT DEFAULT 'inactive',
  ADD COLUMN IF NOT EXISTS plan_activated_at        TIMESTAMPTZ;

-- Index for fast webhook lookups
CREATE INDEX IF NOT EXISTS profiles_stripe_customer_idx
  ON public.profiles (stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS profiles_stripe_subscription_idx
  ON public.profiles (stripe_subscription_id)
  WHERE stripe_subscription_id IS NOT NULL;

-- Confirm
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name   = 'profiles'
  AND column_name IN (
    'plan', 'stripe_customer_id', 'stripe_subscription_id',
    'subscription_status', 'plan_activated_at'
  )
ORDER BY column_name;
