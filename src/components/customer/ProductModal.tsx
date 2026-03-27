import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DbProduct } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';

interface ProductModalProps {
  product: DbProduct | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<{ name: string; weight: number; price: number } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  useMemo(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || null);
      setQuantity(1);
      setNotes('');
    }
  }, [product?.id]);

  const totalPrice = useMemo(() => {
    if (!selectedSize) return 0;
    return selectedSize.price * quantity;
  }, [selectedSize, quantity]);

  const handleAdd = () => {
    if (!product || !selectedSize) return;
    addItem(product, selectedSize, quantity, notes);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="bg-card w-full max-w-lg max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col"
          >
            <div className="relative h-40 bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center overflow-hidden">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <span className="text-7xl">🍫</span>
              )}
              <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors">
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1">{product.name}</h2>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Tamanho</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedSize?.name === size.name
                          ? 'gradient-chocolate text-primary-foreground warm-glow'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {size.name} ({size.weight}g) — R$ {size.price.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Observações</h3>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Ex: sem cobertura, embalagem para presente..."
                  className="w-full px-3 py-2 rounded-xl bg-secondary/60 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none h-20"
                />
              </div>
            </div>

            <div className="p-4 border-t border-border/50 glass-strong">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-secondary rounded-xl px-2">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:text-primary transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold tabular-nums">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:text-primary transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  className="flex-1 gradient-chocolate text-primary-foreground font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 warm-glow"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Adicionar — R$ {totalPrice.toFixed(2)}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
