import React from 'react';

export const WhatsAppButton: React.FC = () => {
  const whatsappNumber = '923267249998';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Ghulam Safety Hub Engineering Team, I am inquiring about wholesale safety gear procurement.')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group pointer-events-none">
      {/* Floating Tooltip Label (Desktop) - Only captures mouse when hovered directly over button */}
      <span className="hidden sm:inline-block bg-surface-container border border-outline-variant text-on-surface font-label-caps text-xs px-3 py-1.5 rounded-xs shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with Key Account Desk
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instant WhatsApp Key Account Support"
        className="pointer-events-auto relative bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center orange-glow-hover"
      >
        {/* Active Online Pulse Indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-surface"></span>
        </span>

        {/* WhatsApp Official Vector Icon */}
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
        </svg>
      </a>
    </div>
  );
};
