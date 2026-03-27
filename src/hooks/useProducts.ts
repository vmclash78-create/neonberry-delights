import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DbProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  active: boolean;
  is_featured: boolean;
  sizes: { name: string; weight: number; price: number }[];
}

function parseProduct(row: any): DbProduct {
  return {
    ...row,
    sizes: Array.isArray(row.sizes) ? row.sizes : JSON.parse(row.sizes || '[]'),
  };
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').eq('active', true);
      if (error) throw error;
      return (data || []).map(parseProduct);
    },
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').eq('active', true).eq('is_featured', true);
      if (error) throw error;
      return (data || []).map(parseProduct);
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('category').eq('active', true);
      if (error) throw error;
      const cats = [...new Set((data || []).map(p => p.category))].filter(Boolean);
      return cats.map((name, i) => ({ id: name, name, icon: '🍫', sort_order: i, active: true }));
    },
  });
}

export function useProductsByCategory(categoryId: string | null) {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: async () => {
      let query = supabase.from('products').select('*').eq('active', true);
      if (categoryId) query = query.eq('category', categoryId);
      const { data, error } = await query;
      if (error) throw error;
      return (data || []).map(parseProduct);
    },
  });
}

export function useAllProducts() {
  return useQuery({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []).map(parseProduct);
    },
  });
}
