import { motion } from 'framer-motion';
import { useAllProducts } from '@/hooks/useProducts';
import { Star, Package, Loader2 } from 'lucide-react';

export default function AdminProducts() {
  const { data: products, isLoading } = useAllProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
      </div>

      <div className="space-y-3">
        {(products || []).map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center text-3xl">🍫</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-foreground truncate">{product.name}</h3>
                  {product.is_featured && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground">{product.category}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {product.sizes.map(s => `${s.name}: R$ ${s.price.toFixed(2)}`).join(' • ')}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`p-2 rounded-lg ${product.active ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'}`}>
                  <Package className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
