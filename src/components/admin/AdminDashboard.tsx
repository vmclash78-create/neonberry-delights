import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const stats = [
  { label: 'Vendas Hoje', value: 'R$ 1.847,50', change: '+12%', icon: DollarSign, color: 'text-green-500' },
  { label: 'Pedidos', value: '47', change: '+8%', icon: ShoppingBag, color: 'text-primary' },
  { label: 'Ticket Médio', value: 'R$ 39,31', change: '+3%', icon: TrendingUp, color: 'text-accent' },
  { label: 'Clientes', value: '34', change: '+15%', icon: Users, color: 'text-amber-500' },
];

const weeklyData = [
  { day: 'Seg', vendas: 1200 }, { day: 'Ter', vendas: 1800 }, { day: 'Qua', vendas: 1400 },
  { day: 'Qui', vendas: 2200 }, { day: 'Sex', vendas: 2800 }, { day: 'Sáb', vendas: 3200 }, { day: 'Dom', vendas: 2600 },
];

const topProducts = [
  { name: 'NeonBerry Special', qty: 23, revenue: 828 },
  { name: 'Açaí Puro G', qty: 19, revenue: 532 },
  { name: 'Berry Explosion', qty: 14, revenue: 532 },
  { name: 'Combo Casal', qty: 11, revenue: 438.90 },
  { name: 'Smoothie Energético', qty: 9, revenue: 252 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-[11px] font-medium text-green-500">{stat.change}</span>
            </div>
            <p className="text-xl font-bold text-foreground tabular-nums">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Vendas da Semana</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="vendas" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Tendência</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyData}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="vendas" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: 'hsl(var(--accent))' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Top Produtos</h3>
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div key={p.name} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="flex-1 text-sm text-foreground">{p.name}</span>
              <span className="text-xs text-muted-foreground tabular-nums">{p.qty} vendas</span>
              <span className="text-sm font-semibold text-foreground tabular-nums">R$ {p.revenue.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
