export interface Category {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
  active: boolean;
}

export interface ProductSize {
  name: string;
  grams: number;
  price: number;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string;
  image_url: string;
  base_price: number;
  sizes: ProductSize[];
  is_featured: boolean;
  stock_control: boolean;
  stock_quantity: number;
  active: boolean;
}

export interface Topping {
  id: string;
  name: string;
  price: number;
  active: boolean;
}

export interface Complement {
  id: string;
  name: string;
  price: number;
  category: string;
  max_per_product: number;
  active: boolean;
}

export interface Neighborhood {
  id: string;
  name: string;
  delivery_fee: number;
  active: boolean;
}

export interface StoreSettings {
  id: string;
  name: string;
  phone: string;
  whatsapp_number: string;
  opening_time: string;
  closing_time: string;
  logo_url: string;
  banner_image: string;
  primary_color: string;
  accent_color: string;
  secondary_color: string;
  instagram: string;
  facebook: string;
  delivery_enabled: boolean;
  pickup_enabled: boolean;
  auto_accept_orders: boolean;
  min_order_value: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  active: boolean;
  expires_at: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: ProductSize;
  toppings: Topping[];
  complements: Complement[];
  quantity: number;
  notes: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  items: CartItem[];
  subtotal: number;
  delivery_fee: number;
  discount_value: number;
  coupon_id: string | null;
  total: number;
  address: string;
  neighborhood_id: string | null;
  payment_method: 'pix' | 'cash' | 'card';
  status: OrderStatus;
  notes: string;
  created_at: string;
}

export interface AnalyticsEvent {
  id: string;
  type: 'view_product' | 'add_to_cart' | 'checkout' | 'order_created';
  payload: Record<string, unknown>;
  created_at: string;
}
