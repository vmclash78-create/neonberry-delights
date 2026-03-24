import { motion } from 'framer-motion';
import { useStore } from '@/contexts/StoreContext';
import { ShoppingBag, Star, Truck } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const { settings, isOpen } = useStore();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden mx-3 mt-3 rounded-3xl min-h-[260px] md:min-h-[340px] flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-neon" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(30_65%_48%/0.35),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.3),transparent_50%)]" />

      {/* Decorative brownie circles */}
      <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-white/5 border border-white/10" />
      <div className="absolute -right-4 top-12 w-32 h-32 rounded-full bg-white/5 border border-white/10" />
      <div className="absolute right-16 -bottom-6 w-24 h-24 rounded-full bg-white/5 border border-white/10" />

      {/* Big brownie icon */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-2 opacity-90">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-[80px] md:text-[110px] drop-shadow-2xl select-none"
          style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }}
        >
          🍫
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-10 max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-white/15 px-3 py-1 rounded-full mb-4 backdrop-blur-sm border border-white/20">
            <Star className="w-3 h-3 fill-white" /> Artesanal & Premium
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-[1.1] tracking-tight mb-3">
            {settings.name}
          </h2>

          <p className="text-white/80 text-sm md:text-base mb-6 max-w-xs">
            Brownies artesanais irresistíveis, feitos com chocolate belga. Entrega rápida na sua porta.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onCtaClick}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-primary font-bold rounded-2xl text-sm shadow-lg shadow-black/30 hover:shadow-xl transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              Pedir Agora
            </motion.button>

            <span className="flex items-center gap-1.5 text-white/75 text-xs">
              <Truck className="w-3.5 h-3.5" />
              Entrega {isOpen ? 'disponível' : 'indisponível'}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
