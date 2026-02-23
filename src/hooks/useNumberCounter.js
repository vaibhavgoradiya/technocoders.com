import { useState, useEffect, useRef } from 'react';

/**
 * useNumberCounter Hook
 * Animates a number from start to end value with easing
 * 
 * @param {number} end - Target number to count to
 * @param {number} start - Starting number (default: 0)
 * @param {number} duration - Animation duration in ms (default: 2000)
 * @param {number} decimals - Number of decimal places (default: 0)
 * @param {function} onComplete - Callback when animation completes
 * @returns {number} Current animated value
 */
export const useNumberCounter = (
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  onComplete = null
) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    let animationFrame = null;

    // Easing function (easeOutExpo)
    const easeOutExpo = (t) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      
      const currentValue = start + (end - start) * easedProgress;
      setCount(parseFloat(currentValue.toFixed(decimals)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
        if (onComplete) onComplete();
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, start, duration, decimals, onComplete]);

  // Return both the count and the ref to attach to the element
  return count;
};

/**
 * useCounterWithTrigger Hook
 * Counter that can be manually triggered
 * 
 * @param {number} end - Target number
 * @param {number} start - Starting number
 * @param {number} duration - Animation duration
 * @param {boolean} trigger - When true, starts animation
 * @returns {number} Current value
 */
export const useCounterWithTrigger = (
  end,
  start = 0,
  duration = 2000,
  trigger = false
) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!trigger) return;

    let startTime = null;
    let animationFrame = null;

    const easeOutExpo = (t) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      
      const currentValue = start + (end - start) * easedProgress;
      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [trigger, end, start, duration]);

  return count;
};

export default useNumberCounter;