import { motion } from 'framer-motion';
import { Product } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  index: number;
}

function ProductCard({ product, onClick, index }: ProductCardProps) {
  const minPrice = Math.min(...product.sizes.map(s => s.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(product)}
      className="glass rounded-2xl overflow-hidden cursor-pointer group hover:shadow-lg hover:shadow-primary/10 transition-shadow"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/10 relative overflow-hidden">
        {product.is_featured && (
          <span className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-lg">
            <Star className="w-3 h-3 fill-current" /> Destaque
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-60 group-hover:scale-110 transition-transform duration-500">
          🍇
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-foreground leading-tight mb-1 overflow-wrap-break-word">{product.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
        <div className="flex items-end justify-between">
          <span className="text-xs text-muted-foreground">a partir de</span>
          <span className="text-base font-bold text-gradient-neon tabular-nums">
            R$ {minPrice.toFixed(2)}
          </span>
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
            <Skeleton className="aspect-[4/3]" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-5 w-1/2 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-muted-foreground text-sm">Nenhum produto encontrado.</p>
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
