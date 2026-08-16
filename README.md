# ⚡️ Premium Next.js 16 E-Commerce Platform

A modern, production-ready, full-stack E-Commerce storefront featuring a high-performance shopping experience. Powered by the latest web technologies, this platform delivers instant page transitions, seamless user authentication, and real-time database synchronization.


---

## 🚀 Tech Stack & Core Technologies

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Server Components, Streaming, API routes, and optimized assets |
| **Frontend Library** | **React 19** | Modern UI primitives and improved server-action support |
| **Language** | **TypeScript** | Absolute type-safety across client, actions, and API layers |
| **Styling** | **Tailwind CSS v4** | Rapid, utility-first layouts with zero-runtime compilation overhead |
| **Database** | **Supabase (PostgreSQL)** | Persistent storage, real-time sync, and relational performance |
| **Authentication** | **Supabase Auth & SSR** | Secure cookie-based sessions, Magic Links, and Social OAuth |
| **State Management** | **Zustand** | Light, lightning-fast client-side cart state with local persistence |
| **Form Validation** | **Zod** | Schema-driven client and server input sanitization |
| **Animations** | **Framer Motion** | Silky smooth animations, transitions, and micro-interactions |
| **Notifications** | **React Hot Toast** | Non-blocking, beautiful feedback for user behaviors |

---

## 🛠️ Getting Started & Installation

