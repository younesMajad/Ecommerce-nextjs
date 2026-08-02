# E-Commerce Store

A modern, production-ready eCommerce platform built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **React:** 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (Email/Password, Magic Link, Google OAuth)
- **State:** Zustand (cart persistence)
- **Animations:** Framer Motion
- **Validation:** Zod
- **Notifications:** react-hot-toast

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd e-commerce-app
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- `NEXT_PUBLIC_SUPABASE_URL` — your project URL, e.g. `https://<ref>.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the publishable API key from **Project Settings → API** (safe to expose in the browser)

### 4. Database Setup

The app expects the following tables in your Supabase project:

| Table | Purpose |
| --- | --- |
| `products` | Product catalog (`id`, `title`, `description`, `price`, `image`, `category`, `created_at`) |
| `profiles` | User profiles, extends `auth.users` |
| `orders` | Order records |
| `wishlist` | User wishlists |
| `reviews` | Product reviews with ratings |

Run the user-features migration in your Supabase SQL Editor:

```
# File: supabase/migrations/002_user_features.sql
```

Then ensure a public read policy exists on `products`:

```sql
create policy "public read products" on products
  for select using (true);
```

Categories are not a separate table — they are derived from the distinct `category` values in `products`.

### 5. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

### Authentication
- Email/Password sign in & sign up
- Magic link (OTP) authentication
- Google OAuth
- Password reset flow
- Protected routes with middleware
- Session management

### Products
- Product listing from the live Supabase database
- Category filtering (derived from `products.category`)
- Search with debounce
- Sort by price and newest
- Price range filtering
- Product detail page with image gallery (`ImageOverview` component)
- Reviews and ratings

### Shopping Cart
- Add/remove items
- Update quantities
- Persisted to localStorage
- Cart count badge in navbar
- Mini cart preview

### Wishlist
- Add/remove from product cards
- Dedicated favorites page
- Synced with database

### Checkout
- Multi-step checkout flow
- Address form
- Shipping method selection
- Order review
- Order confirmation

### User Dashboard
- Profile management
- Order history
- Favorites

### Admin Dashboard
- Dashboard overview with stats
- Products CRUD
- Orders management

### Pages
- Home (Hero slider, categories, CTA)
- Shop (Products grid, filters, search)
- Product Detail (Image gallery, info, add to cart)
- Cart
- Checkout (Multi-step)
- Login / Signup
- Forgot / Reset Password
- Profile
- Orders
- Favorites
- About
- Contact
- 404 Not Found

### Performance
- Server Components by default
- Image optimization with Next.js Image
- Lazy loading
- SEO with metadata and OpenGraph

### Security
- Supabase Row Level Security (RLS)
- Middleware route protection
- Input validation with Zod
- CSRF protection via Supabase SSR
- Environment variable validation

## Project Structure

```
├── app/
│   ├── api/                    # API routes (products, categories, wishlist)
│   ├── admin/                  # Admin dashboard
│   ├── cart/                   # Shopping cart
│   ├── checkout/               # Checkout flow
│   ├── favorites/              # Wishlist page
│   ├── login/                  # Login page
│   ├── signup/                 # Signup page
│   ├── forgot-password/        # Forgot password
│   ├── reset-password/         # Reset password
│   ├── orders/                 # Order history
│   ├── profile/                # User profile
│   ├── shop/                   # Product listing
│   ├── product/                # Product detail
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── not-found.tsx           # 404 page
│   └── globals.css             # Global styles
├── components/
│   ├── store/                  # Zustand stores
│   ├── ImageOverview.tsx       # Reusable image gallery
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Header.tsx              # Hero slider
│   ├── ProductCard.tsx
│   └── ProductDetails.tsx
├── hooks/
│   └── index.ts                # Custom hooks
├── utils/
│   ├── action/                 # Server actions
│   ├── lib/                    # Utility functions
│   ├── supabase/               # Supabase clients
│   └── zodvalidations/         # Zod schemas
├── supabase/
│   └── migrations/             # SQL migrations
├── middleware.ts                # Route protection
├── shared.types.ts             # TypeScript types
└── next.config.ts              # Next.js config
```

## Deployment

### Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

