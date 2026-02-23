import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

/**
 * Scroll Progress Bar Component
 * Shows reading progress at top of page
 */
export const ScrollProgressBar = ({ color = 'var(--color-accent-green)' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.pageYOffset;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <div className="scroll-progress-bar">
      <div
        className="scroll-progress-fill"
        style={{
          width: `${scrollProgress}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
};

/**
 * Circular Progress Component
 * Animated circular progress indicator
 */
export const CircularProgress = ({
  progress = 0,
  size = 100,
  strokeWidth = 8,
  color = 'var(--color-accent-green)',
  showPercentage = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          className="circular-progress-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          className="circular-progress-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {showPercentage && (
        <div className="circular-progress-text">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

/**
 * Linear Progress Bar Component
 * Horizontal progress bar with animation
 */
export const LinearProgress = ({
  progress = 0,
  height = '8px',
  color = 'var(--color-accent-green)',
  animated = true,
  showLabel = false,
  label = ''
}) => {
  return (
    <div className="linear-progress-container">
      {showLabel && label && (
        <div className="linear-progress-label">
          <span>{label}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div className="linear-progress" style={{ height }}>
        <div
          className={`linear-progress-fill ${animated ? 'animated' : ''}`}
          style={{
            width: `${progress}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

/**
 * Loading Progress Component
 * Indeterminate loading bar
 */
export const LoadingProgress = ({
  color = 'var(--color-accent-green)',
  height = '4px'
}) => {
  return (
    <div className="loading-progress" style={{ height }}>
      <div
        className="loading-progress-bar"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

/**
 * Step Progress Component
 * Multi-step progress indicator
 */
export const StepProgress = ({ steps = [], currentStep = 0 }) => {
  return (
    <div className="step-progress">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step-progress-item ${
            index < currentStep ? 'completed' : ''
          } ${index === currentStep ? 'active' : ''}`}
        >
          <div className="step-progress-circle">
            {index < currentStep ? (
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path
                  d="M7 10l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          <div className="step-progress-label">{step}</div>
          {index < steps.length - 1 && (
            <div
              className={`step-progress-line ${
                index < currentStep ? 'completed' : ''
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * Skill Progress Bar Component
 * For displaying skill levels
 */
export const SkillProgress = ({ skill, level, color }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(level);
    }, 100);

    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div className="skill-progress">
      <div className="skill-progress-header">
        <span className="skill-name">{skill}</span>
        <span className="skill-level">{level}%</span>
      </div>
      <div className="skill-progress-bar">
        <div
          className="skill-progress-fill"
          style={{
            width: `${animatedLevel}%`,
            backgroundColor: color || 'var(--color-accent-green)'
          }}
        />
      </div>
    </div>
  );
};

export default {
  Scroll: ScrollProgressBar,
  Circular: CircularProgress,
  Linear: LinearProgress,
  Loading: LoadingProgress,
  Step: StepProgress,
  Skill: SkillProgress
};