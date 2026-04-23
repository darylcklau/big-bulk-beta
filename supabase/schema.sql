create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.workout_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  exercise text not null,
  reps integer not null check (reps > 0),
  weight numeric(8,2) not null check (weight >= 0),
  unit text not null check (unit in ('kg', 'lb')),
  volume numeric(10,2) not null check (volume >= 0),
  source text not null default 'typed' check (source in ('typed', 'voice')),
  notes text,
  performed_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.users(id) on delete cascade,
  addressee_id uuid not null references public.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected', 'blocked')),
  can_compare_progress boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (requester_id, addressee_id)
);

create index if not exists workout_logs_user_performed_at_idx on public.workout_logs (user_id, performed_at desc);
create index if not exists workout_logs_user_exercise_idx on public.workout_logs (user_id, exercise);
create index if not exists friendships_requester_idx on public.friendships (requester_id);
create index if not exists friendships_addressee_idx on public.friendships (addressee_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, display_name)
  values (new.id, new.email, split_part(coalesce(new.email, ''), '@', 1))
  on conflict (id) do update
  set email = excluded.email,
      updated_at = timezone('utc', now());

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.users enable row level security;
alter table public.workout_logs enable row level security;
alter table public.friendships enable row level security;

create policy "Users can view their own profile"
on public.users
for select
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.users
for update
using (auth.uid() = id);

create policy "Users can insert their own profile"
on public.users
for insert
with check (auth.uid() = id);

create policy "Users can read their own workout logs"
on public.workout_logs
for select
using (auth.uid() = user_id);

create policy "Users can create their own workout logs"
on public.workout_logs
for insert
with check (auth.uid() = user_id);

create policy "Users can update their own workout logs"
on public.workout_logs
for update
using (auth.uid() = user_id);

create policy "Users can delete their own workout logs"
on public.workout_logs
for delete
using (auth.uid() = user_id);

create policy "Users can view their own friendships"
on public.friendships
for select
using (auth.uid() = requester_id or auth.uid() = addressee_id);

-- Future roadmap:
-- 1. Add invitation and acceptance flows around public.friendships.
-- 2. Gate progression comparisons behind can_compare_progress.
-- 3. Add export_jobs and coaching_insights tables without widening read access.
