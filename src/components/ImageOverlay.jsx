import React, { useState } from 'react';
import './ImageOverlay.css';

/**
 * ImageOverlay Component
 * Image with hover overlay effects
 */
export const ImageOverlay = ({
  src,
  alt,
  title,
  description,
  overlay = 'gradient',
  className = ''
}) => {
  return (
    <div className={`image-overlay image-overlay-${overlay} ${className}`}>
      <img src={src} alt={alt} className="image-overlay-img" />
      <div className="image-overlay-content">
        {title && <h3 className="image-overlay-title">{title}</h3>}
        {description && <p className="image-overlay-description">{description}</p>}
      </div>
    </div>
  );
};

/**
 * ImageZoom Component
 * Image with zoom effect on hover
 */
export const ImageZoom = ({ src, alt, zoom = 1.2, className = '' }) => {
  return (
    <div className={`image-zoom ${className}`} style={{ '--zoom-scale': zoom }}>
      <img src={src} alt={alt} className="image-zoom-img" />
    </div>
  );
};

/**
 * ImageReveal Component
 * Image with reveal animation
 */
export const ImageReveal = ({
  src,
  alt,
  direction = 'left',
  className = ''
}) => {
  return (
    <div className={`image-reveal image-reveal-${direction} ${className}`}>
      <div className="image-reveal-overlay"></div>
      <img src={src} alt={alt} className="image-reveal-img" />
    </div>
  );
};

/**
 * ImageParallax Component
 * Image with parallax scroll effect
 */
export const ImageParallax = ({
  src,
  alt,
  speed = 0.5,
  className = ''
}) => {
  const [offset, setOffset] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setOffset(scrolled * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div className={`image-parallax ${className}`}>
      <img
        src={src}
        alt={alt}
        className="image-parallax-img"
        style={{ transform: `translateY(${offset}px)` }}
      />
    </div>
  );
};

/**
 * ImageGrid Component
 * Grid of images with hover effects
 */
export const ImageGrid = ({ images, columns = 3, overlay = 'gradient', className = '' }) => {
  return (
    <div
      className={`image-grid ${className}`}
      style={{ '--grid-columns': columns }}
    >
      {images.map((image, index) => (
        <ImageOverlay
          key={index}
          src={image.src}
          alt={image.alt}
          title={image.title}
          description={image.description}
          overlay={overlay}
        />
      ))}
    </div>
  );
};

/**
 * ImageCompare Component
 * Before/After image comparison slider
 */
export const ImageCompare = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e) => {
    if (!isDragging) return;

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  return (
    <div
      className={`image-compare ${className}`}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      <div className="image-compare-before">
        <img src={beforeImage} alt={beforeLabel} />
        <div className="image-compare-label">{beforeLabel}</div>
      </div>
      <div
        className="image-compare-after"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={afterImage} alt={afterLabel} />
        <div className="image-compare-label">{afterLabel}</div>
      </div>
      <div
        className="image-compare-slider"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="image-compare-handle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

/**
 * ImageLightbox Component
 * Clickable image that opens in lightbox
 */
export const ImageLightbox = ({ src, alt, thumbnail, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`image-lightbox-trigger ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <img src={thumbnail || src} alt={alt} />
        <div className="image-lightbox-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="image-lightbox-overlay" onClick={() => setIsOpen(false)}>
          <div className="image-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={src} alt={alt} />
            <button
              className="image-lightbox-close"
              onClick={() => setIsOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageOverlay;