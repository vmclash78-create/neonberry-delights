import { useState, useMemo, useCallback } from 'react';
import { DbProduct } from '@/hooks/useProducts';
import { useCategories, useFeaturedProducts, useProductsByCategory } from '@/hooks/useProducts';
import Header from '@/components/customer/Header';
import Hero from '@/components/customer/Hero';
import CategoryChips from '@/components/customer/CategoryChips';
import FeaturedCarousel from '@/components/customer/FeaturedCarousel';
import ProductGrid from '@/components/customer/ProductGrid';
import ProductModal from '@/components/customer/ProductModal';
import BottomNav from '@/components/customer/BottomNav';
import CartDrawer from '@/components/customer/CartDrawer';
import CheckoutPage from '@/components/customer/CheckoutPage';

type View = 'home' | 'checkout';

const Index = () => {
  const [view, setView] = useState<View>('home');
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'cart' | 'favorites'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<DbProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const { data: categories, isLoading: catLoading } = useCategories();
  const { data: featured, isLoading: featLoading } = useFeaturedProducts();
  const { data: products, isLoading: prodLoading } = useProductsByCategory(selectedCategory);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products || [];
    const q = searchQuery.toLowerCase();
    return (products || []).filter(p =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  const handleNavigate = useCallback((tab: 'home' | 'menu' | 'cart' | 'favorites') => {
    setActiveTab(tab);
    if (tab === 'cart') setCartOpen(true);
    if (tab === 'menu') {
      setSelectedCategory(null);
      setSearchQuery('');
    }
  }, []);

  const scrollToMenu = useCallback(() => {
    setActiveTab('menu');
    setSelectedCategory(null);
  }, []);

  if (view === 'checkout') {
    return <CheckoutPage onBack={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {activeTab === 'home' && !searchQuery && (
        <>
          <Hero onCtaClick={scrollToMenu} />
          <FeaturedCarousel
            products={featured || []}
            isLoading={featLoading}
            onProductClick={setSelectedProduct}
          />
        </>
      )}

      <CategoryChips
        categories={categories || []}
        selectedId={selectedCategory}
        onSelect={setSelectedCategory}
        isLoading={catLoading}
      />

      <section className="mb-4">
        {searchQuery && (
          <p className="px-4 text-xs text-muted-foreground mb-2">
            {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''} para "{searchQuery}"
          </p>
        )}
        <ProductGrid
          products={filteredProducts}
          isLoading={prodLoading}
          onProductClick={setSelectedProduct}
        />
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={() => setView('checkout')} />
      <BottomNav active={activeTab} onNavigate={handleNavigate} />
    </div>
  );
};

export default Index;
