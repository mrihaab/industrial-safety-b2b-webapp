import React from 'react';

export const App: React.FC = () => {
  return (
    <div class="min-h-screen bg-background text-on-surface flex items-center justify-center">
      <div class="text-center p-8 industrial-border bg-surface-container rounded-lg">
        <h1 class="font-headline-lg text-headline-lg text-primary mb-4">
          Ghulam Safety Hub
        </h1>
        <p class="font-body-lg text-on-surface-variant">
          Frontend Application Foundation Initialized Successfully.
        </p>
      </div>
    </div>
  );
};

export default App;
