import { motion } from 'framer-motion';
import { Product } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Flame, ChevronRight } from 'lucide-react';

interface FeaturedCarouselProps {
  products: Product[];
  isLoading: boolean;
  onProductClick: (product: Product) => void;
}

export default function FeaturedCarousel({ products, isLoading, onProductClick }: FeaturedCarouselProps) {
  if (isLoading) {
    return (
      <div className="px-4 py-3">
        <Skeleton className="h-6 w-40 mb-3" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="w-56 h-44 rounded-2xl flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-3">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <Flame className="w-4 h-4 text-primary" />
          Mais Vendidos
        </h2>
        <span className="text-xs text-muted-foreground flex items-center gap-0.5">
          Ver todos <ChevronRight className="w-3 h-3" />
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto px-4 scrollbar-hide pb-2">
        {products.map((product, i) => {
          const minPrice = Math.min(...product.sizes.map(s => s.price));
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onProductClick(product)}
              className="flex-shrink-0 w-52 glass rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl hover:shadow-primary/15 transition-all duration-300"
            >
              {/* Image */}
              <div className="h-28 bg-gradient-to-br from-primary/25 via-primary/10 to-accent/15 relative flex items-center justify-center overflow-hidden">
                <motion.span
                  whileHover={{ scale: 1.2, rotate: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="text-5xl drop-shadow-lg"
                >
                  🍫
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="font-bold text-sm text-foreground mb-0.5 leading-tight">{product.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-gradient-neon tabular-nums">
                    R$ {minPrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-muted-foreground">a partir de</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
