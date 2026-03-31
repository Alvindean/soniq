-- SONIQ — Grant permanent Studio access to company accounts
-- Run in Supabase: Dashboard → SQL Editor → New query
--
-- NOTE: These users must have signed up at mysoniq.com first.
-- If a user hasn't signed up yet, their row won't exist in auth.users
-- and this query will silently update 0 rows for that email.

UPDATE public.profiles
SET
  plan                  = 'studio',
  subscription_status   = 'active',
  plan_activated_at     = NOW()
WHERE id IN (
  SELECT id FROM auth.users
  WHERE email IN (
    'alvindean7@gmail.com',
    'thealvindean@gmail.com',
    'alvin@nuwavmedia.com'
  )
);

-- Confirm — should return 1 row per email that has signed up
SELECT
  u.email,
  p.plan,
  p.subscription_status,
  p.plan_activated_at
FROM auth.users u
JOIN public.profiles p ON p.id = u.id
WHERE u.email IN (
  'alvindean7@gmail.com',
  'thealvindean@gmail.com',
  'alvin@nuwavmedia.com'
)
ORDER BY u.email;
