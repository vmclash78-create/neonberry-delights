import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, ProductSize, Topping, Complement } from '@/types';
import { useToppings, useComplements } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const { data: toppings } = useToppings();
  const { data: complements } = useComplements();

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [selectedComplements, setSelectedComplements] = useState<Complement[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Reset when product changes
  useMemo(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || null);
      setSelectedToppings([]);
      setSelectedComplements([]);
      setQuantity(1);
      setNotes('');
    }
  }, [product?.id]);

  const totalPrice = useMemo(() => {
    if (!selectedSize) return 0;
    const toppingsCost = selectedToppings.reduce((s, t) => s + t.price, 0);
    const complementsCost = selectedComplements.reduce((s, c) => s + c.price, 0);
    return (selectedSize.price + toppingsCost + complementsCost) * quantity;
  }, [selectedSize, selectedToppings, selectedComplements, quantity]);

  const toggleTopping = (topping: Topping) => {
    setSelectedToppings(prev =>
      prev.find(t => t.id === topping.id)
        ? prev.filter(t => t.id !== topping.id)
        : [...prev, topping]
    );
  };

  const toggleComplement = (complement: Complement) => {
    setSelectedComplements(prev => {
      if (prev.find(c => c.id === complement.id)) {
        return prev.filter(c => c.id !== complement.id);
      }
      const categoryCount = prev.filter(c => c.category === complement.category).length;
      if (categoryCount >= complement.max_per_product) return prev;
      return [...prev, complement];
    });
  };

  const handleAdd = () => {
    if (!product || !selectedSize) return;
    addItem(product, selectedSize, selectedToppings, selectedComplements, quantity, notes);
    onClose();
  };

  const complementsByCategory = useMemo(() => {
    const map: Record<string, Complement[]> = {};
    (complements || []).forEach(c => {
      if (!map[c.category]) map[c.category] = [];
      map[c.category].push(c);
    });
    return map;
  }, [complements]);

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
            {/* Header */}
            <div className="relative h-40 bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
              <span className="text-7xl">🍇</span>
              <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors">
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1">{product.name}</h2>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Tamanho</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedSize?.name === size.name
                          ? 'gradient-neon text-primary-foreground neon-glow'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {size.name} ({size.ml}ml) — R$ {size.price.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toppings */}
              {toppings && toppings.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Toppings</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {toppings.map(topping => {
                      const isSelected = selectedToppings.some(t => t.id === topping.id);
                      return (
                        <button
                          key={topping.id}
                          onClick={() => toggleTopping(topping)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-primary/15 border-2 border-primary text-foreground'
                              : 'bg-secondary text-secondary-foreground border-2 border-transparent hover:bg-secondary/80'
                          }`}
                        >
                          <span>{topping.name}</span>
                          <span className="tabular-nums">+R$ {topping.price.toFixed(2)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Complements */}
              {Object.entries(complementsByCategory).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{category}</h3>
                  <p className="text-[11px] text-muted-foreground mb-2">Máx. {items[0]?.max_per_product} por pedido</p>
                  <div className="grid grid-cols-2 gap-2">
                    {items.map(comp => {
                      const isSelected = selectedComplements.some(c => c.id === comp.id);
                      return (
                        <button
                          key={comp.id}
                          onClick={() => toggleComplement(comp)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-accent/15 border-2 border-accent text-foreground'
                              : 'bg-secondary text-secondary-foreground border-2 border-transparent hover:bg-secondary/80'
                          }`}
                        >
                          <span>{comp.name}</span>
                          <span className="tabular-nums">+R$ {comp.price.toFixed(2)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Notes */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Observações</h3>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Ex: sem leite condensado..."
                  className="w-full px-3 py-2 rounded-xl bg-secondary/60 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none h-20"
                />
              </div>
            </div>

            {/* Footer */}
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
                  className="flex-1 gradient-neon text-primary-foreground font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 neon-glow"
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
