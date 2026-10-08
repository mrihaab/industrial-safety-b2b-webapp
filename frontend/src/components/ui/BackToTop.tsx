import React, { useEffect, useState } from 'react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button only after scrolling past 400px (header and initial hero section)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-36 sm:bottom-24 right-3.5 sm:right-7 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      } bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 shadow-lg hover:bg-primary-container hover:text-white hover:border-primary-container hover:-translate-y-1 hover:shadow-xl active:scale-95`}
    >
      <span className="material-symbols-outlined text-lg sm:text-xl font-bold transition-transform">
        arrow_upward
      </span>
    </button>
  );
};

export default BackToTop;
