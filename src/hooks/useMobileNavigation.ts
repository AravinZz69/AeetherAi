import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const useMobileNavigation = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  return {
    isMobile,
    isScrolled,
    // Mobile-safe navigation utilities
    getCompactButtonProps: () => ({
      size: isMobile ? 'sm' : 'default',
      className: isMobile ? 'text-xs px-2 py-1' : ''
    }),
    getResponsiveSpacing: () => ({
      className: isMobile ? 'gap-1 sm:gap-2' : 'gap-3'
    }),
    getMobileHeaderClass: () => 
      `transition-all duration-300 ${
        isMobile && isScrolled 
          ? 'backdrop-blur-md bg-background/80 border-b border-border/50' 
          : ''
      }`
  };
};

// Export mobile-friendly component size helpers
export const getMobileSize = (isMobile: boolean) => ({
  button: isMobile ? 'sm' : 'default',
  icon: isMobile ? 'w-4 h-4' : 'w-5 h-5',
  text: isMobile ? 'text-sm' : 'text-base',
  heading: isMobile ? 'text-lg' : 'text-xl',
  spacing: isMobile ? 'gap-2' : 'gap-4',
  padding: isMobile ? 'p-3' : 'p-6'
});