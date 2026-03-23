import { mockProducts, mockCategories, mockToppings, mockComplements } from '@/data/mock-data';

export function useProducts() {
  return { data: mockProducts, isLoading: false };
}

export function useFeaturedProducts() {
  return { data: mockProducts.filter(p => p.is_featured && p.active), isLoading: false };
}

export function useCategories() {
  return { data: mockCategories.filter(c => c.active), isLoading: false };
}

export function useToppings() {
  return { data: mockToppings.filter(t => t.active), isLoading: false };
}

export function useComplements() {
  return { data: mockComplements.filter(c => c.active), isLoading: false };
}

export function useProductsByCategory(categoryId: string | null) {
  if (!categoryId) return { data: mockProducts.filter(p => p.active), isLoading: false };
  return { data: mockProducts.filter(p => p.category_id === categoryId && p.active), isLoading: false };
}
