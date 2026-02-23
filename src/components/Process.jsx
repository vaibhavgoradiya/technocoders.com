import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Process.css';

const Process = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2, once: true });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1, once: true });
  const steps = [
    {
      number: 'STEP 1',
      title: 'Requirement Analysis',
      description: 'We understand your business goals and project requirements to create a clear roadmap.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: 'STEP 2',
      title: 'Planning & Strategy',
      description: 'We design the best technical approach and create a detailed project plan.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
          <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2"/>
          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      number: 'STEP 3',
      title: 'Digital Architecture',
      description: 'We design scalable architecture and smart user experiences for future-ready solutions.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      number: 'STEP 4',
      title: 'Development',
      description: 'Our team builds your solution with precision using modern technologies and best practices.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: 'STEP 5',
      title: 'Testing',
      description: 'We ensure quality, security, and performance through comprehensive testing.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: 'STEP 6',
      title: 'Launch & Support',
      description: 'We deploy your solution and provide continuous support and maintenance.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className="process section">
      <div className="container">
        <div
          ref={headerRef}
          className={`process-header scroll-animate ${headerVisible ? 'visible' : ''}`}
        >
          <h2>Our Process</h2>
          <p>How we work to deliver exceptional results</p>
        </div>
        
        <div
          ref={gridRef}
          className="home-process-grid"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className={`process-card glass-card scroll-animate-scale ${gridVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="process-icon">
                {step.icon}
              </div>
              <div className="process-number">{step.number}</div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;