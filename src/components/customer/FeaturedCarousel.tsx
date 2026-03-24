import { motion } from 'framer-motion';
import { Product } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';

interface FeaturedCarouselProps {
  products: Product[];
  isLoading: boolean;
  onProductClick: (product: Product) => void;
}

export default function FeaturedCarousel({ products, isLoading, onProductClick }: FeaturedCarouselProps) {
  if (isLoading) {
    return (
      <div className="px-4 py-2">
        <Skeleton className="h-6 w-40 mb-3" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="w-60 h-36 rounded-2xl flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-2">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-lg font-bold text-foreground">⭐ Destaques</h2>
        <span className="text-xs text-muted-foreground flex items-center gap-0.5">
          Ver todos <ChevronRight className="w-3 h-3" />
        </span>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 scrollbar-hide pb-2">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onProductClick(product)}
            className="flex-shrink-0 w-60 glass rounded-2xl overflow-hidden cursor-pointer group hover:shadow-lg hover:shadow-primary/10 transition-shadow"
          >
            <div className="h-24 bg-gradient-to-br from-primary/30 to-accent/20 relative flex items-center justify-center overflow-hidden">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <span className="text-4xl group-hover:scale-110 transition-transform duration-500">🍫</span>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm text-foreground mb-0.5">{product.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1 mb-1">{product.description}</p>
              <span className="text-sm font-bold text-gradient-chocolate tabular-nums">
                R$ {Math.min(...product.sizes.map(s => s.price)).toFixed(2)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
