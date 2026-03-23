import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CartItem, Product, ProductSize, Topping, Complement } from '@/types';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: ProductSize, toppings: Topping[], complements: Complement[], quantity: number, notes: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('neonberry-cart');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('neonberry-cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, selectedSize: ProductSize, toppings: Topping[], complements: Complement[], quantity: number, notes: string) => {
    const toppingsTotal = toppings.reduce((s, t) => s + t.price, 0);
    const complementsTotal = complements.reduce((s, c) => s + c.price, 0);
    const unitPrice = selectedSize.price + toppingsTotal + complementsTotal;
    
    const newItem: CartItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      product, selectedSize, toppings, complements, quantity, notes,
      unitPrice,
      totalPrice: unitPrice * quantity,
    };
    setItems(prev => [...prev, newItem]);
    toast.success(`${product.name} adicionado ao carrinho!`);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    toast.info('Item removido do carrinho');
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity, totalPrice: i.unitPrice * quantity } : i));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.totalPrice, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
