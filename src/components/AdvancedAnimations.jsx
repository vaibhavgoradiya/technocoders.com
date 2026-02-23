import React, { useEffect, useRef, useState } from 'react';
import './AdvancedAnimations.css';

/**
 * FadeInUp Component
 * Fade in with upward motion on scroll
 */
export const FadeInUp = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`fade-in-up ${isVisible ? 'visible' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * SlideIn Component
 * Slide in from specified direction
 */
export const SlideIn = ({
  children,
  direction = 'left',
  delay = 0,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`slide-in slide-in-${direction} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * ScaleIn Component
 * Scale up animation on scroll
 */
export const ScaleIn = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scale-in ${isVisible ? 'visible' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * RotateIn Component
 * Rotate in animation
 */
export const RotateIn = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`rotate-in ${isVisible ? 'visible' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * StaggeredList Component
 * List with staggered animation for children
 */
export const StaggeredList = ({
  children,
  staggerDelay = 100,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div ref={elementRef} className={`staggered-list ${className}`}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`staggered-item ${isVisible ? 'visible' : ''}`}
          style={{ animationDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

/**
 * FloatingElement Component
 * Floating animation effect
 */
export const FloatingElement = ({
  children,
  duration = 3,
  distance = 20,
  className = ''
}) => {
  return (
    <div
      className={`floating-element ${className}`}
      style={{
        '--float-duration': `${duration}s`,
        '--float-distance': `${distance}px`
      }}
    >
      {children}
    </div>
  );
};

/**
 * PulseElement Component
 * Pulsing animation effect
 */
export const PulseElement = ({
  children,
  duration = 2,
  scale = 1.05,
  className = ''
}) => {
  return (
    <div
      className={`pulse-element ${className}`}
      style={{
        '--pulse-duration': `${duration}s`,
        '--pulse-scale': scale
      }}
    >
      {children}
    </div>
  );
};

/**
 * ShakeElement Component
 * Shake animation on hover or trigger
 */
export const ShakeElement = ({ children, trigger = false, className = '' }) => {
  return (
    <div className={`shake-element ${trigger ? 'shake' : ''} ${className}`}>
      {children}
    </div>
  );
};

/**
 * GlitchText Component
 * Glitch effect on text
 */
export const GlitchText = ({ text, className = '' }) => {
  return (
    <div className={`glitch-text ${className}`} data-text={text}>
      {text}
    </div>
  );
};

/**
 * WaveText Component
 * Wave animation on text characters
 */
export const WaveText = ({ text, className = '' }) => {
  return (
    <div className={`wave-text ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="wave-char"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

/**
 * GradientBorder Component
 * Animated gradient border
 */
export const GradientBorder = ({ children, className = '' }) => {
  return (
    <div className={`gradient-border ${className}`}>
      <div className="gradient-border-content">{children}</div>
    </div>
  );
};

/**
 * MorphingShape Component
 * Morphing background shape
 */
export const MorphingShape = ({ className = '' }) => {
  return (
    <div className={`morphing-shape ${className}`}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          className="morphing-path"
          fill="url(#gradient)"
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,40.1,76.8C26.4,84.6,10,87.6,-5.8,87.1C-21.6,86.6,-36.8,82.6,-50.4,75.2C-64,67.8,-76,57,-83.8,43.6C-91.6,30.2,-95.2,14.1,-94.6,-1.8C-94,-17.7,-89.2,-33.4,-80.8,-46.8C-72.4,-60.2,-60.4,-71.3,-46.3,-78.5C-32.2,-85.7,-16.1,-89,0.5,-89.9C17.1,-90.8,30.6,-83.6,44.7,-76.4Z"
          transform="translate(100 100)"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-green)" />
            <stop offset="100%" stopColor="var(--color-accent-purple)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default {
  FadeInUp,
  SlideIn,
  ScaleIn,
  RotateIn,
  StaggeredList,
  FloatingElement,
  PulseElement,
  ShakeElement,
  GlitchText,
  WaveText,
  GradientBorder,
  MorphingShape
};