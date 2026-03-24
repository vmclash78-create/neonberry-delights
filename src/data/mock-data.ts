import { Category, Product, Topping, Complement, Neighborhood, StoreSettings, Coupon } from '@/types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Brownies Clássicos', icon: '🍫', sort_order: 1, active: true },
  { id: '2', name: 'Brownies Premium', icon: '✨', sort_order: 2, active: true },
  { id: '3', name: 'Mini Brownies', icon: '🧁', sort_order: 3, active: true },
  { id: '4', name: 'Combos', icon: '🎁', sort_order: 4, active: true },
];

export const mockProducts: Product[] = [
  {
    id: 'p1', category_id: '1', name: 'Brownie Tradicional', description: 'Brownie clássico de chocolate meio amargo, com casquinha crocante por fora e macio por dentro.',
    image_url: '', base_price: 12, sizes: [
      { name: 'P', grams: 80, price: 12 }, { name: 'M', grams: 120, price: 16 }, { name: 'G', grams: 180, price: 22 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p2', category_id: '1', name: 'Brownie com Nozes', description: 'Brownie de chocolate com pedaços generosos de nozes crocantes.',
    image_url: '', base_price: 14, sizes: [
      { name: 'P', grams: 80, price: 14 }, { name: 'M', grams: 120, price: 18 }, { name: 'G', grams: 180, price: 24 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p3', category_id: '1', name: 'Brownie de Doce de Leite', description: 'Brownie recheado com doce de leite argentino cremoso.',
    image_url: '', base_price: 15, sizes: [
      { name: 'P', grams: 80, price: 15 }, { name: 'M', grams: 120, price: 19 }, { name: 'G', grams: 180, price: 25 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p4', category_id: '2', name: 'Brownie com Nutella', description: 'Brownie premium recheado com Nutella e coberto com avelãs torradas.',
    image_url: '', base_price: 18, sizes: [
      { name: 'M', grams: 120, price: 18 }, { name: 'G', grams: 180, price: 26 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p5', category_id: '2', name: 'Brownie Red Velvet', description: 'Brownie red velvet com cobertura de cream cheese artesanal.',
    image_url: '', base_price: 20, sizes: [
      { name: 'M', grams: 120, price: 20 }, { name: 'G', grams: 180, price: 28 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p6', category_id: '2', name: 'Brownie Pistache', description: 'Brownie de chocolate belga com creme de pistache e pistache triturado.',
    image_url: '', base_price: 22, sizes: [
      { name: 'M', grams: 120, price: 22 }, { name: 'G', grams: 180, price: 30 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p7', category_id: '3', name: 'Mini Brownie Clássico (6un)', description: 'Caixa com 6 mini brownies tradicionais, perfeitos para compartilhar.',
    image_url: '', base_price: 24, sizes: [
      { name: '6un', grams: 240, price: 24 }, { name: '12un', grams: 480, price: 42 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p8', category_id: '3', name: 'Mini Brownie Sortido (6un)', description: 'Caixa com 6 mini brownies de sabores variados: chocolate, doce de leite e nozes.',
    image_url: '', base_price: 28, sizes: [
      { name: '6un', grams: 240, price: 28 }, { name: '12un', grams: 480, price: 48 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p9', category_id: '3', name: 'Mini Brownie com Cobertura (6un)', description: 'Mini brownies cobertos com ganache de chocolate ao leite.',
    image_url: '', base_price: 26, sizes: [
      { name: '6un', grams: 240, price: 26 }, { name: '12un', grams: 480, price: 46 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p10', category_id: '4', name: 'Combo Casal', description: '2 brownies G à escolha + 2 coberturas grátis.',
    image_url: '', base_price: 39.90, sizes: [
      { name: 'Combo', grams: 360, price: 39.90 },
    ], is_featured: true, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p11', category_id: '4', name: 'Combo Família', description: '4 brownies G + caixa de mini brownies de brinde.',
    image_url: '', base_price: 79.90, sizes: [
      { name: 'Combo', grams: 960, price: 79.90 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
  {
    id: 'p12', category_id: '4', name: 'Combo Festa', description: '20 mini brownies sortidos em caixa especial para eventos.',
    image_url: '', base_price: 89.90, sizes: [
      { name: 'Combo', grams: 800, price: 89.90 },
    ], is_featured: false, stock_control: false, stock_quantity: 0, active: true,
  },
];

export const mockToppings: Topping[] = [
  { id: 't1', name: 'Ganache de Chocolate', price: 4, active: true },
  { id: 't2', name: 'Calda de Caramelo', price: 3.5, active: true },
  { id: 't3', name: 'Chantilly', price: 3, active: true },
  { id: 't4', name: 'Sorvete de Creme', price: 6, active: true },
  { id: 't5', name: 'Calda de Frutas Vermelhas', price: 4, active: true },
  { id: 't6', name: 'Nutella Extra', price: 5, active: true },
  { id: 't7', name: 'Açúcar de Confeiteiro', price: 1.5, active: true },
  { id: 't8', name: 'Creme de Pistache', price: 6, active: true },
];

export const mockComplements: Complement[] = [
  { id: 'c1', name: 'Nozes', price: 3, category: 'Castanhas', max_per_product: 2, active: true },
  { id: 'c2', name: 'Castanha de Caju', price: 4, category: 'Castanhas', max_per_product: 2, active: true },
  { id: 'c3', name: 'Avelãs', price: 5, category: 'Castanhas', max_per_product: 2, active: true },
  { id: 'c4', name: 'Morango Fresco', price: 4, category: 'Frutas', max_per_product: 2, active: true },
  { id: 'c5', name: 'Banana', price: 2, category: 'Frutas', max_per_product: 2, active: true },
  { id: 'c6', name: 'Brigadeiro', price: 4, category: 'Extras', max_per_product: 3, active: true },
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
  name: 'Brownie Delícias',
  phone: '(11) 99999-9999',
  whatsapp_number: '5511999999999',
  opening_time: '09:00',
  closing_time: '21:00',
  logo_url: '',
  banner_image: '',
  primary_color: 'hsl(25, 65%, 32%)',
  accent_color: 'hsl(35, 80%, 50%)',
  secondary_color: 'hsl(30, 20%, 90%)',
  instagram: '@browniedelicias',
  facebook: 'browniedelicias',
  delivery_enabled: true,
  pickup_enabled: true,
  auto_accept_orders: false,
  min_order_value: 20,
};

export const mockCoupons: Coupon[] = [
  { id: 'cp1', code: 'BROWNIE10', type: 'percent', value: 10, active: true, expires_at: '2026-12-31' },
  { id: 'cp2', code: 'CHOCO5', type: 'fixed', value: 5, active: true, expires_at: '2026-06-30' },
];
