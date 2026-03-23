import { motion } from 'framer-motion';
import { Category } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

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
      {categories.map((cat, i) => (
        <motion.button
          key={cat.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(cat.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
            selectedId === cat.id
              ? 'gradient-neon text-primary-foreground neon-glow'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {cat.icon} {cat.name}
        </motion.button>
      ))}
    </div>
  );
}
