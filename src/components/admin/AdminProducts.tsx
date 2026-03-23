import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockProducts, mockCategories } from '@/data/mock-data';
import { Product } from '@/types';
import { Plus, Pencil, Star, Package } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminProducts() {
  const [products, setProducts] = useState(mockProducts);

  const toggleFeatured = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, is_featured: !p.is_featured } : p));
    toast.success('Produto atualizado');
  };

  const toggleActive = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
    toast.success('Status atualizado');
  };

  const getCategoryName = (id: string) => mockCategories.find(c => c.id === id)?.name || '';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-2 gradient-neon text-primary-foreground rounded-xl text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Novo Produto
        </motion.button>
      </div>

      <div className="space-y-3">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center text-3xl flex-shrink-0">
                🍇
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-foreground truncate">{product.name}</h3>
                  {product.is_featured && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground">{getCategoryName(product.category_id)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {product.sizes.map(s => `${s.name}: R$ ${s.price.toFixed(2)}`).join(' • ')}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleFeatured(product.id)}
                  className={`p-2 rounded-lg transition-colors ${product.is_featured ? 'bg-amber-500/10 text-amber-500' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                  title="Destaque"
                >
                  <Star className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleActive(product.id)}
                  className={`p-2 rounded-lg transition-colors ${product.active ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'}`}
                  title={product.active ? 'Ativo' : 'Inativo'}
                >
                  <Package className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
