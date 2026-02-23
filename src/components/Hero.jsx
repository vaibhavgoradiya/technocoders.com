import React, { useState, useEffect } from 'react';
import { useMagneticCursor } from '../hooks/useMagneticCursor';
import './Hero.css';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Technocoders helps businesses grow faster using intelligent software, modern applications, and automation-driven systems that improve efficiency, reduce costs, and unlock new opportunities.';
  const magneticRef = useMagneticCursor({ strength: 0.4 });
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const scrollToDemo = () => {
    const demoSection = document.getElementById('live-demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 1v6m0 6v6M1 12h6m6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>AI-First IT Solutions</span>
          </div>
          
          <h1 className="hero-title text-reveal">
            Empowering Businesses with AI-First Digital Solutions & Automation
          </h1>
          
          <p className="hero-subtitle">
            {typedText}
            <span className="typing-cursor">|</span>
          </p>
          
          <div className="hero-buttons">
            <button className="btn-secondary" onClick={scrollToDemo}>
              Watch Demo →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;