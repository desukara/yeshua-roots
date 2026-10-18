-- Proposed schema only. NOT applied to production.
-- Do not enable prayer submissions until auth, access review, and moderation are ready.
create table public.member_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 80),
  created_at timestamptz not null default now()
);
create table public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  request_text text not null check (char_length(request_text) between 10 and 5000),
  status text not null default 'submitted' check (status in ('submitted','withdrawn')),
  created_at timestamptz not null default now()
);
create index prayer_requests_owner_created_idx on public.prayer_requests (user_id, created_at desc);
alter table public.member_profiles enable row level security;
alter table public.prayer_requests enable row level security;
revoke all on public.member_profiles, public.prayer_requests from anon;
grant select, insert on public.member_profiles, public.prayer_requests to authenticated;
grant update (display_name) on public.member_profiles to authenticated;
grant update (status) on public.prayer_requests to authenticated;
create policy "Profile owner reads" on public.member_profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "Profile owner inserts" on public.member_profiles for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Profile owner updates" on public.member_profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Prayer owner reads" on public.prayer_requests for select to authenticated using ((select auth.uid()) = user_id);
create policy "Prayer owner inserts" on public.prayer_requests for insert to authenticated with check ((select auth.uid()) = user_id and status = 'submitted');
create policy "Prayer owner withdraws" on public.prayer_requests for update to authenticated using ((select auth.uid()) = user_id and status = 'submitted') with check ((select auth.uid()) = user_id and status = 'withdrawn');
-- No policy grants anyone else access. A separate reviewed access model
-- is required before a prayer team can view requests.
