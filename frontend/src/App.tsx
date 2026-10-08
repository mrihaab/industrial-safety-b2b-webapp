import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { AppRoutes } from '@/routes/AppRoutes';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { BackToTop } from '@/components/ui/BackToTop';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ScrollProgressBar />
        <AppRoutes />
        <BackToTop />
        <Analytics />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
