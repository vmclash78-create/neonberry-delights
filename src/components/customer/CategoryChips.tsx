import { motion } from 'framer-motion';
import { Category } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Cookie, Crown, CakeSlice, Gift, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'cookie': Cookie,
  'crown': Crown,
  'cake-slice': CakeSlice,
  'gift': Gift,
};

interface CategoryChipsProps {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  isLoading: boolean;
}

export default function CategoryChips({ categories, selectedId, onSelect, isLoading }: CategoryChipsProps) {
  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto px-4 py-4 scrollbar-hide">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-28 rounded-xl flex-shrink-0" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-4 scrollbar-hide">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          selectedId === null
            ? 'gradient-neon text-primary-foreground neon-glow'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        Todos
      </motion.button>
      {categories.map((cat, i) => {
        const IconComponent = iconMap[cat.icon];
        return (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(cat.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              selectedId === cat.id
                ? 'gradient-neon text-primary-foreground neon-glow'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {IconComponent && <IconComponent className="w-4 h-4" />}
            {cat.name}
          </motion.button>
        );
      })}
    </div>
  );
}

