import { Category, Product, Topping, Complement, Neighborhood, StoreSettings, Coupon } from '@/types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Clássicos', icon: '🍫', sort_order: 1, active: true },
  { id: '2', name: 'Premium', icon: '✨', sort_order: 2, active: true },
  { id: '3', name: 'Recheados', icon: '🍪', sort_order: 3, active: true },
  { id: '4', name: 'Combos', icon: '🎁', sort_order: 4, active: true },
];

export const mockProducts: Product[] = [
  {
    id: 'p1', category_id: '1', name: 'Brownie Tradicional', description: 'Brownie clássico de chocolate meio amargo, crocante por fora e fudgy por dentro.',
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop', base_price: 12, sizes: [
      { name: 'Individual', weight: 80, price: 12 }, { name: 'Médio', weight: 150, price: 20 }, { name: 'Grande', weight: 250, price: 32 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p2', category_id: '1', name: 'Brownie com Nozes', description: 'Brownie clássico com nozes crocantes torradas.',
    image_url: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=300&fit=crop', base_price: 14, sizes: [
      { name: 'Individual', weight: 80, price: 14 }, { name: 'Médio', weight: 150, price: 23 }, { name: 'Grande', weight: 250, price: 35 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p3', category_id: '1', name: 'Brownie de Chocolate Branco', description: 'Blondie irresistível feito com chocolate branco belga.',
    image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop', base_price: 14, sizes: [
      { name: 'Individual', weight: 80, price: 14 }, { name: 'Médio', weight: 150, price: 22 }, { name: 'Grande', weight: 250, price: 34 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p4', category_id: '2', name: 'Brownie Nutella', description: 'Brownie premium recheado com Nutella cremosa e finalizado com avelãs.',
    image_url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop', base_price: 18, sizes: [
      { name: 'Médio', weight: 150, price: 18 }, { name: 'Grande', weight: 250, price: 28 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p5', category_id: '2', name: 'Brownie Red Velvet', description: 'Brownie red velvet com cobertura de cream cheese artesanal.',
    image_url: 'https://images.unsplash.com/photo-1612886623430-e72b8dfa0c6e?w=400&h=300&fit=crop', base_price: 19, sizes: [
      { name: 'Médio', weight: 150, price: 19 }, { name: 'Grande', weight: 250, price: 30 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p6', category_id: '2', name: 'Brownie Pistache', description: 'Brownie de chocolate 70% com creme de pistache e pistache triturado.',
    image_url: 'https://images.unsplash.com/photo-1590841609987-4ac211afdde1?w=400&h=300&fit=crop', base_price: 22, sizes: [
      { name: 'Médio', weight: 150, price: 22 }, { name: 'Grande', weight: 250, price: 34 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p7', category_id: '3', name: 'Brownie Doce de Leite', description: 'Brownie com recheio generoso de doce de leite argentino.',
    image_url: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=400&h=300&fit=crop', base_price: 16, sizes: [
      { name: 'Individual', weight: 80, price: 16 }, { name: 'Médio', weight: 150, price: 25 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p8', category_id: '3', name: 'Brownie Cookies & Cream', description: 'Brownie com pedaços de Oreo e cobertura de chocolate branco.',
    image_url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop', base_price: 17, sizes: [
      { name: 'Individual', weight: 80, price: 17 }, { name: 'Médio', weight: 150, price: 26 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p9', category_id: '3', name: 'Brownie Brigadeiro', description: 'Brownie com recheio de brigadeiro gourmet e granulado belga.',
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop', base_price: 16, sizes: [
      { name: 'Individual', weight: 80, price: 16 }, { name: 'Médio', weight: 150, price: 24 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p10', category_id: '4', name: 'Combo Degustação', description: '4 brownies sortidos individuais para experimentar nossos sabores.',
    image_url: 'https://images.unsplash.com/photo-1604413191066-4dd20127f68a?w=400&h=300&fit=crop', base_price: 39.90, sizes: [
      { name: 'Combo', weight: 320, price: 39.90 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p11', category_id: '4', name: 'Combo Festa', description: '12 brownies sortidos, perfeito para presentear ou compartilhar.',
    image_url: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=300&fit=crop', base_price: 89.90, sizes: [
      { name: 'Combo', weight: 960, price: 89.90 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p12', category_id: '4', name: 'Combo Presente', description: '6 brownies premium em caixa especial com laço.',
    image_url: 'https://images.unsplash.com/photo-1548741487-18d363dc4469?w=400&h=300&fit=crop', base_price: 59.90, sizes: [
      { name: 'Combo', weight: 480, price: 59.90 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
];

export const mockToppings: Topping[] = [
  { id: 't1', name: 'Cobertura de Chocolate', price: 4, active: true },
  { id: 't2', name: 'Sorvete de Baunilha', price: 6, active: true },
  { id: 't3', name: 'Chantilly', price: 3, active: true },
  { id: 't4', name: 'Calda de Caramelo', price: 3.5, active: true },
  { id: 't5', name: 'Doce de Leite', price: 4, active: true },
  { id: 't6', name: 'Ganache', price: 5, active: true },
  { id: 't7', name: 'Açúcar de Confeiteiro', price: 1.5, active: true },
  { id: 't8', name: 'Calda de Frutas Vermelhas', price: 4, active: true },
];

export const mockComplements: Complement[] = [
  { id: 'c1', name: 'Nozes', price: 3, category: 'Castanhas', max_per_product: 3, active: true },
  { id: 'c2', name: 'Castanha de Caju', price: 4, category: 'Castanhas', max_per_product: 3, active: true },
  { id: 'c3', name: 'Amêndoas', price: 4, category: 'Castanhas', max_per_product: 3, active: true },
  { id: 'c4', name: 'M&Ms', price: 3, category: 'Extras', max_per_product: 2, active: true },
  { id: 'c5', name: 'Frutas Vermelhas', price: 5, category: 'Extras', max_per_product: 2, active: true },
  { id: 'c6', name: 'Granola', price: 2.5, category: 'Extras', max_per_product: 2, active: true },
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
  name: 'Brownie & Co.',
  phone: '(11) 99999-9999',
  whatsapp_number: '5511999999999',
  opening_time: '09:00',
  closing_time: '21:00',
  logo_url: '',
  banner_image: '',
  primary_color: 'hsl(25, 55%, 30%)',
  accent_color: 'hsl(35, 80%, 55%)',
  secondary_color: 'hsl(30, 20%, 91%)',
  instagram: '@brownieandco',
  facebook: 'brownieandco',
  delivery_enabled: true,
  pickup_enabled: true,
  auto_accept_orders: false,
  min_order_value: 20,
};

export const mockCoupons: Coupon[] = [
  { id: 'cp1', code: 'BROWNIE10', type: 'percent', value: 10, active: true, expires_at: '2026-12-31' },
  { id: 'cp2', code: 'DOCE5', type: 'fixed', value: 5, active: true, expires_at: '2026-06-30' },
];
