import React from 'react';
import './LoadingSkeleton.css';

/**
 * Loading Skeleton Component
 * Displays animated placeholder while content loads
 */
export const SkeletonText = ({ lines = 3, width = '100%' }) => {
  return (
    <div className="skeleton-text">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="skeleton-line"
          style={{
            width: index === lines - 1 ? '70%' : width,
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};

export const SkeletonCard = ({ height = '200px' }) => {
  return (
    <div className="skeleton-card" style={{ height }}>
      <div className="skeleton-image" />
      <div className="skeleton-content">
        <div className="skeleton-title" />
        <SkeletonText lines={2} />
      </div>
    </div>
  );
};

export const SkeletonAvatar = ({ size = '50px' }) => {
  return (
    <div
      className="skeleton-avatar"
      style={{ width: size, height: size }}
    />
  );
};

export const SkeletonButton = ({ width = '120px', height = '40px' }) => {
  return (
    <div
      className="skeleton-button"
      style={{ width, height }}
    />
  );
};

export const SkeletonGrid = ({ columns = 3, rows = 2, gap = '20px' }) => {
  const totalItems = columns * rows;
  
  return (
    <div
      className="skeleton-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap
      }}
    >
      {Array.from({ length: totalItems }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export const SkeletonProfile = () => {
  return (
    <div className="skeleton-profile">
      <SkeletonAvatar size="80px" />
      <div className="skeleton-profile-info">
        <div className="skeleton-title" style={{ width: '150px' }} />
        <SkeletonText lines={1} width="200px" />
      </div>
    </div>
  );
};

export const SkeletonTable = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="skeleton-table">
      <div className="skeleton-table-header">
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className="skeleton-table-cell skeleton-header-cell" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="skeleton-table-row">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="skeleton-table-cell" />
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton wrapper for lazy loading content
 */
export const SkeletonWrapper = ({ loading, children, skeleton }) => {
  if (loading) {
    return skeleton || <SkeletonCard />;
  }
  return children;
};

export default {
  Text: SkeletonText,
  Card: SkeletonCard,
  Avatar: SkeletonAvatar,
  Button: SkeletonButton,
  Grid: SkeletonGrid,
  Profile: SkeletonProfile,
  Table: SkeletonTable,
  Wrapper: SkeletonWrapper
};