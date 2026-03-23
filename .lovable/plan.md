
# NeonBerry Açaí — MVP Delivery System

## Phase 1: Foundation & Database

### Visual Identity
- Neon purple + cyan glassmorphism theme
- Custom CSS variables: primary purple `hsl(265, 80%, 60%)`, accent cyan `hsl(180, 90%, 55%)`
- Glassmorphism cards with `backdrop-blur`, glow effects, rounded corners (1.25rem)
- Framer Motion micro-interactions throughout

### Database (Supabase/Lovable Cloud)
Create all tables with proper RLS:
- **categories** (id, name, icon, sort_order, active)
- **products** (id, category_id, name, description, image_url, base_price, sizes JSON, is_featured, stock_control, stock_quantity, active)
- **toppings** (id, name, price, active)
- **complements** (id, name, price, category, max_per_product, active)
- **neighborhoods** (id, name, delivery_fee, active)
- **store_settings** (singleton: store name, phone, hours, logo_url, banner, colors, delivery/pickup toggles, auto_accept, social links)
- **customers** (id, name, phone unique, created_at)
- **favorites** (id, customer_phone, product_id)
- **coupons** (id, code, type percent/fixed, value, active, expires_at)
- **orders** (id, customer_name, customer_phone, items JSON, subtotal, delivery_fee, discount_value, coupon_id, total, address, neighborhood_id, payment_method, status, notes, created_at)
- **order_status_logs** (id, order_id, status, created_at)
- **analytics_events** (id, type, payload JSONB, created_at)

Seed sample data: 4 categories, ~12 açaí products, toppings, complements, sample neighborhoods.

### RLS
- SELECT public on all tables
- INSERT public on orders, customers, analytics_events, favorites
- Admin (authenticated) for everything else

### Realtime
- Enable on orders, products, store_settings

## Phase 2: Customer Homepage (iFood-style)

### Layout
- Mobile-first bottom navigation (Home, Menu, Cart, Favorites)
- Sticky header with store logo + search bar

### Hero Section
- Dynamic banner from store_settings
- Parallax effect, animated entry
- Glow CTA button "Peça Agora"

### Sections
- **Search**: Debounced instant search with highlighted results
- **Categories**: Horizontal scrollable chips with icons
- **Featured Products**: Carousel with `is_featured` products
- **Promotions**: Dynamic banner pulled from store
- **Full Menu**: Grid by category, skeleton loading on all lists
- **Favorites**: Heart icon toggle, persisted by phone number

### Product Modal
- Smooth slide-up transition
- Size selector, toppings multi-select, complements with limits
- Real-time price calculation
- Add to cart with toast feedback

## Phase 3: Cart & Checkout

### Cart (Slide-over panel)
- Persisted in localStorage
- Animated item add/remove
- Quantity controls, item editing
- Real-time total calculation
- Coupon code input with validation

### Checkout Page
- Customer info: name, phone (masked), address
- Neighborhood selector (auto delivery fee)
- Payment method: PIX or cash
- PIX: show copy-paste code area
- Order summary with discount applied
- **WhatsApp button**: Generates formatted message with full order details, sends to store's WhatsApp number
- Store closed detection: blocks checkout with friendly message

## Phase 4: Admin Panel

### Auth
- Email/password login via Supabase Auth
- Protected `/admin` routes

### Dashboard
- Today's sales, order count, average ticket
- Recharts line/bar charts for weekly trends
- Top products ranking

### Orders Management (Real-time)
- Live order feed with sound notification on new orders
- Status pipeline: Novo → Preparando → Saiu para Entrega → Entregue
- Status change logs

### Product Management
- CRUD with image upload (placeholder URLs for now)
- Stock control toggle + quantity
- Featured toggle
- Category assignment

### Coupon Management
- CRUD: code, type, value, expiration, active toggle

### Store Settings
- Edit all store_settings fields
- Color pickers for theme
- Toggle delivery/pickup
- Social media links

### Analytics (Basic)
- View counts, cart adds, orders from analytics_events table
- Simple conversion funnel

## Tech Stack
- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Framer Motion for animations
- React Query for data fetching + cache
- Supabase (Lovable Cloud) for DB + Auth + Realtime
- Recharts for admin charts
- Sonner for toasts
- Lucide icons
