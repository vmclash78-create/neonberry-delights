import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Preencha todos os campos');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (email === 'admin@brownieandco.com' && password === 'admin123') {
        toast.success('Login realizado!');
        onLogin();
      } else {
        toast.error('Credenciais inválidas');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 w-full max-w-sm space-y-6"
      >
        <div className="text-center">
          <div className="w-14 h-14 gradient-chocolate rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Admin Brownie & Co.</h1>
          <p className="text-sm text-muted-foreground mt-1">Acesse o painel administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail"
            className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full gradient-chocolate text-primary-foreground font-semibold py-3 rounded-xl text-sm warm-glow disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </motion.button>
        </form>

        <p className="text-[11px] text-muted-foreground text-center">
          Demo: admin@brownieandco.com / admin123
        </p>
      </motion.div>
    </div>
  );
}
