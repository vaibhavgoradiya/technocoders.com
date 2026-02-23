import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Features.css';

const Features = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2, once: true });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1, once: true });
  const features = [
    {
      title: 'AI-Powered Development',
      description: 'We leverage cutting-edge AI and machine learning technologies to automate workflows, optimize performance, and deliver intelligent solutions faster with precision and scalability.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 1v6m0 6v6M1 12h6m6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: 'Enterprise-Grade Architecture',
      description: 'We design scalable, secure, and maintainable system architectures using modern frameworks, microservices, and cloud-native patterns tailored to your business requirements.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'Rigorous Quality Assurance',
      description: 'Every solution undergoes automated testing, code reviews, security audits, and performance optimization to ensure enterprise-level quality and reliability before deployment.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className="features section">
      <div className="container">
        <div
          ref={headerRef}
          className={`features-header scroll-animate ${headerVisible ? 'visible' : ''}`}
        >
          <h2>How We Deliver Excellence</h2>
          <p>Our proven methodology combines innovation, precision, and industry best practices to build solutions that drive real business results.</p>
        </div>
        
        <div
          ref={gridRef}
          className="features-grid"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card glass-card scroll-animate ${gridVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;