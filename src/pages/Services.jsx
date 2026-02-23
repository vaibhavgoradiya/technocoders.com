import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Services.css';

const Services = () => {
  const navigate = useNavigate();
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2, once: true });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1, once: true });

  const services = [
    {
      id: 'ai-automation',
      title: 'AI & Automation Solutions',
      description: 'We build AI-powered systems that automate tasks, improve decision-making, and increase operational efficiency.',
      features: [
        'Business Process Automation',
        'AI Chatbots & Virtual Assistants',
        'Predictive Analytics',
        'Workflow Automation Systems'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 1v6m0 6v6M1 12h6m6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Modern, fast, and scalable websites and web apps built for performance and growth.',
      features: [
        'Business Websites',
        'Web Applications',
        'E-commerce Platforms',
        'Custom Admin Panels'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 'custom-software',
      title: 'Custom Software Development',
      description: 'Tailor-made software that solves complex business challenges.',
      features: [
        'CRM Systems',
        'ERP Solutions',
        'Inventory & Billing Systems',
        'Business Management Software'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      description: 'User-friendly Android and iOS apps designed for engagement and performance.',
      features: [
        'Business Apps',
        'On-Demand Service Apps',
        'E-commerce Apps',
        'Enterprise Mobility Solutions'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps Solutions',
      description: 'Secure and scalable cloud infrastructure for modern businesses.',
      features: [
        'Cloud Deployment',
        'Server Setup & Optimization',
        'CI/CD Automation',
        'Performance Monitoring'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 'api-integration',
      title: 'API & System Integrations',
      description: 'We connect your tools and platforms to work together seamlessly.',
      features: [
        'Payment Gateway Integration',
        'Third-Party APIs',
        'CRM/ERP Integrations',
        'Automation Between Systems'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive designs that enhance user experience and engagement.',
      features: [
        'Web UI Design',
        'Mobile App UI',
        'Dashboard Interfaces',
        'User Experience Optimization'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'maintenance-support',
      title: 'Maintenance & Support',
      description: 'Reliable long-term technical support to keep systems secure and updated.',
      features: [
        'Bug Fixes & Updates',
        'Performance Optimization',
        'Security Monitoring',
        'Technical Support'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 1v6m0 6v6M1 12h6m6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Solutions',
      description: 'Complete e-commerce platforms with payment integration, inventory management, and order tracking systems.',
      features: [
        'Online store development',
        'Payment gateway integration',
        'Inventory & order management',
        'Multi-vendor marketplace'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
          <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing & SEO',
      description: 'Comprehensive digital marketing strategies to boost your online presence and drive growth.',
      features: [
        'SEO optimization',
        'Social media marketing',
        'Content marketing',
        'PPC campaigns'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'blockchain',
      title: 'Blockchain Development',
      description: 'Decentralized applications, smart contracts, and blockchain solutions for modern businesses.',
      features: [
        'Smart contract development',
        'DApp development',
        'NFT marketplace',
        'Cryptocurrency integration'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics & BI',
      description: 'Transform your data into actionable insights with advanced analytics and business intelligence solutions.',
      features: [
        'Data visualization dashboards',
        'Predictive analytics',
        'Big data processing',
        'Custom reporting tools'
      ],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className="services-page">
      <section className="services-hero section">
        <div className="container">
          <div
            ref={heroRef}
            className={`services-hero-content scroll-animate ${heroVisible ? 'visible' : ''}`}
          >
            <h1 className="page-title">Our Services</h1>
            <p className="page-subtitle">
              Comprehensive IT solutions tailored to your business needs - from web development to ongoing support
            </p>
          </div>
        </div>
      </section>

      <section className="services-grid-section section">
        <div className="container">
          <div ref={gridRef} className="services-grid">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-card glass-card scroll-animate-scale ${gridVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-secondary service-btn"
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta section">
        <div className="container">
          <div className="cta-box glass-card">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss how we can help bring your ideas to life with professional IT solutions</p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={() => navigate('/contact#inquiry-form')}>Book a Demo</button>
              <a href="tel:+919687140960" className="btn btn-secondary">Call Us Now</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;