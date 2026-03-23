import { useState } from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminSidebar, { AdminView } from '@/components/admin/AdminSidebar';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminCoupons from '@/components/admin/AdminCoupons';
import AdminSettings from '@/components/admin/AdminSettings';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<AdminView>('dashboard');

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <AdminDashboard />;
      case 'orders': return <AdminOrders />;
      case 'products': return <AdminProducts />;
      case 'coupons': return <AdminCoupons />;
      case 'settings': return <AdminSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar active={activeView} onNavigate={setActiveView} onLogout={() => setAuthenticated(false)} />
      <main className="ml-64 p-6">
        {renderView()}
      </main>
    </div>
  );
}
