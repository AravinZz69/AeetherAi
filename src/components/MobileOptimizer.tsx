import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileOptimizerProps {
  children: React.ReactNode;
}

export const MobileOptimizer = ({ children }: MobileOptimizerProps) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      // Prevent zoom on double tap
      document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      }, { passive: false });

      // Prevent default touch behaviors that might interfere with the app
      document.addEventListener('touchmove', (e) => {
        // Allow scrolling but prevent other gestures
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      }, { passive: false });

      // Set viewport meta tag for better mobile experience
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }

      // Add mobile-specific body classes
      document.body.classList.add('mobile-optimized');
    }

    return () => {
      document.body.classList.remove('mobile-optimized');
    };
  }, [isMobile]);

  return (
    <div className={`mobile-safe ${isMobile ? 'mobile-layout' : ''}`}>
      {children}
    </div>
  );
};

// Add to global CSS for mobile-specific styles
const mobileStyles = `
  .mobile-optimized {
    /* Improve touch scrolling */
    -webkit-overflow-scrolling: touch;
    /* Prevent text selection on double tap */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    /* Prevent callout */
    -webkit-touch-callout: none;
    /* Prevent tap highlight */
    -webkit-tap-highlight-color: transparent;
  }

  .mobile-layout {
    /* Optimize for mobile layout */
    min-height: 100vh;
    min-height: 100dvh; /* Dynamic viewport height */
  }

  @media (max-width: 640px) {
    /* Reduce animation intensity on mobile to improve performance */
    .floating {
      animation-duration: 8s;
    }
    
    .quantum-flow::before {
      animation-duration: 30s;
    }
    
    /* Optimize glass effects for mobile */
    .glass-card {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    
    /* Improve text readability on small screens */
    .text-glow {
      text-shadow: 0 0 20px hsl(262 83% 58% / 0.3);
    }
  }
`;

// Inject styles if not already present
if (typeof document !== 'undefined' && !document.getElementById('mobile-optimizer-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'mobile-optimizer-styles';
  styleSheet.textContent = mobileStyles;
  document.head.appendChild(styleSheet);
}