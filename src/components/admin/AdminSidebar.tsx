import { LayoutDashboard, ShoppingBag, Package, Tag, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export type AdminView = 'dashboard' | 'orders' | 'products' | 'coupons' | 'settings';

interface AdminSidebarProps {
  active: AdminView;
  onNavigate: (view: AdminView) => void;
  onLogout: () => void;
}

const navItems = [
  { id: 'dashboard' as AdminView, icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'orders' as AdminView, icon: ShoppingBag, label: 'Pedidos' },
  { id: 'products' as AdminView, icon: Package, label: 'Produtos' },
  { id: 'coupons' as AdminView, icon: Tag, label: 'Cupons' },
  { id: 'settings' as AdminView, icon: Settings, label: 'Configurações' },
];

export default function AdminSidebar({ active, onNavigate, onLogout }: AdminSidebarProps) {
  return (
    <aside className="w-64 h-screen glass-strong border-r border-border/50 flex flex-col p-4 fixed left-0 top-0 z-40">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-9 h-9 gradient-chocolate rounded-xl flex items-center justify-center text-sm font-bold text-primary-foreground">
          B
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground">Brownie & Co.</h2>
          <p className="text-[10px] text-muted-foreground">Painel Admin</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="admin-sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 gradient-chocolate rounded-r-full"
                />
              )}
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
      >
        <LogOut className="w-4 h-4" />
        Sair
      </button>
    </aside>
  );
}
