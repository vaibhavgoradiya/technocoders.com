import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for typewriter effect
 * Types out text character by character
 * @param {string} text - Text to type out
 * @param {Object} options - Configuration options
 * @param {number} options.speed - Typing speed in ms (default: 50)
 * @param {number} options.delay - Initial delay before typing (default: 0)
 * @param {boolean} options.loop - Loop the animation (default: false)
 * @param {number} options.deleteSpeed - Speed of deletion in ms (default: 30)
 * @param {number} options.pauseTime - Pause before deleting (default: 2000)
 */
export const useTypewriter = (text, options = {}) => {
  const {
    speed = 50,
    delay = 0,
    loop = false,
    deleteSpeed = 30,
    pauseTime = 2000
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
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
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout;
    let currentIndex = 0;

    const type = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(type, speed);
      } else if (loop) {
        setIsTyping(false);
        timeout = setTimeout(() => {
          deleteText();
        }, pauseTime);
      }
    };

    const deleteText = () => {
      if (currentIndex > 0) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex--;
        timeout = setTimeout(deleteText, deleteSpeed);
      } else {
        setIsTyping(true);
        timeout = setTimeout(() => {
          type();
        }, delay);
      }
    };

    timeout = setTimeout(() => {
      type();
    }, delay);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [text, speed, delay, loop, deleteSpeed, pauseTime, isVisible]);

  return [elementRef, displayText, isTyping];
};

/**
 * Hook for multi-line typewriter effect
 * Types multiple lines sequentially
 */
export const useMultiLineTypewriter = (lines = [], options = {}) => {
  const { speed = 50, lineDelay = 500 } = options;
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayLines, setDisplayLines] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
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
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || currentLineIndex >= lines.length) return;

    let timeout;
    let currentText = '';
    let charIndex = 0;
    const currentLine = lines[currentLineIndex];

    const typeLine = () => {
      if (charIndex <= currentLine.length) {
        currentText = currentLine.slice(0, charIndex);
        setDisplayLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentText;
          return newLines;
        });
        charIndex++;
        timeout = setTimeout(typeLine, speed);
      } else {
        timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
        }, lineDelay);
      }
    };

    typeLine();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentLineIndex, lines, speed, lineDelay, isVisible]);

  return [elementRef, displayLines];
};