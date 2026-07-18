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

### 4. Database Setup

Run the SQL migration in your Supabase SQL Editor:

```bash
# File: supabase/migrations/001_initial_schema.sql
```

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
- Product listing with pagination
- Category filtering
- Search with debounce
- Sort by price, popularity, newest
- Price range filtering
- Product detail page with image gallery
- Related products
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
- Categories management
- Orders management
- Users list
- Coupons management
- Reviews moderation
- Store settings

### Pages
- Home (Hero slider, categories, CTA)
- Shop (Products grid, filters, search)
- Product Detail (Gallery, info, add to cart)
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
- Skeleton loading states
- SEO with metadata, OpenGraph, sitemap, robots.txt
- Streaming with Suspense

### Security
- Supabase Row Level Security (RLS)
- Middleware route protection
- Input validation with Zod
- CSRF protection via Supabase SSR
- Environment variable validation

## Project Structure

```
├── app/
│   ├── api/                    # API routes
│   ├── admin/                  # Admin dashboard
│   ├── auth/                   # Auth callback
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
│   ├── about/                  # About page
│   ├── contact/                # Contact page
│   ├── product/                # Product detail
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── not-found.tsx           # 404 page
│   ├── sitemap.ts              # Sitemap
│   ├── robots.ts               # Robots.txt
│   └── globals.css             # Global styles
├── components/
│   ├── store/                  # Zustand stores
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Header.tsx              # Hero slider
│   ├── ProductCard.tsx
│   ├── HomeProducts.tsx
│   └── ProductDetails.tsx
├── context/
│   └── App.Context.tsx         # React context
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

## Database Schema

The database includes the following tables:

- **profiles** - User profiles (extends auth.users)
- **products** - Product catalog
- **categories** - Product categories
- **reviews** - Product reviews with ratings
- **orders** - Order records
- **wishlist** - User wishlists
- **addresses** - Saved addresses
- **coupons** - Discount coupons
- **inventory** - Stock tracking
- **notifications** - User notifications

See `supabase/migrations/001_initial_schema.sql` for the full schema.

## Deployment

### Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Supabase

1. Create a new Supabase project
2. Run the migration SQL
3. Enable Auth providers (Google OAuth)
4. Configure RLS policies

## License

MIT
