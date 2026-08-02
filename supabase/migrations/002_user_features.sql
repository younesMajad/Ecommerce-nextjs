-- ==============================================
-- User features: profiles, orders, wishlist, reviews
-- Matches the schema the app code expects
-- ==============================================

-- ==============================================
-- PROFILES (for roles, extends auth.users)
-- ==============================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  avatar_url text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles select own" on profiles
  for select using (auth.uid() = id);
create policy "profiles insert own" on profiles
  for insert with check (auth.uid() = id);
create policy "profiles update own" on profiles
  for update using (auth.uid() = id);

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ==============================================
-- ORDERS
-- ==============================================
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  user_email text,
  product_id bigint,
  product_name text not null,
  product_category text,
  amount_paid numeric(10,2) not null default 0,
  quantity_bought integer not null default 1,
  image_url text not null default '',
  status text not null default 'processing' check (status in ('processing', 'completed', 'cancelled', 'shipped', 'delivered', 'returned', 'waiting', 'reviewed')),
  size text,
  color text,
  region text,
  state text,
  city text,
  address text not null default '',
  phone text not null default '',
  reference_paystack text not null default '',
  country_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_user on orders(user_id);
create index if not exists idx_orders_created on orders(created_at desc);

alter table orders enable row level security;

create policy "orders select own" on orders
  for select using (auth.uid() = user_id);
create policy "orders insert own" on orders
  for insert with check (auth.uid() = user_id);

-- ==============================================
-- WISHLIST
-- ==============================================
create table if not exists wishlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id bigint references products(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create index if not exists idx_wishlist_user on wishlist(user_id);

alter table wishlist enable row level security;

create policy "wishlist select own" on wishlist
  for select using (auth.uid() = user_id);
create policy "wishlist insert own" on wishlist
  for insert with check (auth.uid() = user_id);
create policy "wishlist delete own" on wishlist
  for delete using (auth.uid() = user_id);

-- ==============================================
-- REVIEWS
-- ==============================================
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id bigint references products(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  title text not null default '',
  comment text not null default '',
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create index if not exists idx_reviews_product on reviews(product_id);
create index if not exists idx_reviews_user on reviews(user_id);

alter table reviews enable row level security;

create policy "reviews select all" on reviews
  for select using (true);
create policy "reviews insert own" on reviews
  for insert with check (auth.uid() = user_id);
create policy "reviews update own" on reviews
  for update using (auth.uid() = user_id);
create policy "reviews delete own" on reviews
  for delete using (auth.uid() = user_id);
