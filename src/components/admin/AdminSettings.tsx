import { useState, useEffect } from 'react';
import { useStoreSettings, useUpdateStoreSettings, StoreSettingsRow } from '@/hooks/useStoreSettings';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminSettings() {
  const { data: settings, isLoading } = useStoreSettings();
  const updateSettings = useUpdateStoreSettings();
  const [form, setForm] = useState<Partial<StoreSettingsRow>>({});

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const update = (key: keyof StoreSettingsRow, value: string | boolean | number) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!form.id) return;
    try {
      await updateSettings.mutateAsync(form);
      toast.success('Configurações salvas!');
    } catch {
      toast.error('Erro ao salvar');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={updateSettings.isPending}
          className="flex items-center gap-2 px-4 py-2 gradient-chocolate text-primary-foreground rounded-xl text-sm font-medium disabled:opacity-50"
        >
          {updateSettings.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Salvar
        </motion.button>
      </div>

      <section className="glass rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Geral</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Nome da loja</label>
            <input value={form.store_name || ''} onChange={e => update('store_name', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">WhatsApp (com DDI)</label>
            <input value={form.whatsapp_number || ''} onChange={e => update('whatsapp_number', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Chave PIX</label>
            <input value={form.pix_key || ''} onChange={e => update('pix_key', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Pedido mínimo</label>
            <input type="number" value={form.min_order_value || 0} onChange={e => update('min_order_value', parseFloat(e.target.value))} className={inputClass} />
          </div>
        </div>
      </section>

      <section className="glass rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Horário</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Abertura</label>
            <input type="time" value={form.opening_time || ''} onChange={e => update('opening_time', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Fechamento</label>
            <input type="time" value={form.closing_time || ''} onChange={e => update('closing_time', e.target.value)} className={inputClass} />
          </div>
        </div>
      </section>

      <section className="glass rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Opções</h2>
        <div className="space-y-3">
          {[
            { key: 'allow_pix' as const, label: 'PIX habilitado' },
            { key: 'allow_whatsapp' as const, label: 'WhatsApp habilitado' },
            { key: 'delivery_enabled' as const, label: 'Delivery habilitado' },
            { key: 'pickup_enabled' as const, label: 'Retirada habilitada' },
          ].map(opt => (
            <label key={opt.key} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-foreground">{opt.label}</span>
              <button
                onClick={() => update(opt.key, !form[opt.key])}
                className={`w-11 h-6 rounded-full transition-colors relative ${form[opt.key] ? 'bg-primary' : 'bg-muted'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form[opt.key] ? 'left-[22px]' : 'left-0.5'}`} />
              </button>
            </label>
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Redes Sociais</h2>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Instagram</label>
          <input value={form.instagram || ''} onChange={e => update('instagram', e.target.value)} className={inputClass} />
        </div>
      </section>
    </div>
  );
}
