import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { AuthService } from '@/services/authService';

export const AdminLogin: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect directly to admin dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await AuthService.login(email, password);
      if (response.success && response.data) {
        login(response.data.token, response.data.user);
        navigate('/admin/dashboard');
      } else {
        setError(response.message || 'Invalid credentials.');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 selection:bg-primary-container selection:text-on-primary-container">
      <div className="w-full max-w-md bg-surface-container industrial-border p-8 rounded-sm space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <Logo className="justify-center" />
          <span className="font-label-caps text-xs text-primary font-bold tracking-widest uppercase block pt-2">
            ADMINISTRATOR CONTROL CENTER
          </span>
        </div>

        {error && (
          <div className="p-3 bg-error/10 border border-error/40 text-error rounded-xs font-body-sm text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Admin Email *"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password *"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            LOG IN TO DASHBOARD
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
