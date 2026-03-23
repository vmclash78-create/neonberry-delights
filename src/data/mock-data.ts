import { Category, Product, Topping, Complement, Neighborhood, StoreSettings, Coupon } from '@/types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Açaí Tradicional', icon: '🍇', sort_order: 1, active: true },
  { id: '2', name: 'Açaí Premium', icon: '✨', sort_order: 2, active: true },
  { id: '3', name: 'Smoothies', icon: '🥤', sort_order: 3, active: true },
  { id: '4', name: 'Combos', icon: '🎉', sort_order: 4, active: true },
];

export const mockProducts: Product[] = [
  {
    id: 'p1', category_id: '1', name: 'Açaí Puro', description: 'Açaí puro batido na hora, cremoso e natural.',
    image_url: '', base_price: 16, sizes: [
      { name: 'P', ml: 300, price: 16 }, { name: 'M', ml: 500, price: 22 }, { name: 'G', ml: 700, price: 28 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p2', category_id: '1', name: 'Açaí com Banana', description: 'Açaí cremoso batido com banana fresca.',
    image_url: '', base_price: 18, sizes: [
      { name: 'P', ml: 300, price: 18 }, { name: 'M', ml: 500, price: 24 }, { name: 'G', ml: 700, price: 30 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p3', category_id: '1', name: 'Açaí com Morango', description: 'Blend de açaí com morangos selecionados.',
    image_url: '', base_price: 19, sizes: [
      { name: 'P', ml: 300, price: 19 }, { name: 'M', ml: 500, price: 25 }, { name: 'G', ml: 700, price: 32 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p4', category_id: '2', name: 'NeonBerry Special', description: 'Nosso açaí signature com frutas vermelhas, granola artesanal e mel orgânico.',
    image_url: '', base_price: 28, sizes: [
      { name: 'M', ml: 500, price: 28 }, { name: 'G', ml: 700, price: 36 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p5', category_id: '2', name: 'Tropical Gold', description: 'Açaí premium com manga, maracujá e coco ralado fresco.',
    image_url: '', base_price: 26, sizes: [
      { name: 'M', ml: 500, price: 26 }, { name: 'G', ml: 700, price: 34 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p6', category_id: '2', name: 'Berry Explosion', description: 'Mix explosivo de açaí com blueberry, framboesa e calda de frutas vermelhas.',
    image_url: '', base_price: 30, sizes: [
      { name: 'M', ml: 500, price: 30 }, { name: 'G', ml: 700, price: 38 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p7', category_id: '3', name: 'Smoothie Energético', description: 'Açaí, banana, aveia e whey protein.',
    image_url: '', base_price: 22, sizes: [
      { name: '400ml', ml: 400, price: 22 }, { name: '600ml', ml: 600, price: 28 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p8', category_id: '3', name: 'Smoothie Tropical', description: 'Manga, abacaxi, açaí e água de coco.',
    image_url: '', base_price: 20, sizes: [
      { name: '400ml', ml: 400, price: 20 }, { name: '600ml', ml: 600, price: 26 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p9', category_id: '3', name: 'Green Power', description: 'Açaí, espinafre, banana e mel. Saúde no copo.',
    image_url: '', base_price: 24, sizes: [
      { name: '400ml', ml: 400, price: 24 }, { name: '600ml', ml: 600, price: 30 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p10', category_id: '4', name: 'Combo Casal', description: '2 açaís M + 2 complementos grátis.',
    image_url: '', base_price: 39.90, sizes: [
      { name: 'Combo', ml: 1000, price: 39.90 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p11', category_id: '4', name: 'Combo Família', description: '3 açaís G com toppings à escolha.',
    image_url: '', base_price: 69.90, sizes: [
      { name: 'Combo', ml: 2100, price: 69.90 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p12', category_id: '4', name: 'Combo Fitness', description: 'Açaí M + Smoothie Energético + Granola extra.',
    image_url: '', base_price: 44.90, sizes: [
      { name: 'Combo', ml: 900, price: 44.90 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
];

export const mockToppings: Topping[] = [
  { id: 't1', name: 'Granola', price: 3, active: true },
  { id: 't2', name: 'Leite em Pó', price: 2.5, active: true },
  { id: 't3', name: 'Paçoca', price: 3, active: true },
  { id: 't4', name: 'Leite Condensado', price: 3, active: true },
  { id: 't5', name: 'Mel', price: 2, active: true },
  { id: 't6', name: 'Nutella', price: 5, active: true },
  { id: 't7', name: 'Amendoim', price: 2.5, active: true },
  { id: 't8', name: 'Coco Ralado', price: 2, active: true },
];

export const mockComplements: Complement[] = [
  { id: 'c1', name: 'Banana', price: 2, category: 'Frutas', max_per_product: 3, active: true },
  { id: 'c2', name: 'Morango', price: 3, category: 'Frutas', max_per_product: 3, active: true },
  { id: 'c3', name: 'Kiwi', price: 4, category: 'Frutas', max_per_product: 3, active: true },
  { id: 'c4', name: 'Manga', price: 3, category: 'Frutas', max_per_product: 3, active: true },
  { id: 'c5', name: 'Whey Protein', price: 5, category: 'Extras', max_per_product: 1, active: true },
  { id: 'c6', name: 'Creatina', price: 4, category: 'Extras', max_per_product: 1, active: true },
];

export const mockNeighborhoods: Neighborhood[] = [
  { id: 'n1', name: 'Centro', delivery_fee: 5, active: true },
  { id: 'n2', name: 'Jardim América', delivery_fee: 7, active: true },
  { id: 'n3', name: 'Vila Nova', delivery_fee: 8, active: true },
  { id: 'n4', name: 'Parque das Flores', delivery_fee: 10, active: true },
  { id: 'n5', name: 'Santa Cruz', delivery_fee: 6, active: true },
];

export const mockStoreSettings: StoreSettings = {
  id: '1',
  name: 'NeonBerry Açaí',
  phone: '(11) 99999-9999',
  whatsapp_number: '5511999999999',
  opening_time: '10:00',
  closing_time: '22:00',
  logo_url: '',
  banner_image: '',
  primary_color: 'hsl(265, 80%, 60%)',
  accent_color: 'hsl(180, 90%, 55%)',
  secondary_color: 'hsl(260, 20%, 92%)',
  instagram: '@neonberryacai',
  facebook: 'neonberryacai',
  delivery_enabled: true,
  pickup_enabled: true,
  auto_accept_orders: false,
  min_order_value: 15,
};

export const mockCoupons: Coupon[] = [
  { id: 'cp1', code: 'NEON10', type: 'percent', value: 10, active: true, expires_at: '2026-12-31' },
  { id: 'cp2', code: 'PROMO5', type: 'fixed', value: 5, active: true, expires_at: '2026-06-30' },
];
