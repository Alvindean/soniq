-- ─── ROW LEVEL SECURITY ────────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.songs enable row level security;
alter table public.publishing_registrations enable row level security;
alter table public.royalty_events enable row level security;
alter table public.payouts enable row level security;

-- PROFILES: users can read/update their own profile only
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- SONGS: users can CRUD their own songs
create policy "songs_select_own" on public.songs
  for select using (auth.uid() = user_id);
create policy "songs_insert_own" on public.songs
  for insert with check (auth.uid() = user_id);
create policy "songs_update_own" on public.songs
  for update using (auth.uid() = user_id);
create policy "songs_delete_own" on public.songs
  for delete using (auth.uid() = user_id);

-- PUBLISHING REGISTRATIONS: users see/create their own; service role manages status
create policy "pub_reg_select_own" on public.publishing_registrations
  for select using (auth.uid() = user_id);
create policy "pub_reg_insert_own" on public.publishing_registrations
  for insert with check (auth.uid() = user_id);

-- ROYALTY EVENTS: users can only read their own
create policy "royalty_select_own" on public.royalty_events
  for select using (auth.uid() = user_id);

-- PAYOUTS: users can only read their own
create policy "payouts_select_own" on public.payouts
  for select using (auth.uid() = user_id);
