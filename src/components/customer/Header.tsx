import { useStore } from '@/contexts/StoreContext';
import { Search, MapPin, Cookie } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';

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
      className="sticky top-0 z-40 glass-strong border-b border-border/40"
    >
      <div className="container mx-auto px-4 py-3">
        {/* Top row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            {/* Logo */}
            <div className="w-10 h-10 rounded-2xl gradient-neon flex items-center justify-center shadow-md neon-glow">
              <Cookie className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-foreground leading-none">{settings.name}</h1>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-0.5">
                <MapPin className="w-2.5 h-2.5" />
                <span>Delivery & Retirada</span>
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-destructive'}`} />
                <span className={`font-medium ${isOpen ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}>
                  {isOpen ? 'Aberto' : 'Fechado'}
                </span>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar brownie..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-secondary/60 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
          />
        </div>
      </div>
    </motion.header>
  );
}
