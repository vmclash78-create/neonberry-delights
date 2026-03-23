import { motion } from 'framer-motion';
import { useStore } from '@/contexts/StoreContext';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const { settings } = useStore();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden mx-4 mt-4 rounded-2xl"
    >
      <div className="relative z-10 gradient-neon px-6 py-10 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(180_90%_55%/0.2),transparent_50%)]" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 bg-white/15 px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
            <Sparkles className="w-3 h-3" /> Delivery Premium
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-3" style={{ textWrap: 'balance' }}>
            {settings.name}
          </h2>
          <p className="text-white/75 text-sm md:text-base max-w-md mb-6">
            O melhor açaí da cidade, feito com ingredientes selecionados. Peça agora e receba em minutos.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCtaClick}
            className="px-6 py-3 bg-white text-primary font-semibold rounded-xl text-sm shadow-lg shadow-black/20 hover:shadow-xl transition-shadow active:scale-[0.97]"
          >
            Peça Agora
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
