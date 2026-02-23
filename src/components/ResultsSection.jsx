import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './ResultsSection.css';

const ResultsSection = () => {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.2, once: true });

  const benefits = [
    'More customer inquiries',
    'Stronger online brand presence',
    'Automated business processes',
    'Faster business growth',
    'Competitive edge in your industry'
  ];

  return (
    <section className="results-section section">
      <div className="container">
        <div
          ref={sectionRef}
          className={`results-card scroll-animate ${sectionVisible ? 'visible' : ''}`}
        >
          <div className="results-content">
            <div className="results-header">
              <h2 className="results-title">Results You Can Expect</h2>
              <p className="results-subtitle">
                Build with Technocoders and experience the power of intelligent, custom-built digital solutions.
              </p>
            </div>

            <div className="results-body">
              <div className="benefits-list">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="benefit-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="check-icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="benefit-text">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="cta-container">
                <Link to="/contact#inquiry-form" className="cta-button">
                  <span className="button-text">Get Started</span>
                  <svg
                    className="button-arrow"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;