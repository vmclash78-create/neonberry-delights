import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useStore } from '@/contexts/StoreContext';
import { useCreateOrder } from '@/hooks/useOrders';
import { ArrowLeft, MessageCircle, Copy, Check, Tag, CheckCircle, Loader2, ShieldCheck, Truck, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutPageProps {
  onBack: () => void;
}

export default function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { items, subtotal, clearCart } = useCart();
  const { settings, isOpen } = useStore();
  const createOrder = useCreateOrder();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'whatsapp'>('whatsapp');
  const [pixCopied, setPixCopied] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleFinishOrder = async () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error('Preencha todos os campos');
      return;
    }
    if (!isOpen) {
      toast.error('Loja fechada no momento');
      return;
    }

    try {
      const order = await createOrder.mutateAsync({
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_address: address.trim(),
        subtotal,
        delivery_fee: deliveryFee,
        discount_value: 0,
        total,
        payment_method: paymentMethod,
        notes: '',
        items: items.map(i => ({
          product_id: i.product.id,
          name: i.product.name,
          quantity: i.quantity,
          price: i.totalPrice,
          details: `${i.selectedSize.name} (${i.selectedSize.weight}g)${i.toppings.length > 0 ? ` + ${i.toppings.map(t => t.name).join(', ')}` : ''}${i.complements.length > 0 ? ` + ${i.complements.map(c => c.name).join(', ')}` : ''}`,
        })),
      });

      setCreatedOrderId(order.id);

      if (paymentMethod === 'whatsapp' && settings?.allow_whatsapp) {
        const itemsList = items.map(i =>
          `• ${i.quantity}x ${i.product.name} (${i.selectedSize.name})${i.toppings.length > 0 ? ` + ${i.toppings.map(t => t.name).join(', ')}` : ''} — R$ ${i.totalPrice.toFixed(2)}`
        ).join('\n');

        const msg = encodeURIComponent(
          `🍫 *Pedido Brownie & Co.*\n\n` +
          `👤 *Cliente:* ${name.trim()}\n📱 ${phone}\n📍 ${address.trim()}\n\n` +
          `📋 *Itens:*\n${itemsList}\n\n` +
          `🚚 Entrega: R$ ${deliveryFee.toFixed(2)}\n` +
          `✅ *Total: R$ ${total.toFixed(2)}*\n\n` +
          `💳 Pagamento: WhatsApp`
        );
        window.open(`https://wa.me/${settings.whatsapp_number}?text=${msg}`, '_blank');
      }

      clearCart();
      setOrderSuccess(true);
      toast.success('Pedido criado com sucesso!');
    } catch {
      toast.error('Erro ao criar pedido. Tente novamente.');
    }
  };

  const handleCopyPix = () => {
    if (settings?.pix_key) {
      navigator.clipboard.writeText(settings.pix_key);
      setPixCopied(true);
      toast.success('Chave PIX copiada!');
      setTimeout(() => setPixCopied(false), 2000);
    }
  };

  if (orderSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center p-6"
      >
        <div className="text-center max-w-sm">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Pedido Confirmado!</h2>
          <p className="text-sm text-muted-foreground mb-2">
            Seu pedido #{createdOrderId?.slice(-6).toUpperCase()} foi recebido com sucesso.
          </p>
          {paymentMethod === 'pix' && settings?.pix_key && (
            <div className="glass rounded-xl p-4 my-4 text-left">
              <p className="text-xs text-muted-foreground mb-2">Faça o pagamento via PIX:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm text-foreground bg-secondary px-3 py-2 rounded-lg font-mono truncate">
                  {settings.pix_key}
                </code>
                <button onClick={handleCopyPix} className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  {pixCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Valor: <strong>R$ {total.toFixed(2)}</strong></p>
            </div>
          )}
          <p className="text-xs text-muted-foreground mb-6">
            {paymentMethod === 'whatsapp' ? 'Você foi redirecionado ao WhatsApp para confirmar.' : 'Envie o comprovante pelo WhatsApp da loja.'}
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 gradient-chocolate text-primary-foreground rounded-xl font-semibold text-sm warm-glow"
          >
            Voltar ao Cardápio
          </button>
        </div>
      </motion.div>
    );
  }

  if (!isOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <span className="text-5xl mb-4 block">🔒</span>
          <h2 className="text-xl font-bold text-foreground mb-2">Loja Fechada</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Funcionamos das {settings?.opening_time || '09:00'} às {settings?.closing_time || '21:00'}
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
        {/* Trust badges */}
        <div className="flex gap-3 justify-center">
          {[
            { icon: ShieldCheck, text: 'Pagamento Seguro' },
            { icon: Truck, text: 'Entrega Rápida' },
            { icon: Clock, text: 'Feito na Hora' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className="w-3.5 h-3.5 text-primary" />
              <span>{text}</span>
            </div>
          ))}
        </div>

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
          <h2 className="text-sm font-semibold text-foreground">Endereço de entrega</h2>
          <input
            value={address} onChange={e => setAddress(e.target.value)}
            placeholder="Rua, número, bairro, complemento"
            className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </section>

        {/* Payment */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Pagamento</h2>
          <div className="flex gap-2">
            {settings?.allow_whatsapp && (
              <button
                onClick={() => setPaymentMethod('whatsapp')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  paymentMethod === 'whatsapp'
                    ? 'bg-green-500 text-white'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                💬 WhatsApp
              </button>
            )}
            {settings?.allow_pix && (
              <button
                onClick={() => setPaymentMethod('pix')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  paymentMethod === 'pix'
                    ? 'gradient-chocolate text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                💠 PIX
              </button>
            )}
          </div>
          {paymentMethod === 'pix' && settings?.pix_key && (
            <div className="glass rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-2">Chave PIX:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm text-foreground bg-secondary px-3 py-2 rounded-lg font-mono truncate">
                  {settings.pix_key}
                </code>
                <button onClick={handleCopyPix} className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  {pixCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Order items summary */}
        <section className="glass rounded-xl p-4 space-y-2">
          <h2 className="text-sm font-semibold text-foreground mb-2">Resumo do Pedido</h2>
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.quantity}x {item.product.name}</span>
              <span className="tabular-nums text-foreground">R$ {item.totalPrice.toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-border/50 pt-2 mt-2 space-y-1">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span className="tabular-nums">R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Entrega</span>
              <span className="tabular-nums">R$ {deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="font-bold text-foreground">Total</span>
              <span className="text-lg font-bold text-gradient-chocolate tabular-nums">R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleFinishOrder}
          disabled={createOrder.isPending}
          className="w-full py-3.5 rounded-xl gradient-chocolate text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-colors warm-glow disabled:opacity-50"
        >
          {createOrder.isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : paymentMethod === 'whatsapp' ? (
            <>
              <MessageCircle className="w-5 h-5" />
              Finalizar e Enviar pelo WhatsApp
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Finalizar Pedido com PIX
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
