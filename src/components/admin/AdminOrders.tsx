import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrders, useUpdateOrderStatus } from '@/hooks/useOrders';
import { Clock, ChefHat, Truck, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  pending: { label: 'Novo', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
  paid: { label: 'Pago', icon: CheckCircle, color: 'text-blue-500 bg-blue-500/10' },
  preparing: { label: 'Preparando', icon: ChefHat, color: 'text-primary bg-primary/10' },
  delivered: { label: 'Entregue', icon: CheckCircle, color: 'text-green-500 bg-green-500/10' },
  cancelled: { label: 'Cancelado', icon: XCircle, color: 'text-destructive bg-destructive/10' },
};

const statusFlow = ['pending', 'paid', 'preparing', 'delivered'];

export default function AdminOrders() {
  const { data: orders, isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? (orders || []) : (orders || []).filter(o => o.status === filter);

  const advanceStatus = async (orderId: string, currentStatus: string) => {
    const currentIdx = statusFlow.indexOf(currentStatus);
    if (currentIdx < 0 || currentIdx >= statusFlow.length - 1) return;
    const newStatus = statusFlow[currentIdx + 1];
    try {
      await updateStatus.mutateAsync({ id: orderId, status: newStatus });
      toast.success(`Status atualizado para ${statusConfig[newStatus]?.label || newStatus}`);
    } catch {
      toast.error('Erro ao atualizar status');
    }
  };

  const timeSince = (dateStr: string) => {
    const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (mins < 60) return `${mins}min`;
    return `${Math.floor(mins / 60)}h ${mins % 60}min`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0 ${
            filter === 'all' ? 'gradient-chocolate text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          }`}
        >
          Todos ({(orders || []).length})
        </button>
        {statusFlow.map(s => {
          const count = (orders || []).filter(o => o.status === s).length;
          const cfg = statusConfig[s];
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0 ${
                filter === s ? 'gradient-chocolate text-primary-foreground' : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {cfg?.label || s} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {filtered.map(order => {
            const cfg = statusConfig[order.status] || statusConfig.pending;
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
                      <span className="text-sm font-bold text-foreground">#{order.id.slice(-6).toUpperCase()}</span>
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
                  📍 {order.customer_address}
                  {order.notes && <span className="block mt-1">📝 {order.notes}</span>}
                  <span className="block mt-1">💳 {order.payment_method === 'pix' ? 'PIX' : 'WhatsApp'}</span>
                </div>

                {canAdvance && (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => advanceStatus(order.id, order.status)}
                    disabled={updateStatus.isPending}
                    className="w-full py-2 rounded-xl gradient-chocolate text-primary-foreground text-xs font-semibold disabled:opacity-50"
                  >
                    Avançar → {statusConfig[statusFlow[statusFlow.indexOf(order.status) + 1]]?.label}
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-12">Nenhum pedido encontrado</p>
        )}
      </div>
    </div>
  );
}
