import { motion } from 'framer-motion';
import { Product } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Plus, Cookie } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  index: number;
}

function ProductCard({ product, onClick, index }: ProductCardProps) {
  const minPrice = Math.min(...product.sizes.map(s => s.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(product)}
      className="glass rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl hover:shadow-primary/15 transition-all duration-300 flex flex-col"
    >
      {/* Image area */}
      <div className="aspect-square bg-gradient-to-br from-primary/20 via-primary/10 to-accent/15 relative overflow-hidden">
        {product.is_featured && (
          <span className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-md">
            <Star className="w-2.5 h-2.5 fill-current" /> Destaque
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.15, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-6xl drop-shadow-lg"
          >
            🍫
          </motion.div>
        </div>
        {/* Subtle shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-bold text-sm text-foreground leading-tight mb-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{product.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-[10px] text-muted-foreground">a partir de</p>
            <span className="text-base font-extrabold text-gradient-neon tabular-nums">
              R$ {minPrice.toFixed(2)}
            </span>
          </div>
          <motion.div
            whileTap={{ scale: 0.85 }}
            className="w-8 h-8 rounded-full gradient-neon flex items-center justify-center shadow-md"
          >
            <Plus className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onProductClick: (product: Product) => void;
}

export default function ProductGrid({ products, isLoading, onProductClick }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden">
            <Skeleton className="aspect-square" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 flex flex-col items-center gap-3">
        <Cookie className="w-10 h-10 text-muted-foreground/40" />
        <p className="text-muted-foreground text-sm">Nenhum brownie encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} onClick={onProductClick} index={i} />
      ))}
    </div>
  );
}
