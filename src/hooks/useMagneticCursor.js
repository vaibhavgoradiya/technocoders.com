import { useEffect, useRef } from 'react';

/**
 * Custom hook for magnetic cursor effect on buttons
 * Buttons attract the cursor on hover for a premium feel
 * @param {Object} options - Configuration options
 * @param {number} options.strength - Magnetic strength (default: 0.3)
 * @param {boolean} options.disabled - Disable on mobile (default: true)
 */
export const useMagneticCursor = (options = {}) => {
  const elementRef = useRef(null);
  const { strength = 0.3, disabled = false } = options;

  useEffect(() => {
    // Disable on mobile devices for performance
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (disabled || isMobile) return;

    const element = elementRef.current;
    if (!element) return;

    let animationFrameId = null;

    const handleMouseMove = (e) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
    };

    const handleMouseLeave = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      element.style.transform = 'translate(0, 0)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, disabled]);

  return elementRef;
};