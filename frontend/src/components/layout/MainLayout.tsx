import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {/* Header Placeholder */}
      <header className="w-full border-b border-outline-variant bg-surface sticky top-0 z-50">
        <div className="max-w-container-max mx-auto px-gutter h-20 flex items-center justify-between">
          <span className="font-headline-lg text-primary font-extrabold tracking-tight">
            Ghulam Safety Hub
          </span>
          <span className="font-label-caps text-on-surface-variant">B2B Portal Foundation</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-container-max mx-auto px-gutter py-stack-lg">
        <Outlet />
      </main>

      {/* Footer Placeholder */}
      <footer className="w-full border-t border-outline-variant bg-surface py-8">
        <div className="max-w-container-max mx-auto px-gutter text-center text-body-sm text-on-surface-variant">
          © {new Date().getFullYear()} Ghulam Safety Hub. All rights reserved. Industrial Precision Engineering.
        </div>
      </footer>
    </div>
  );
};
