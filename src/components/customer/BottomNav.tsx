import { Home, UtensilsCrossed, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

type Tab = 'home' | 'menu' | 'cart' | 'favorites';

interface BottomNavProps {
  active: Tab;
  onNavigate: (tab: Tab) => void;
}

const tabs = [
  { id: 'home' as Tab, icon: Home, label: 'Início' },
  { id: 'menu' as Tab, icon: UtensilsCrossed, label: 'Cardápio' },
  { id: 'cart' as Tab, icon: ShoppingCart, label: 'Carrinho' },
  { id: 'favorites' as Tab, icon: Heart, label: 'Favoritos' },
];

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around py-2">
        {tabs.map(tab => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="relative flex flex-col items-center gap-0.5 px-4 py-1 transition-colors"
            >
              <div className="relative">
                <tab.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                {tab.id === 'cart' && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-2 w-4 h-4 gradient-chocolate rounded-full text-[10px] font-bold text-primary-foreground flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomnav-indicator"
                  className="absolute -top-0.5 w-8 h-0.5 gradient-chocolate rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
