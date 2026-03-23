import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockCoupons } from '@/data/mock-data';
import { Coupon } from '@/types';
import { Plus, Trash2, Tag } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', type: 'percent' as 'percent' | 'fixed', value: '', expires: '' });

  const toggleActive = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
    toast.success('Cupom atualizado');
  };

  const addCoupon = () => {
    if (!form.code || !form.value) { toast.error('Preencha os campos'); return; }
    const newCoupon: Coupon = {
      id: `cp-${Date.now()}`,
      code: form.code.toUpperCase(),
      type: form.type,
      value: parseFloat(form.value),
      active: true,
      expires_at: form.expires || '2026-12-31',
    };
    setCoupons(prev => [...prev, newCoupon]);
    setShowForm(false);
    setForm({ code: '', type: 'percent', value: '', expires: '' });
    toast.success('Cupom criado!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Cupons</h1>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 gradient-neon text-primary-foreground rounded-xl text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Novo Cupom
        </motion.button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass rounded-2xl p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} placeholder="Código" className="px-3 py-2 rounded-xl bg-secondary/60 border border-border/50 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as 'percent' | 'fixed' }))} className="px-3 py-2 rounded-xl bg-secondary/60 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
              <option value="percent">Percentual (%)</option>
              <option value="fixed">Valor fixo (R$)</option>
            </select>
            <input type="number" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} placeholder="Valor" className="px-3 py-2 rounded-xl bg-secondary/60 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <input type="date" value={form.expires} onChange={e => setForm(f => ({ ...f, expires: e.target.value }))} className="px-3 py-2 rounded-xl bg-secondary/60 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <button onClick={addCoupon} className="px-4 py-2 gradient-neon text-primary-foreground rounded-xl text-sm font-medium">
            Salvar
          </button>
        </motion.div>
      )}

      <div className="space-y-3">
        {coupons.map(coupon => (
          <div key={coupon.id} className="glass rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Tag className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-mono text-foreground">{coupon.code}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${coupon.active ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'}`}>
                  {coupon.active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {coupon.type === 'percent' ? `${coupon.value}% de desconto` : `R$ ${coupon.value.toFixed(2)} de desconto`}
                {' • Expira em '}
                {new Date(coupon.expires_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <button onClick={() => toggleActive(coupon.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary hover:bg-secondary/80 transition-colors">
              {coupon.active ? 'Desativar' : 'Ativar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
