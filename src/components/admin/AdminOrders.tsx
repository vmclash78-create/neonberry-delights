import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Order, OrderStatus } from '@/types';
import { Clock, ChefHat, Truck, CheckCircle, XCircle } from 'lucide-react';

const statusConfig: Record<OrderStatus, { label: string; icon: React.ElementType; color: string }> = {
  pending: { label: 'Novo', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
  confirmed: { label: 'Confirmado', icon: CheckCircle, color: 'text-blue-500 bg-blue-500/10' },
  preparing: { label: 'Preparando', icon: ChefHat, color: 'text-primary bg-primary/10' },
  out_for_delivery: { label: 'Saiu p/ Entrega', icon: Truck, color: 'text-accent bg-accent/10' },
  delivered: { label: 'Entregue', icon: CheckCircle, color: 'text-green-500 bg-green-500/10' },
  cancelled: { label: 'Cancelado', icon: XCircle, color: 'text-destructive bg-destructive/10' },
};

const statusFlow: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];

const mockOrders: Order[] = [
  {
    id: 'ord-001', customer_name: 'Marina Silva', customer_phone: '(11) 98765-4321',
    items: [], subtotal: 58, delivery_fee: 7, discount_value: 0, coupon_id: null, total: 65,
    address: 'Rua das Flores, 123 — Jardim América', neighborhood_id: 'n2',
    payment_method: 'pix', status: 'pending', notes: '', created_at: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 'ord-002', customer_name: 'Carlos Eduardo', customer_phone: '(11) 91234-5678',
    items: [], subtotal: 39.90, delivery_fee: 5, discount_value: 3.99, coupon_id: 'cp1', total: 40.91,
    address: 'Av. Principal, 456 — Centro', neighborhood_id: 'n1',
    payment_method: 'cash', status: 'preparing', notes: 'Sem granola', created_at: new Date(Date.now() - 1200000).toISOString(),
  },
  {
    id: 'ord-003', customer_name: 'Ana Beatriz', customer_phone: '(11) 99876-5432',
    items: [], subtotal: 72, delivery_fee: 8, discount_value: 0, coupon_id: null, total: 80,
    address: 'Rua Nova, 789 — Vila Nova', neighborhood_id: 'n3',
    payment_method: 'pix', status: 'out_for_delivery', notes: '', created_at: new Date(Date.now() - 3600000).toISOString(),
  },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const advanceStatus = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const currentIdx = statusFlow.indexOf(o.status);
      if (currentIdx < 0 || currentIdx >= statusFlow.length - 1) return o;
      return { ...o, status: statusFlow[currentIdx + 1] };
    }));
  };

  const timeSince = (dateStr: string) => {
    const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (mins < 60) return `${mins}min`;
    return `${Math.floor(mins / 60)}h ${mins % 60}min`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0 ${
            filter === 'all' ? 'gradient-neon text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          }`}
        >
          Todos ({orders.length})
        </button>
        {statusFlow.map(s => {
          const count = orders.filter(o => o.status === s).length;
          const cfg = statusConfig[s];
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0 ${
                filter === s ? 'gradient-neon text-primary-foreground' : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.map(order => {
            const cfg = statusConfig[order.status];
            const StatusIcon = cfg.icon;
            const canAdvance = statusFlow.indexOf(order.status) >= 0 && statusFlow.indexOf(order.status) < statusFlow.length - 1;

            return (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-foreground">#{order.id.slice(-3)}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium ${cfg.color}`}>
                        <StatusIcon className="w-3 h-3" /> {cfg.label}
                      </span>
                    </div>
                    <p className="text-sm text-foreground font-medium">{order.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{order.customer_phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground tabular-nums">R$ {order.total.toFixed(2)}</p>
                    <p className="text-[11px] text-muted-foreground">{timeSince(order.created_at)} atrás</p>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground mb-3">
                  📍 {order.address}
                  {order.notes && <span className="block mt-1">📝 {order.notes}</span>}
                  <span className="block mt-1">💳 {order.payment_method === 'pix' ? 'PIX' : 'Dinheiro'}</span>
                </div>

                {canAdvance && (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => advanceStatus(order.id)}
                    className="w-full py-2 rounded-xl gradient-neon text-primary-foreground text-xs font-semibold"
                  >
                    Avançar → {statusConfig[statusFlow[statusFlow.indexOf(order.status) + 1]].label}
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
