import React from 'react';
import { useNumberCounter } from '../hooks/useNumberCounter';
import './NumberCounter.css';

/**
 * NumberCounter Component
 * Animated number counter with customizable options
 */
export const NumberCounter = ({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  className = '',
  onComplete
}) => {
  const count = useNumberCounter(end, start, duration, decimals, onComplete);

  // Format number with separator
  const formatNumber = (num) => {
    const parts = num.toFixed(decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  };

  return (
    <span className={`number-counter ${className}`}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

/**
 * StatCard Component
 * Card displaying a statistic with animated counter
 */
export const StatCard = ({
  value,
  label,
  icon,
  prefix = '',
  suffix = '',
  decimals = 0,
  color = 'green',
  className = ''
}) => {
  return (
    <div className={`stat-card stat-card-${color} ${className}`}>
      {icon && <div className="stat-icon">{icon}</div>}
      <div className="stat-content">
        <div className="stat-value">
          <NumberCounter
            end={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
          />
        </div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
};

/**
 * CounterGrid Component
 * Grid layout for multiple stat cards
 */
export const CounterGrid = ({ stats, columns = 4, className = '' }) => {
  return (
    <div 
      className={`counter-grid ${className}`}
      style={{ '--grid-columns': columns }}
    >
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

/**
 * CircularProgress Component
 * Circular progress indicator with counter
 */
export const CircularProgress = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = 'green',
  label = '',
  showValue = true,
  className = ''
}) => {
  const count = useNumberCounter(value, 0, 2000, 0);
  const percentage = (count / max) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    green: 'var(--color-accent-green)',
    blue: 'var(--color-accent-blue)',
    purple: 'var(--color-accent-purple)',
    orange: 'var(--color-accent-orange)',
    pink: 'var(--color-accent-pink)'
  };

  return (
    <div className={`circular-progress ${className}`}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colorMap[color] || colorMap.green}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="progress-circle"
        />
      </svg>
      <div className="circular-progress-content">
        {showValue && (
          <div className="circular-progress-value">
            {Math.round(percentage)}%
          </div>
        )}
        {label && <div className="circular-progress-label">{label}</div>}
      </div>
    </div>
  );
};

/**
 * ProgressStats Component
 * Multiple circular progress indicators
 */
export const ProgressStats = ({ stats, className = '' }) => {
  return (
    <div className={`progress-stats ${className}`}>
      {stats.map((stat, index) => (
        <CircularProgress key={index} {...stat} />
      ))}
    </div>
  );
};

export default NumberCounter;