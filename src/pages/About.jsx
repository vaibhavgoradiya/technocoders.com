import React, { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    const animateCounter = (element, target, duration = 2000) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target;
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current);
        }
      }, 16);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach((stat) => {
              const target = parseInt(stat.getAttribute('data-target'));
              animateCounter(stat, target);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      <section className="about-hero section">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="page-title">About Technocoders</h1>
            <p className="page-subtitle">
              An AI-First IT solutions company delivering next-generation digital products for startups, enterprises, and growing businesses
            </p>
          </div>
        </div>
      </section>

      <section className="about-story section">
        <div className="container">
          <div className="about-content-grid">
            <div className="about-text">
              <h2>Who We Are</h2>
              <p>
                Technocoders is an AI-First IT solutions company delivering next-generation digital products for startups, enterprises, and growing businesses worldwide. We combine innovation, automation, and advanced technologies to build solutions that are smart, scalable, and future-ready.
              </p>
              <p>
                We don't just develop software — we design intelligent digital systems that solve real business problems, streamline operations, and create long-term growth. Our expertise spans Web & Web App Development, Mobile App Development, Cloud Solutions, Cybersecurity, IT Consulting, and AI & Automation Solutions. We specialize in understanding complex business challenges and transforming them into powerful, enterprise-grade digital systems built with React, Node.js, AI/ML, and secure cloud infrastructure.
              </p>
              <p>
                As a global technology partner, we focus on building long-term relationships through transparent communication, scalable architecture, and continuous innovation. Our solutions are designed to grow with your business, from startup to enterprise scale.
              </p>
            </div>
            <div className="about-image">
              <div className="stats-dashboard glass-card" ref={statsRef}>
                <div className="stats-header">
                  <div className="stats-title">
                    <span className="pulse-dot"></span>
                    Live Metrics
                  </div>
                  <div className="stats-badge">Real-time</div>
                </div>
                
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="stat-label">INTELLIGENCE</div>
                  </div>

                  <div className="stat-item">
                    <div className="stat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 1v6m0 6v6m8.66-13.66l-4.24 4.24m-4.24 4.24l-4.24 4.24M23 12h-6m-6 0H1m20.66 8.66l-4.24-4.24m-4.24-4.24l-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="stat-label">AUTOMATION</div>
                  </div>

                  <div className="stat-item">
                    <div className="stat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="stat-label">GLOBAL</div>
                  </div>

                  <div className="stat-item">
                    <div className="stat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="stat-label">TRUST</div>
                  </div>
                </div>

                <div className="stats-footer">
                  <div className="tech-stack">
                    <span className="tech-badge">React</span>
                    <span className="tech-badge">Node.js</span>
                    <span className="tech-badge">AI/ML</span>
                    <span className="tech-badge">Cloud</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-mission section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card glass-card">
              <div className="mission-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                To empower businesses with intelligent and automation-driven technology solutions.
              </p>
            </div>

            <div className="mission-card glass-card">
              <div className="mission-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>
                To become a global leader in AI-powered digital transformation services.
              </p>
            </div>

            <div className="mission-card glass-card">
              <div className="mission-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Our Values</h3>
              <p>
                Innovation, quality, transparency, and customer success drive everything we do.
                We believe in building long-term partnerships with our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Technocoders</h2>
            <p>We bring AI-powered innovation and expertise to every project</p>
          </div>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-number">01</div>
              <h3>AI-First Approach</h3>
              <p>We leverage artificial intelligence and automation to build smarter, more efficient solutions</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">02</div>
              <h3>Expert Team</h3>
              <p>Our team of experienced developers brings years of expertise in modern software development</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">03</div>
              <h3>Scalable & Future-Ready Solutions</h3>
              <p>Our solutions are built to grow with your business and adapt to future technologies</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">04</div>
              <h3>Transparent Communication</h3>
              <p>We maintain clear, honest communication throughout the entire project lifecycle</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">05</div>
              <h3>On-Time Project Delivery</h3>
              <p>We deliver projects on schedule without compromising on quality or functionality</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">06</div>
              <h3>Long-Term Support & Maintenance</h3>
              <p>Continuous technical support, updates, and maintenance to keep your systems running smoothly</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;