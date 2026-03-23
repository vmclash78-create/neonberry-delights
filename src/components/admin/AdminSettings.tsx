import { useState } from 'react';
import { mockStoreSettings } from '@/data/mock-data';
import { StoreSettings } from '@/types';
import { toast } from 'sonner';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminSettings() {
  const [settings, setSettings] = useState<StoreSettings>(mockStoreSettings);

  const update = (key: keyof StoreSettings, value: string | boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast.success('Configurações salvas!');
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 gradient-neon text-primary-foreground rounded-xl text-sm font-medium"
        >
          <Save className="w-4 h-4" /> Salvar
        </motion.button>
      </div>

      {/* General */}
      <section className="glass rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Geral</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Nome da loja</label>
            <input value={settings.name} onChange={e => update('name', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Telefone</label>
            <input value={settings.phone} onChange={e => update('phone', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">WhatsApp (com DDI)</label>
            <input value={settings.whatsapp_number} onChange={e => update('whatsapp_number', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Pedido mínimo</label>
            <input type="number" value={settings.min_order_value} onChange={e => update('min_order_value', parseFloat(e.target.value))} className={inputClass} />
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="glass rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Horário</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Abertura</label>
            <input type="time" value={settings.opening_time} onChange={e => update('opening_time', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Fechamento</label>
            <input type="time" value={settings.closing_time} onChange={e => update('closing_time', e.target.value)} className={inputClass} />
          </div>
        </div>
      </section>

      {/* Toggles */}
      <section className="glass rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Opções</h2>
        <div className="space-y-3">
          {[
            { key: 'delivery_enabled' as const, label: 'Delivery habilitado' },
            { key: 'pickup_enabled' as const, label: 'Retirada habilitada' },
            { key: 'auto_accept_orders' as const, label: 'Aceitar pedidos automaticamente' },
          ].map(opt => (
            <label key={opt.key} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-foreground">{opt.label}</span>
              <button
                onClick={() => update(opt.key, !settings[opt.key])}
                className={`w-11 h-6 rounded-full transition-colors relative ${settings[opt.key] ? 'bg-primary' : 'bg-muted'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${settings[opt.key] ? 'left-[22px]' : 'left-0.5'}`} />
              </button>
            </label>
          ))}
        </div>
      </section>

      {/* Social */}
      <section className="glass rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Redes Sociais</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Instagram</label>
            <input value={settings.instagram} onChange={e => update('instagram', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Facebook</label>
            <input value={settings.facebook} onChange={e => update('facebook', e.target.value)} className={inputClass} />
          </div>
        </div>
      </section>
    </div>
  );
}
