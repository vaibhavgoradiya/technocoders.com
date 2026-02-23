import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef(null);
  const particlesRef = useRef([]);
  const trailRef = useRef([]);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile || isTouchDevice) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let frameCount = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (frameCount % 3 === 0) {
        createTrail(mouseX, mouseY);
      }
      
      if (frameCount % 8 === 0) {
        createParticle(mouseX, mouseY);
      }
      
      frameCount++;
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      for (let i = 0; i < 6; i++) {
        setTimeout(() => createParticle(cursorX, cursorY), i * 30);
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const createTrail = (x, y) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      document.body.appendChild(trail);
      
      trailRef.current.push(trail);
      
      setTimeout(() => {
        trail.remove();
        trailRef.current = trailRef.current.filter(t => t !== trail);
      }, 800);
    };

    const createParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random() * 30;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      
      document.body.appendChild(particle);
      particlesRef.current.push(particle);
      
      setTimeout(() => {
        particle.remove();
        particlesRef.current = particlesRef.current.filter(p => p !== particle);
      }, 1500);
    };

    const animate = () => {
      const speed = 0.15;

      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }

      requestAnimationFrame(animate);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('hoverable') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('hoverable') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      
      particlesRef.current.forEach(p => p.remove());
      trailRef.current.forEach(t => t.remove());
    };
  }, []);

  const isMobile = typeof window !== 'undefined' && 
    (window.matchMedia('(max-width: 768px)').matches || 
     'ontouchstart' in window);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#00ffff', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#00d9ff', stopOpacity: 1}} />
          </linearGradient>
        </defs>
        
        <g filter="url(#glow)">
          <path
            d="M 20 50 L 50 20 L 50 35 L 70 35 L 70 40 L 55 40 L 55 50 L 70 50 L 70 55 L 50 55 L 50 70 Z"
            fill="none"
            stroke="url(#arrowGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <path
            d="M 50 35 L 55 35 L 55 30 M 55 40 L 60 40 L 60 35 M 60 45 L 65 45 L 65 40"
            stroke="#00d9ff"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </g>
        
        <path
          d="M 20 50 L 50 20 L 50 35 L 70 35 L 70 40 L 55 40 L 55 50 L 70 50 L 70 55 L 50 55 L 50 70 Z"
          fill="rgba(0, 217, 255, 0.1)"
        />
      </svg>
    </div>
  );
};

export default CustomCursor;