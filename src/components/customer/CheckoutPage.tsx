import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useStore } from '@/contexts/StoreContext';
import { useNeighborhoods, useCoupons } from '@/hooks/useCheckout';
import { Neighborhood, Coupon } from '@/types';
import { ArrowLeft, MessageCircle, Copy, Check, Tag } from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutPageProps {
  onBack: () => void;
}

export default function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { items, subtotal, clearCart } = useCart();
  const { settings, isOpen } = useStore();
  const { data: neighborhoods } = useNeighborhoods();
  const { validateCoupon } = useCoupons();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cash'>('pix');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [pixCopied, setPixCopied] = useState(false);

  const deliveryFee = selectedNeighborhood?.delivery_fee || 0;

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percent') return subtotal * (appliedCoupon.value / 100);
    return Math.min(appliedCoupon.value, subtotal);
  }, [appliedCoupon, subtotal]);

  const total = subtotal + deliveryFee - discount;

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleApplyCoupon = () => {
    const coupon = validateCoupon(couponCode);
    if (coupon) {
      setAppliedCoupon(coupon);
      toast.success(`Cupom "${coupon.code}" aplicado!`);
    } else {
      toast.error('Cupom inválido ou expirado');
    }
  };

  const handleWhatsApp = () => {
    if (!name.trim() || !phone.trim() || !address.trim() || !selectedNeighborhood) {
      toast.error('Preencha todos os campos');
      return;
    }
    if (!isOpen) {
      toast.error('Loja fechada no momento');
      return;
    }

    const itemsList = items.map(i =>
      `• ${i.quantity}x ${i.product.name} (${i.selectedSize.name})${i.toppings.length > 0 ? ` + ${i.toppings.map(t => t.name).join(', ')}` : ''}${i.complements.length > 0 ? ` + ${i.complements.map(c => c.name).join(', ')}` : ''}${i.notes ? ` (${i.notes})` : ''} — R$ ${i.totalPrice.toFixed(2)}`
    ).join('\n');

    const msg = encodeURIComponent(
      `🍇 *Pedido NeonBerry Açaí*\n\n` +
      `👤 *Cliente:* ${name.trim()}\n📱 ${phone}\n📍 ${address.trim()} — ${selectedNeighborhood.name}\n\n` +
      `📋 *Itens:*\n${itemsList}\n\n` +
      `💰 Subtotal: R$ ${subtotal.toFixed(2)}\n` +
      `🚚 Entrega: R$ ${deliveryFee.toFixed(2)}\n` +
      (discount > 0 ? `🏷️ Desconto: -R$ ${discount.toFixed(2)}\n` : '') +
      `✅ *Total: R$ ${total.toFixed(2)}*\n\n` +
      `💳 Pagamento: ${paymentMethod === 'pix' ? 'PIX' : 'Dinheiro'}`
    );

    window.open(`https://wa.me/${settings.whatsapp_number}?text=${msg}`, '_blank');
    clearCart();
    toast.success('Pedido enviado pelo WhatsApp!');
    onBack();
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('neonberry@pix.com');
    setPixCopied(true);
    toast.success('Chave PIX copiada!');
    setTimeout(() => setPixCopied(false), 2000);
  };

  if (!isOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <span className="text-5xl mb-4 block">🔒</span>
          <h2 className="text-xl font-bold text-foreground mb-2">Loja Fechada</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Funcionamos das {settings.opening_time} às {settings.closing_time}
          </p>
          <button onClick={onBack} className="text-sm text-primary font-medium hover:underline">
            Voltar ao cardápio
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="min-h-screen pb-24"
    >
      <div className="sticky top-0 z-40 glass-strong p-4 flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-secondary transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Finalizar Pedido</h1>
      </div>

      <div className="p-4 space-y-5 max-w-lg mx-auto">
        {/* Customer info */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Seus dados</h2>
          <input
            value={name} onChange={e => setName(e.target.value)}
            placeholder="Nome completo"
            className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <input
            value={phone} onChange={e => setPhone(formatPhone(e.target.value))}
            placeholder="(00) 00000-0000"
            className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </section>

        {/* Address */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Endereço</h2>
          <input
            value={address} onChange={e => setAddress(e.target.value)}
            placeholder="Rua, número, complemento"
            className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Bairro</label>
            <div className="flex gap-2 flex-wrap">
              {(neighborhoods || []).map(n => (
                <button
                  key={n.id}
                  onClick={() => setSelectedNeighborhood(n)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedNeighborhood?.id === n.id
                      ? 'gradient-neon text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {n.name} (R$ {n.delivery_fee.toFixed(2)})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Pagamento</h2>
          <div className="flex gap-2">
            {(['pix', 'cash'] as const).map(method => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  paymentMethod === method
                    ? 'gradient-neon text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {method === 'pix' ? '💠 PIX' : '💵 Dinheiro'}
              </button>
            ))}
          </div>
          {paymentMethod === 'pix' && (
            <div className="glass rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-2">Chave PIX (e-mail):</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm text-foreground bg-secondary px-3 py-2 rounded-lg font-mono">
                  neonberry@pix.com
                </code>
                <button onClick={handleCopyPix} className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  {pixCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Coupon */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Tag className="w-4 h-4" /> Cupom
          </h2>
          <div className="flex gap-2">
            <input
              value={couponCode}
              onChange={e => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Código do cupom"
              className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-primary/40"
              disabled={!!appliedCoupon}
            />
            {appliedCoupon ? (
              <button onClick={() => { setAppliedCoupon(null); setCouponCode(''); }} className="px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive text-sm font-medium">
                Remover
              </button>
            ) : (
              <button onClick={handleApplyCoupon} className="px-4 py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                Aplicar
              </button>
            )}
          </div>
          {appliedCoupon && (
            <p className="text-xs text-green-600">
              ✅ {appliedCoupon.type === 'percent' ? `${appliedCoupon.value}% de desconto` : `R$ ${appliedCoupon.value.toFixed(2)} de desconto`}
            </p>
          )}
        </section>

        {/* Summary */}
        <section className="glass rounded-xl p-4 space-y-2">
          <h2 className="text-sm font-semibold text-foreground mb-2">Resumo</h2>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span className="tabular-nums">R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Entrega</span>
            <span className="tabular-nums">R$ {deliveryFee.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Desconto</span>
              <span className="tabular-nums">-R$ {discount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-border/50 pt-2 flex justify-between">
            <span className="font-bold text-foreground">Total</span>
            <span className="text-lg font-bold text-gradient-neon tabular-nums">R$ {total.toFixed(2)}</span>
          </div>
        </section>

        {/* WhatsApp button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleWhatsApp}
          className="w-full py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/20"
        >
          <MessageCircle className="w-5 h-5" />
          Enviar Pedido pelo WhatsApp
        </motion.button>
      </div>
    </motion.div>
  );
}
