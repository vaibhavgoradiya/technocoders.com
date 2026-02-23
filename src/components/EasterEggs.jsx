import React, { useEffect, useState } from 'react';
import './EasterEggs.css';

/**
 * Konami Code Easter Egg
 * Triggers special effect when Konami code is entered
 */
export const KonamiCode = ({ onActivate, children }) => {
  const [keys, setKeys] = useState([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys(prevKeys => {
        const newKeys = [...prevKeys, e.key].slice(-10);
        
        if (newKeys.join(',') === konamiCode.join(',')) {
          onActivate?.();
          return [];
        }
        
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onActivate]);

  return children;
};

/**
 * Click Counter Easter Egg
 * Triggers after clicking element multiple times
 */
export const ClickCounter = ({ clicks = 10, onActivate, children, className = '' }) => {
  const [count, setCount] = useState(0);
  const [isActivated, setIsActivated] = useState(false);

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);

    if (newCount >= clicks && !isActivated) {
      setIsActivated(true);
      onActivate?.();
      setTimeout(() => {
        setCount(0);
        setIsActivated(false);
      }, 5000);
    }
  };

  return (
    <div 
      className={`click-counter ${className} ${isActivated ? 'activated' : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

/**
 * Secret Message Easter Egg
 * Hidden message revealed on hover or click
 */
export const SecretMessage = ({ message, trigger = 'hover', className = '' }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleInteraction = () => {
    if (trigger === 'click') {
      setIsRevealed(!isRevealed);
    }
  };

  const handleHover = (revealed) => {
    if (trigger === 'hover') {
      setIsRevealed(revealed);
    }
  };

  return (
    <div
      className={`secret-message ${className} ${isRevealed ? 'revealed' : ''}`}
      onClick={handleInteraction}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div className="secret-message-hidden">???</div>
      <div className="secret-message-revealed">{message}</div>
    </div>
  );
};

/**
 * Confetti Explosion Easter Egg
 * Triggers confetti animation
 */
export const ConfettiExplosion = ({ active, duration = 3000 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) return;

    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      color: ['#5eb3c7', '#7dc4d6', '#ffffff', '#ffd700'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 0.5
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [active, duration]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="confetti-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

/**
 * Matrix Rain Easter Egg
 * Matrix-style falling characters
 */
export const MatrixRain = ({ active, duration = 5000 }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (!active) return;

    const columnCount = Math.floor(window.innerWidth / 20);
    const newColumns = Array.from({ length: columnCount }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    }));

    setColumns(newColumns);

    const timer = setTimeout(() => {
      setColumns([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [active, duration]);

  if (!active || columns.length === 0) return null;

  return (
    <div className="matrix-rain">
      {columns.map(column => (
        <div
          key={column.id}
          className="matrix-column"
          style={{
            left: `${(column.id / columns.length) * 100}%`,
            animationDelay: `${column.delay}s`,
            animationDuration: `${column.duration}s`
          }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className="matrix-char">
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * Shake Effect Easter Egg
 * Shakes the screen
 */
export const ShakeEffect = ({ active, intensity = 'medium' }) => {
  useEffect(() => {
    if (!active) return;

    document.body.classList.add(`shake-${intensity}`);

    const timer = setTimeout(() => {
      document.body.classList.remove(`shake-${intensity}`);
    }, 500);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove(`shake-${intensity}`);
    };
  }, [active, intensity]);

  return null;
};

/**
 * Rainbow Text Easter Egg
 * Animates text with rainbow colors
 */
export const RainbowText = ({ text, active, className = '' }) => {
  if (!active) return <span className={className}>{text}</span>;

  return (
    <span className={`rainbow-text ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="rainbow-char"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

/**
 * Developer Console Easter Egg
 * Logs special message to console
 */
export const ConsoleEasterEgg = () => {
  useEffect(() => {
    const styles = [
      'color: #5eb3c7',
      'font-size: 20px',
      'font-weight: bold',
      'text-shadow: 2px 2px 4px rgba(94, 179, 199, 0.5)'
    ].join(';');

    console.log('%c🎉 You found the secret!', styles);
    console.log('%cWelcome to Technocoders! 🚀', 'color: #7dc4d6; font-size: 16px;');
    console.log('%cLooking for more secrets? Try the Konami code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'color: #5eb3c7;');
  }, []);

  return null;
};

export default {
  KonamiCode,
  ClickCounter,
  SecretMessage,
  ConfettiExplosion,
  MatrixRain,
  ShakeEffect,
  RainbowText,
  ConsoleEasterEgg
};