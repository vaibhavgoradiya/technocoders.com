import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Showcase.css';

const Showcase = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.2, once: true });

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const demos = [
    {
      title: 'AI Code Generation',
      description: 'Watch AI write production-ready code in real-time',
      color: '#5eb3c7'
    },
    {
      title: 'Automated Testing',
      description: 'AI runs comprehensive tests automatically',
      color: '#7dc4d6'
    },
    {
      title: 'Instant Deployment',
      description: 'Deploy to production with zero configuration',
      color: '#4a9fb0'
    }
  ];

  return (
    <section id="live-demo" className="showcase section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={`showcase-header scroll-animate ${sectionVisible ? 'visible' : ''}`}>
          <div className="header-badge">
            <span className="live-dot"></span>
            LIVE DEMO
          </div>
          <h2 className="showcase-title">
            See AI in Action
          </h2>
          <p className="showcase-subtitle">
            Watch how our AI automates the entire development process
          </p>
        </div>

        {/* Main Demo Area */}
        <div className={`demo-container scroll-animate ${sectionVisible ? 'visible' : ''}`}>
          {/* Demo Screen */}
          <div className="demo-screen">
            <div className="screen-header">
              <div className="screen-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="screen-title">{demos[activeDemo].title}</div>
              <div className="screen-actions">
                <button 
                  className={`play-btn ${isPlaying ? 'playing' : ''}`}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>
            </div>

            <div className="screen-content">
              {/* Code Editor Simulation */}
              {activeDemo === 0 && (
                <div className="code-demo">
                  <div className="code-line">
                    <span className="line-number">1</span>
                    <span className="code-keyword">import</span>
                    <span className="code-text"> React </span>
                    <span className="code-keyword">from</span>
                    <span className="code-string"> 'react'</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">2</span>
                    <span className="code-text"></span>
                  </div>
                  <div className="code-line typing">
                    <span className="line-number">3</span>
                    <span className="code-keyword">const</span>
                    <span className="code-function"> App</span>
                    <span className="code-text"> = () =&gt; {'{'}{'{'}</span>
                    <span className="cursor">|</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">4</span>
                    <span className="code-keyword">  return</span>
                    <span className="code-text"> (</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">5</span>
                    <span className="code-tag">    &lt;div</span>
                    <span className="code-attr"> className</span>
                    <span className="code-text">=</span>
                    <span className="code-string">"app"</span>
                    <span className="code-tag">&gt;</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">6</span>
                    <span className="code-tag">      &lt;h1&gt;</span>
                    <span className="code-text">Hello World</span>
                    <span className="code-tag">&lt;/h1&gt;</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">7</span>
                    <span className="code-tag">    &lt;/div&gt;</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">8</span>
                    <span className="code-text">  )</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">9</span>
                    <span className="code-text">{'}'}</span>
                  </div>
                </div>
              )}

              {/* Testing Simulation */}
              {activeDemo === 1 && (
                <div className="test-demo">
                  <div className="test-item passed">
                    <span className="test-icon">✓</span>
                    <span className="test-name">Component renders correctly</span>
                    <span className="test-time">12ms</span>
                  </div>
                  <div className="test-item passed">
                    <span className="test-icon">✓</span>
                    <span className="test-name">Props validation works</span>
                    <span className="test-time">8ms</span>
                  </div>
                  <div className="test-item running">
                    <span className="test-icon">⟳</span>
                    <span className="test-name">API integration test</span>
                    <span className="test-time">...</span>
                  </div>
                  <div className="test-item pending">
                    <span className="test-icon">○</span>
                    <span className="test-name">Performance benchmarks</span>
                    <span className="test-time">-</span>
                  </div>
                  <div className="test-summary">
                    <div className="summary-item">
                      <span className="summary-label">Tests:</span>
                      <span className="summary-value">2 passed, 1 running</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Coverage:</span>
                      <span className="summary-value">98.5%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Deployment Simulation */}
              {activeDemo === 2 && (
                <div className="deploy-demo">
                  <div className="deploy-step completed">
                    <span className="step-icon">✓</span>
                    <span className="step-name">Building application</span>
                    <span className="step-status">Completed</span>
                  </div>
                  <div className="deploy-step completed">
                    <span className="step-icon">✓</span>
                    <span className="step-name">Running tests</span>
                    <span className="step-status">All passed</span>
                  </div>
                  <div className="deploy-step active">
                    <span className="step-icon">⟳</span>
                    <span className="step-name">Deploying to production</span>
                    <span className="step-status">In progress...</span>
                  </div>
                  <div className="deploy-progress">
                    <div className="progress-bar">
                      <div className="progress-fill"></div>
                    </div>
                    <span className="progress-text">75%</span>
                  </div>
                  <div className="deploy-url">
                    <span className="url-label">URL:</span>
                    <span className="url-value">https://your-app.com</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Demo Controls */}
          <div className="demo-controls">
            {demos.map((demo, index) => (
              <button
                key={index}
                className={`control-btn ${activeDemo === index ? 'active' : ''}`}
                onClick={() => {
                  setActiveDemo(index);
                  setIsPlaying(false);
                }}
                style={{ '--demo-color': demo.color }}
              >
                <span className="control-number">0{index + 1}</span>
                <span className="control-title">{demo.title}</span>
                <span className="control-desc">{demo.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className={`demo-stats scroll-animate ${sectionVisible ? 'visible' : ''}`}>
          <div className="stat-card">
            <div className="stat-value">10x</div>
            <div className="stat-label">Faster Development</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">100%</div>
            <div className="stat-label">AI Automated</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Always Active</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;