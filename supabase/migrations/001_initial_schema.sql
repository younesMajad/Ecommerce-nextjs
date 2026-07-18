-- ==============================================
-- E-Commerce Database Schema
-- Supabase PostgreSQL Migration
-- ==============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==============================================
-- 1. PROFILES TABLE
-- ==============================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ==============================================
-- 2. CATEGORIES TABLE
-- ==============================================
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamptz not null default now()
);

-- ==============================================
-- 3. PRODUCTS TABLE
-- ==============================================
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references profiles(id) on delete set null,
  name text not null,
  description text not null default '',
  price numeric(10,2) not null default 0,
  offer_price numeric(10,2) not null default 0,
  discount numeric(5,2) not null default 0,
  quantity integer not null default 0,
  brand text not null default '',
  status text not null default 'active' check (status in ('active', 'inactive', 'draft')),
  location text not null default '',
  product_shipping_fee numeric(10,2) not null default 0,
  product_comment text not null default '',
  sizes text[] default '{}',
  colors text[] default '{}',
  styles text[] default '{}',
  image_url_array text[] default '{}',
  videos_url_array text[] default '{}',
  category_id uuid references categories(id) on delete set null,
  average_rating numeric(3,2) default 0,
  review_count integer default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ==============================================
-- 4. REVIEWS TABLE
-- ==============================================
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,
  product_id uuid references products(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  title text not null default '',
  comment text not null default '',
  created_at timestamptz not null default now(),
  unique(user_id, product_id)
);

-- ==============================================
-- 5. ADDRESSES TABLE
-- ==============================================
create table if not exists addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,
  title text,
  region text default 'US',
  address text,
  state text,
  city text,
  phone text,
  country_code text,
  flag text,
  is_default boolean default false,
  created_at timestamptz not null default now()
);

-- ==============================================
-- 6. ORDERS TABLE
-- ==============================================
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete set null,
  user_email text,
  product_id uuid references products(id) on delete set null,
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

-- ==============================================
-- 7. WISHLIST TABLE
-- ==============================================
create table if not exists wishlist (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,
  product_id uuid references products(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  unique(user_id, product_id)
);

-- ==============================================
-- 8. COUPONS TABLE
-- ==============================================
create table if not exists coupons (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  discount_percent numeric(5,2) not null default 0,
  max_uses integer not null default 100,
  used_count integer not null default 0,
  min_order_amount numeric(10,2) not null default 0,
  expires_at timestamptz not null,
  is_active boolean default true,
  created_at timestamptz not null default now()
);

-- ==============================================
-- 9. INVENTORY TABLE
-- ==============================================
create table if not exists inventory (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade not null,
  quantity integer not null default 0,
  reserved integer not null default 0,
  updated_at timestamptz not null default now()
);

-- ==============================================
-- 10. NOTIFICATIONS TABLE
-- ==============================================
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  is_read boolean default false,
  type text not null default 'system' check (type in ('order', 'promotion', 'system')),
  created_at timestamptz not null default now()
);

-- ==============================================
-- INDEXES
-- ==============================================
create index if not exists idx_products_category on products(category_id);
create index if not exists idx_products_created on products(created_at desc);
create index if not exists idx_products_offer_price on products(offer_price);
create index if not exists idx_orders_user on orders(user_id);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_orders_created on orders(created_at desc);
create index if not exists idx_reviews_product on reviews(product_id);
create index if not exists idx_reviews_user on reviews(user_id);
create index if not exists idx_wishlist_user on wishlist(user_id);
create index if not exists idx_addresses_user on addresses(user_id);
create index if not exists idx_notifications_user on notifications(user_id);
create index if not exists idx_coupons_code on coupons(code);

-- ==============================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================
alter table profiles enable row level security;
alter table products enable row level security;
alter table reviews enable row level security;
alter table addresses enable row level security;
alter table orders enable row level security;
alter table wishlist enable row level security;
alter table coupons enable row level security;
alter table inventory enable row level security;
alter table notifications enable row level security;
alter table categories enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Products policies (public read, admin write)
create policy "Products are viewable by everyone" on products for select using (true);
create policy "Admins can insert products" on products for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update products" on products for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete products" on products for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Categories policies (public read, admin write)
create policy "Categories are viewable by everyone" on categories for select using (true);
create policy "Admins can manage categories" on categories for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Reviews policies
create policy "Reviews are viewable by everyone" on reviews for select using (true);
create policy "Authenticated users can insert reviews" on reviews for insert with check (auth.uid() = user_id);
create policy "Users can update own reviews" on reviews for update using (auth.uid() = user_id);
create policy "Users can delete own reviews" on reviews for delete using (auth.uid() = user_id);

-- Addresses policies
create policy "Users can view own addresses" on addresses for select using (auth.uid() = user_id);
create policy "Users can insert own addresses" on addresses for insert with check (auth.uid() = user_id);
create policy "Users can update own addresses" on addresses for update using (auth.uid() = user_id);
create policy "Users can delete own addresses" on addresses for delete using (auth.uid() = user_id);

-- Orders policies
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can create own orders" on orders for insert with check (auth.uid() = user_id);
create policy "Admins can view all orders" on orders for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update orders" on orders for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Wishlist policies
create policy "Users can view own wishlist" on wishlist for select using (auth.uid() = user_id);
create policy "Users can manage own wishlist" on wishlist for all using (auth.uid() = user_id);

-- Coupons policies (public read for validation, admin write)
create policy "Active coupons are viewable by everyone" on coupons for select using (is_active = true);
create policy "Admins can manage coupons" on coupons for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Inventory policies (admin only)
create policy "Inventory viewable by admins" on inventory for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can manage inventory" on inventory for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Notifications policies
create policy "Users can view own notifications" on notifications for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on notifications for update using (auth.uid() = user_id);
create policy "System can create notifications" on notifications for insert with check (true);

-- ==============================================
-- FUNCTIONS & TRIGGERS
-- ==============================================

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

create trigger update_products_updated_at
  before update on products
  for each row execute function update_updated_at();

create trigger update_orders_updated_at
  before update on orders
  for each row execute function update_updated_at();

-- Auto-create profile on user signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Update product rating on review insert/update/delete
create or replace function update_product_rating()
returns trigger as $$
begin
  update products
  set
    average_rating = coalesce((select avg(rating)::numeric(3,2) from reviews where product_id = coalesce(NEW.product_id, OLD.product_id)), 0),
    review_count = (select count(*)::integer from reviews where product_id = coalesce(NEW.product_id, OLD.product_id))
  where id = coalesce(NEW.product_id, OLD.product_id);
  return coalesce(NEW, OLD);
end;
$$ language plpgsql security definer;

create trigger on_review_change
  after insert or update or delete on reviews
  for each row execute function update_product_rating();

-- ==============================================
-- SEED DATA (Optional)
-- ==============================================

-- Insert default categories
insert into categories (name, slug, description) values
  ('Headphones', 'headphones', 'Premium headphones and earbuds'),
  ('Phones', 'phones', 'Latest smartphones'),
  ('Laptops', 'laptops', 'Powerful laptops and notebooks'),
  ('Cameras', 'cameras', 'Professional cameras and accessories'),
  ('Watches', 'watches', 'Smart watches and accessories'),
  ('Gaming', 'gaming', 'Gaming consoles and accessories')
on conflict (slug) do nothing;
