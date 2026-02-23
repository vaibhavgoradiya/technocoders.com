import React from 'react';
import './SVGAnimations.css';

/**
 * Animated Logo Component
 * SVG logo with draw animation
 */
export const AnimatedLogo = ({ className = '', size = 100 }) => {
  return (
    <svg
      className={`animated-logo ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="logo-circle"
        cx="50"
        cy="50"
        r="45"
        stroke="url(#gradient1)"
        strokeWidth="2"
      />
      <path
        className="logo-path"
        d="M30 50 L45 35 L60 50 L75 35"
        stroke="url(#gradient2)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent-green)" />
          <stop offset="100%" stopColor="var(--color-accent-teal)" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-accent-teal)" />
          <stop offset="100%" stopColor="var(--color-accent-green)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/**
 * Animated Arrow Component
 * Bouncing arrow for scroll indicators
 */
export const AnimatedArrow = ({ direction = 'down', className = '' }) => {
  const rotation = {
    down: 0,
    up: 180,
    left: 90,
    right: -90
  };

  return (
    <svg
      className={`animated-arrow ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: `rotate(${rotation[direction]}deg)` }}
    >
      <path
        className="arrow-path"
        d="M12 5v14M5 12l7 7 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Animated Check Mark
 * Success indicator with draw animation
 */
export const AnimatedCheckMark = ({ className = '', size = 60 }) => {
  return (
    <svg
      className={`animated-checkmark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
    >
      <circle
        className="checkmark-circle"
        cx="30"
        cy="30"
        r="28"
        stroke="var(--color-accent-green)"
        strokeWidth="2"
      />
      <path
        className="checkmark-check"
        d="M17 30l8 8 18-18"
        stroke="var(--color-accent-green)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Animated Loading Spinner
 * Circular loading indicator
 */
export const AnimatedSpinner = ({ className = '', size = 40 }) => {
  return (
    <svg
      className={`animated-spinner ${className}`}
      width={size}
      height={size}
      viewBox="0 0 50 50"
    >
      <circle
        className="spinner-path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="var(--color-accent-green)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Animated Wave Component
 * Decorative wave animation
 */
export const AnimatedWave = ({ className = '' }) => {
  return (
    <svg
      className={`animated-wave ${className}`}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        className="wave-path"
        d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
        fill="url(#waveGradient)"
      />
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-accent-green)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="var(--color-accent-teal)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-accent-green)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/**
 * Animated Dots Component
 * Loading dots animation
 */
export const AnimatedDots = ({ className = '' }) => {
  return (
    <svg
      className={`animated-dots ${className}`}
      width="60"
      height="20"
      viewBox="0 0 60 20"
    >
      <circle className="dot dot-1" cx="10" cy="10" r="5" fill="var(--color-accent-green)" />
      <circle className="dot dot-2" cx="30" cy="10" r="5" fill="var(--color-accent-green)" />
      <circle className="dot dot-3" cx="50" cy="10" r="5" fill="var(--color-accent-green)" />
    </svg>
  );
};

/**
 * Animated Pulse Ring
 * Expanding pulse effect
 */
export const AnimatedPulseRing = ({ className = '', size = 100 }) => {
  return (
    <svg
      className={`animated-pulse-ring ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
    >
      <circle
        className="pulse-ring ring-1"
        cx="50"
        cy="50"
        r="30"
        fill="none"
        stroke="var(--color-accent-green)"
        strokeWidth="2"
      />
      <circle
        className="pulse-ring ring-2"
        cx="50"
        cy="50"
        r="30"
        fill="none"
        stroke="var(--color-accent-teal)"
        strokeWidth="2"
      />
      <circle
        className="pulse-ring ring-3"
        cx="50"
        cy="50"
        r="30"
        fill="none"
        stroke="var(--color-accent-green)"
        strokeWidth="2"
      />
    </svg>
  );
};

/**
 * Animated Morphing Shape
 * Shape that morphs between states
 */
export const AnimatedMorphShape = ({ className = '' }) => {
  return (
    <svg
      className={`animated-morph-shape ${className}`}
      width="100"
      height="100"
      viewBox="0 0 100 100"
    >
      <path
        className="morph-path"
        fill="var(--color-accent-green)"
        fillOpacity="0.3"
      >
        <animate
          attributeName="d"
          dur="5s"
          repeatCount="indefinite"
          values="
            M50,10 L90,30 L90,70 L50,90 L10,70 L10,30 Z;
            M50,20 L80,40 L80,60 L50,80 L20,60 L20,40 Z;
            M50,10 L90,30 L90,70 L50,90 L10,70 L10,30 Z
          "
        />
      </path>
    </svg>
  );
};

export default {
  Logo: AnimatedLogo,
  Arrow: AnimatedArrow,
  CheckMark: AnimatedCheckMark,
  Spinner: AnimatedSpinner,
  Wave: AnimatedWave,
  Dots: AnimatedDots,
  PulseRing: AnimatedPulseRing,
  MorphShape: AnimatedMorphShape
};