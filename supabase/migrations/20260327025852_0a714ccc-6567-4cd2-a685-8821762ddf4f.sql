
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC NOT NULL DEFAULT 0,
  image_url TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL DEFAULT '',
  total NUMERIC NOT NULL DEFAULT 0,
  subtotal NUMERIC NOT NULL DEFAULT 0,
  delivery_fee NUMERIC NOT NULL DEFAULT 0,
  discount_value NUMERIC NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL DEFAULT 'pix',
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price NUMERIC NOT NULL DEFAULT 0,
  details TEXT NOT NULL DEFAULT ''
);

-- Create store_settings table (singleton)
CREATE TABLE public.store_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  store_name TEXT NOT NULL DEFAULT 'Brownie & Co.',
  whatsapp_number TEXT NOT NULL DEFAULT '5511999999999',
  pix_key TEXT NOT NULL DEFAULT 'brownieandco@pix.com',
  allow_pix BOOLEAN NOT NULL DEFAULT true,
  allow_whatsapp BOOLEAN NOT NULL DEFAULT true,
  opening_time TEXT NOT NULL DEFAULT '09:00',
  closing_time TEXT NOT NULL DEFAULT '21:00',
  min_order_value NUMERIC NOT NULL DEFAULT 20,
  instagram TEXT NOT NULL DEFAULT '@brownieandco',
  delivery_enabled BOOLEAN NOT NULL DEFAULT true,
  pickup_enabled BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Products: public read
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT USING (true);
-- Products: authenticated can manage
CREATE POLICY "Authenticated users can manage products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Orders: public can insert (customers create orders)
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);
-- Orders: readable
CREATE POLICY "Orders are readable" ON public.orders FOR SELECT USING (true);
-- Orders: authenticated can update status
CREATE POLICY "Authenticated users can update orders" ON public.orders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Order items: public can insert
CREATE POLICY "Anyone can create order items" ON public.order_items FOR INSERT WITH CHECK (true);
-- Order items: readable
CREATE POLICY "Order items are readable" ON public.order_items FOR SELECT USING (true);

-- Store settings: public read
CREATE POLICY "Store settings are publicly readable" ON public.store_settings FOR SELECT USING (true);
-- Store settings: authenticated can update
CREATE POLICY "Authenticated users can update settings" ON public.store_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_active ON public.products(active);
