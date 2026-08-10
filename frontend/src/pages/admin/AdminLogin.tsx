import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please enter your admin email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address format.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await AuthService.login(trimmedEmail, password);
      if (response.success && response.data) {
        login(response.data.token, response.data.user);
        navigate('/admin/dashboard');
      } else {
        // Generic secure error message - does not reveal if email exists in DB
        setError('Invalid email or password.');
      }
    } catch (err: unknown) {
      setError('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-4 sm:p-6 lg:p-8 selection:bg-primary-container selection:text-on-primary-container relative overflow-hidden">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0a_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center z-10 py-2">
        <div className="flex items-center gap-2">
          <Logo showText={true} />
        </div>
        <div className="hidden xs:flex items-center gap-2 px-3 py-1 bg-surface-container-high border border-outline-variant rounded-xs text-[11px] font-label-caps text-on-surface-variant uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Secure Portal v2.4</span>
        </div>
      </header>

      {/* Main Login Card Center */}
      <main className="w-full max-w-md mx-auto my-auto z-10 py-6">
        <div className="bg-surface-container/90 backdrop-blur-md industrial-border p-6 sm:p-8 rounded-sm space-y-6 shadow-2xl relative">
          
          {/* Header & Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-primary-container/10 border border-primary/30 text-primary mb-2">
              <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
            </div>
            <h1 className="font-display-md text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
              Control Center Login
            </h1>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Authorized Ghulam Safety Hub administrators only.
            </p>
          </div>

          {/* Alert Message Box */}
          {error && (
            <div
              role="alert"
              className="p-3.5 bg-error/10 border border-error/40 text-error rounded-xs font-body-sm text-xs flex items-center gap-2.5 animate-fadeIn"
            >
              <span className="material-symbols-outlined text-base flex-shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="admin-email" className="block text-xs font-label-caps text-on-surface font-semibold tracking-wider uppercase">
                Admin Email <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
                  mail
                </span>
                <input
                  id="admin-email"
                  type="email"
                  name="email"
                  autoComplete="username"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={isLoading}
                  className="w-full bg-surface-container-high border border-outline-variant rounded-xs pl-10 pr-3 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all disabled:opacity-50"
                  required
                />
              </div>
            </div>

            {/* Password Field with Show/Hide Toggle */}
            <div className="space-y-1.5 text-left">
              <div className="flex justify-between items-center">
                <label htmlFor="admin-password" className="block text-xs font-label-caps text-on-surface font-semibold tracking-wider uppercase">
                  Password <span className="text-primary">*</span>
                </label>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
                  lock
                </span>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={isLoading}
                  className="w-full bg-surface-container-high border border-outline-variant rounded-xs pl-10 pr-10 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all disabled:opacity-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2 font-bold uppercase tracking-wider text-xs orange-glow py-3"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Control Center'}
            </Button>
          </form>

          {/* Security Note Footer */}
          <div className="pt-4 border-t border-outline-variant/60 text-center">
            <p className="font-mono text-[11px] text-on-surface-variant flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-xs">verified_user</span>
              <span>Encrypted Session & Auth Token Access</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer Copyright */}
      <footer className="w-full max-w-6xl mx-auto text-center z-10 py-2">
        <p className="font-mono text-[11px] text-on-surface-variant">
          © {new Date().getFullYear()} Ghulam Safety Hub B2B Portal. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AdminLogin;
