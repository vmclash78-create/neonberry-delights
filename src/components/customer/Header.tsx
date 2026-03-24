import { useStore } from '@/contexts/StoreContext';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const { settings, isOpen } = useStore();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 glass-strong"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-chocolate flex items-center justify-center text-lg font-bold text-primary-foreground">
              B
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-foreground">{settings.name}</h1>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>Delivery & Retirada</span>
                <span className={`ml-1 inline-block w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-destructive'}`} />
                <span>{isOpen ? 'Aberto' : 'Fechado'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar brownie, combo..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
          />
        </div>
      </div>
    </motion.header>
  );
}
