import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-card flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Carrinho</h2>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button onClick={clearCart} className="text-xs text-destructive hover:underline">
                    Limpar
                  </button>
                )}
                <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/40 mb-3" />
                  <p className="text-sm text-muted-foreground">Seu carrinho está vazio</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Adicione brownies do cardápio</p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      className="glass rounded-xl p-3"
                    >
                      <div className="flex gap-3">
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {item.product.image_url ? (
                            <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl">🍫</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground truncate">{item.product.name}</h4>
                          <p className="text-[11px] text-muted-foreground">
                            {item.selectedSize.name} ({item.selectedSize.weight}g)
                            {item.toppings.length > 0 && ` • ${item.toppings.map(t => t.name).join(', ')}`}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1.5 bg-secondary rounded-lg">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary">
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-bold w-5 text-center tabular-nums">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary">
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-gradient-chocolate tabular-nums">
                              R$ {item.totalPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-1 self-start hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-border/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-bold text-foreground tabular-nums">R$ {subtotal.toFixed(2)}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { onClose(); onCheckout(); }}
                  className="w-full gradient-chocolate text-primary-foreground font-semibold py-3 rounded-xl text-sm warm-glow"
                >
                  Finalizar Pedido
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
