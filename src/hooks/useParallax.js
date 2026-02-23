import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for parallax scrolling effect
 * Elements move at different speeds based on scroll position
 * @param {Object} options - Configuration options
 * @param {number} options.speed - Parallax speed multiplier (default: 0.5)
 * @param {string} options.direction - 'vertical' or 'horizontal' (default: 'vertical')
 * @param {boolean} options.disabled - Disable on mobile (default: true on mobile)
 */
export const useParallax = (options = {}) => {
  const { speed = 0.5, direction = 'vertical', disabled = false } = options;
  const elementRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Disable on mobile devices for performance
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (disabled || isMobile) return;

    const element = elementRef.current;
    if (!element) return;

    let ticking = false;

    const updateParallax = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;
      
      // Calculate parallax offset
      const scrollProgress = (scrolled + windowHeight - elementTop) / (windowHeight + rect.height);
      const parallaxOffset = (scrollProgress - 0.5) * 100 * speed;
      
      setOffset(parallaxOffset);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Initial calculation
    updateParallax();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateParallax);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateParallax);
    };
  }, [speed, direction, disabled]);

  const style = direction === 'vertical' 
    ? { transform: `translateY(${offset}px)` }
    : { transform: `translateX(${offset}px)` };

  return [elementRef, style];
};

/**
 * Hook for multi-layer parallax effect
 * Creates depth with multiple parallax layers
 */
export const useMultiLayerParallax = (layers = []) => {
  const containerRef = useRef(null);
  const [layerOffsets, setLayerOffsets] = useState(layers.map(() => 0));

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    let ticking = false;

    const updateLayers = () => {
      const scrolled = window.pageYOffset;
      const newOffsets = layers.map(layer => scrolled * (layer.speed || 0.5));
      setLayerOffsets(newOffsets);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateLayers);
        ticking = true;
      }
    };

    updateLayers();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [layers]);

  return [containerRef, layerOffsets];
};