Follow these steps to spin up the application in a local development environment.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.x or later) and [pnpm](https://pnpm.io/) installed.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd e-commerce-app
```

### 2. Install Dependencies
This project uses **pnpm workspaces** for dependency orchestration. Run the following command at the root folder:
```bash
pnpm install
```

### 3. Configure Environment Variables
Copy the template file to create your local environment file:
```bash
cp .env.example .env.local
```
Open `.env.local` and fill in your Supabase configuration:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
- **`NEXT_PUBLIC_SUPABASE_URL`**: Your project API Endpoint (found in Supabase Dashboard → Project Settings → API).
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: The safe, client-side publishable key (found under the same API page).
- **`NEXT_PUBLIC_SITE_URL`**: Used by auth redirects and metadata links (defaults to `http://localhost:3000` for local testing).

---

## 🗄️ Database Setup & Migrations

To get the backend ready, you must initialize your Supabase instance with the provided SQL migrations.

### 1. Apply Schema Migrations
In the Supabase SQL Editor, run the contents of the following files in order:
1. **`supabase/migrations/001_initial_schema.sql`** — Initializes the base tables (`profiles`, `categories`, `products`, `reviews`, `addresses`, `orders`, `wishlist`, `coupons`, `inventory`, `notifications`).
2. **`supabase/migrations/002_user_features.sql`** — Sets up triggers to automatically create database profile rows on auth signup, and configures primary user tables.

### 2. Set Row-Level Security (RLS)
The database enforces RLS for maximum client security. Ensure a public read policy is active on the `products` table so visitors can view items:
```sql
create policy "public read products" on products
  for select using (true);
```

> 💡 **Note on Categories**: In this application, product categories are dynamically derived and synchronized from the unique values in the `products.category` table column via server API caching.

---

## 📂 Project Structure

A clean, predictable directory structure that isolates API logic, reusable components, and client page routes:

```
├── app/                        # Next.js 16 App Router Directory
│   ├── about/                  # About Us Static/Dynamic Page
│   ├── admin/                  # Admin Operations Dashboard (CRUD, Orders)
│   ├── api/                    # Server-side API Endpoints (Products, Categories)
│   ├── auth/                   # Redirect handles & OAuth session callback
│   ├── cart/                   # Local-persisted cart overview
│   ├── checkout/               # Multi-step checkout pipeline (address, summary)
│   ├── contact/                # Contact Support submission page
│   ├── favorites/              # Wishlisted products layout (Database-synced)
│   ├── forgot-password/        # Trigger password reset magic links
│   ├── login/                  # User Sign In (Email, Password, OAuth)
│   ├── orders/                 # Customer personal order history page
│   ├── product/                # Product details routes ([id]/page.tsx)
│   ├── profile/                # User avatar, address, & preference settings
│   ├── reset-password/         # Set a new credentials callback route
│   ├── shop/                   # Catalog listing (Sorts, filters, searches)
│   ├── signup/                 # Register a new customer
│   ├── layout.tsx              # Application layout & state providers
│   ├── page.tsx                # Homepage featuring banners, promos, & bestsellers
│   └── globals.css             # Tailwind v4 globals & custom rules
├── components/                 # Reusable UI Primitives
│   ├── store/                  # Zustand client stores (Cart, navigation states)
│   ├── Footer.tsx              # Universal footer element
│   ├── Header.tsx              # Landing page hero slides & promotions
│   ├── ImageOverview.tsx       # Smooth image thumbnail switcher with zoom
│   ├── Navbar.tsx              # Main navigation header with interactive badges
│   ├── ProductCard.tsx         # Hover-animated product showcase cards
│   └── ProductDetails.tsx      # Main detail page wrapper component
├── hooks/                      # Custom React hooks (Index mappings)
├── utils/                      # Helper libraries & configurations
│   ├── action/                 # Server Actions (Auth actions, Order placements)
│   ├── lib/                    # Supabase connectors & mathematical formatting helpers
│   └── zodvalidations/         # Shared schemas for forms & inputs validation
└── supabase/                   # Postgres configuration
    └── migrations/             # SQL database snapshots (001, 002)
```

---

## 📡 Core API Reference

The storefront relies on internal API routes located in `app/api/*` for fast data-fetching:

### `GET /api/products`
Retrieves products based on filters. Supports pagination, search, and categorization out of the box.
* **Query Parameters:**
  * `page` (number): Target page index (defaults to `1`)
  * `limit` (number): Items per page (defaults to `12`)
  * `category` (string): Target category name
  * `search` (string): Partial text search matching name or description (debounced on client)
  * `sort` (string): `price_asc` (cheapest first), `price_desc` (expensive first), or `newest` (creation date)
  * `minPrice` / `maxPrice` (number): Restrict prices to a specific range

### `GET /api/categories`
Dynamically collects all distinct categories currently stored in the product catalog and calculates inventory availability counts. Returns formatted category cards.

### `GET /api/reviews`
Retrieves user feedback, rankings, and commentary for products.
* **Query Parameters:**
  * `productId` (UUID): Get reviews restricted to a specific item.

### `GET /api/wishlist`
Fetches the current user's authenticated list of favorited items. Requester must be signed in (otherwise returns `401 Unauthorized`).

---


## 💻 Development Workflow & Scripts

Use the following standard scripts to manage the lifecycle of your code:

```bash
pnpm dev      # Starts the local development server at http://localhost:3000
pnpm build    # Compiles and optimizes the codebase for a production release
pnpm start    # Launches the compiled Next.js server locally
pnpm lint     # Runs ESLint checks to enforce codebase quality and consistency
```

---

## 🌐 Deployment Guidelines

### Deploy to Vercel
1. Import your cloned GitHub repository into **Vercel**.
2. Under **Project Settings → Environment Variables**, input the matching `.env.local` parameters:
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   * `NEXT_PUBLIC_SITE_URL` (Use your production domain URL, e.g., `https://my-store.vercel.app`)
3. Click **Deploy**. Vercel will build and serve your app globally.

### Set up Supabase in Production
1. Provision a new project on the **Supabase Cloud Dashboard**.
2. Run your SQL setup scripts in the database SQL Editor (from the `supabase/migrations` folder).
3. Update Auth settings (OAuth redirect paths) under **Authentication → URL Configuration** to match your production domain.

---

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

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to customize and launch your own premium storefronts!
