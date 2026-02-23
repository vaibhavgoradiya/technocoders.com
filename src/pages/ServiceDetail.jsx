import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { getTechIcon } from '../utils/getTechIcon';
import './ServiceDetail.css';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2, once: true });
  const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.1, once: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  const servicesData = {
    'ai-automation': {
      title: 'AI & Automation Solutions',
      description: 'We build AI-powered systems that automate tasks, improve decision-making, and increase operational efficiency.',
      longDescription: 'Transform your business operations with cutting-edge AI and automation technologies. Our solutions leverage machine learning, natural language processing, and intelligent automation to streamline workflows, reduce manual effort, and drive data-driven decision making.',
      features: [
        'Business Process Automation',
        'AI Chatbots & Virtual Assistants',
        'Predictive Analytics',
        'Workflow Automation Systems'
      ],
      benefits: [
        { title: 'Increased Efficiency', description: 'Automate repetitive tasks and free up your team for strategic work' },
        { title: 'Cost Reduction', description: 'Reduce operational costs by up to 60% through intelligent automation' },
        { title: 'Better Decision Making', description: 'Leverage AI-powered insights for data-driven business decisions' },
        { title: 'Scalability', description: 'Scale operations without proportional increase in resources' }
      ],
      technologies: ['OpenAI GPT', 'TensorFlow', 'PyTorch', 'LangChain', 'Python', 'Node.js'],
      useCases: [
        { title: 'Customer Service Automation', description: 'AI chatbots handling 80% of customer queries 24/7' },
        { title: 'Document Processing', description: 'Automated extraction and processing of business documents' },
        { title: 'Predictive Maintenance', description: 'AI-powered systems predicting equipment failures before they occur' }
      ],
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 1v6m0 6v6M1 12h6m6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    'web-development': {
      title: 'Web Development',
      description: 'Modern, fast, and scalable websites and web apps built for performance and growth.',
      longDescription: 'Create stunning, high-performance web applications that engage users and drive business growth. We specialize in modern frameworks and technologies to deliver responsive, SEO-optimized, and scalable web solutions.',
      features: [
        'Business Websites',
        'Web Applications',
        'E-commerce Platforms',
        'Custom Admin Panels'
      ],
      benefits: [
        { title: 'Modern Design', description: 'Beautiful, responsive designs that work on all devices' },
        { title: 'Fast Performance', description: 'Optimized for speed with 90+ PageSpeed scores' },
        { title: 'SEO Optimized', description: 'Built-in SEO best practices for better search rankings' },
        { title: 'Scalable Architecture', description: 'Grows with your business needs' }
      ],
      technologies: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
      useCases: [
        { title: 'Corporate Websites', description: 'Professional business websites with CMS integration' },
        { title: 'SaaS Platforms', description: 'Full-featured web applications with user management' },
        { title: 'E-commerce Stores', description: 'Online stores with payment and inventory systems' }
      ],
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    'custom-software': {
      title: 'Custom Software Development',
      description: 'Tailor-made software that solves complex business challenges.',
      longDescription: 'Get custom software solutions designed specifically for your unique business requirements. From CRM systems to enterprise applications, we build scalable, secure, and maintainable software that drives efficiency.',
      features: [
        'CRM Systems',
        'ERP Solutions',
        'Inventory & Billing Systems',
        'Business Management Software'
      ],
      benefits: [
        { title: 'Tailored Solutions', description: 'Software built exactly for your business processes' },
        { title: 'Integration Ready', description: 'Seamlessly integrates with existing systems' },
        { title: 'Competitive Advantage', description: 'Unique features that set you apart' },
        { title: 'Full Ownership', description: 'Complete control over your software' }
      ],
      technologies: ['Python', 'Java', 'Node.js', '.NET', 'PostgreSQL', 'MongoDB'],
      useCases: [
        { title: 'Enterprise CRM', description: 'Custom customer relationship management systems' },
        { title: 'ERP Systems', description: 'Integrated business management solutions' },
        { title: 'Inventory Management', description: 'Real-time inventory and billing systems' }
      ],
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    'mobile-app': {
      title: 'Mobile App Development',
      description: 'User-friendly Android and iOS apps designed for engagement and performance.',
      longDescription: 'Build native and cross-platform mobile applications that deliver exceptional user experiences. Our mobile solutions are designed for performance, security, and scalability across iOS and Android platforms.',
      features: [
        'Business Apps',
        'On-Demand Service Apps',
        'E-commerce Apps',
        'Enterprise Mobility Solutions'
      ],
      benefits: [
        { title: 'Cross-Platform', description: 'Single codebase for iOS and Android' },
        { title: 'Native Performance', description: 'Smooth, fast, and responsive user experience' },
        { title: 'Offline Capability', description: 'Works seamlessly even without internet' },
        { title: 'Push Notifications', description: 'Engage users with timely updates' }
      ],
      technologies: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase', 'Redux'],
      useCases: [
        { title: 'On-Demand Services', description: 'Uber-like apps for various services' },
        { title: 'E-commerce Apps', description: 'Mobile shopping experiences' },
        { title: 'Enterprise Apps', description: 'Internal business applications' }
      ],
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    'cloud-devops': {
      title: 'Cloud & DevOps Solutions',
      description: 'Secure and scalable cloud infrastructure for modern businesses.',
      longDescription: 'Modernize your infrastructure with cloud-native solutions and DevOps practices. We help businesses migrate to the cloud, implement CI/CD pipelines, and optimize infrastructure for performance and cost.',
      features: [
        'Cloud Deployment',
        'Server Setup & Optimization',
        'CI/CD Automation',
        'Performance Monitoring'
      ],
      benefits: [
        { title: 'Scalability', description: 'Scale resources up or down based on demand' },
        { title: 'Cost Optimization', description: 'Pay only for what you use' },
        { title: 'High Availability', description: '99.9% uptime with redundancy' },
        { title: 'Faster Deployment', description: 'Automated CI/CD for rapid releases' }
      ],
      technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
      useCases: [
        { title: 'Cloud Migration', description: 'Seamless migration from on-premise to cloud' },
        { title: 'Infrastructure as Code', description: 'Automated infrastructure management' },
        { title: 'Microservices', description: 'Containerized application deployment' }
      ],
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    'api-integration': {
      title: 'API & System Integrations',
      description: 'We connect your tools and platforms to work together seamlessly.',
      longDescription: 'Integrate disparate systems and third-party services to create a unified digital ecosystem. Our API integration solutions enable seamless data flow and automation across your business applications.',
      features: [
        'Payment Gateway Integration',
        'Third-Party APIs',
        'CRM/ERP Integrations',
        'Automation Between Systems'
      ],
      benefits: [
        { title: 'Seamless Data Flow', description: 'Real-time synchronization across systems' },
        { title: 'Reduced Manual Work', description: 'Automated data transfer and updates' },
        { title: 'Better Insights', description: 'Unified view of business data' },
        { title: 'Improved Efficiency', description: 'Streamlined business processes' }
      ],
      technologies: ['REST API', 'GraphQL', 'Webhooks', 'OAuth', 'Stripe', 'PayPal'],
      useCases: [
        { title: 'Payment Integration', description: 'Stripe, PayPal, and other payment gateways' },
        { title: 'CRM Integration', description: 'Connect Salesforce, HubSpot, etc.' },
        { title: 'Marketing Automation', description: 'Integrate email and marketing tools' }
      ],
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    'ui-ux-design': {
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive designs that enhance user experience and engagement.',
      longDescription: 'Create delightful user experiences with our comprehensive UI/UX design services. We combine user research, visual design, and usability testing to craft interfaces that users love.',
      features: [
        'User research & personas',
        'Wireframing & prototyping',
        'Visual design & branding',
        'Usability testing'
      ],
      benefits: [
        { title: 'User-Centered', description: 'Designs based on real user needs and behavior' },
        { title: 'Higher Engagement', description: 'Intuitive interfaces that users love' },
        { title: 'Brand Consistency', description: 'Cohesive design across all touchpoints' },
        { title: 'Faster Development', description: 'Clear designs reduce development time' }
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Testing'],
      useCases: [
        { title: 'Web Design', description: 'Modern, responsive website designs' },
        { title: 'Mobile App Design', description: 'Native iOS and Android app interfaces' },
        { title: 'Dashboard Design', description: 'Data-rich admin and analytics dashboards' }
      ],
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    'maintenance-support': {
      title: 'Maintenance & Support',
      description: 'Reliable long-term technical support to keep systems secure and updated.',
      longDescription: 'Ensure your digital products remain secure, performant, and up-to-date with our comprehensive maintenance and support services. We provide proactive monitoring, regular updates, and rapid issue resolution.',
      features: [
        'Bug Fixes & Updates',
        'Performance Optimization',
        'Security Monitoring',
        'Technical Support'
      ],
      benefits: [
        { title: '24/7 Monitoring', description: 'Continuous system health monitoring' },
        { title: 'Quick Response', description: 'Rapid issue resolution and support' },
        { title: 'Regular Updates', description: 'Keep systems current and secure' },
        { title: 'Peace of Mind', description: 'Focus on business while we handle tech' }
      ],
      technologies: ['Monitoring Tools', 'CI/CD', 'Docker', 'Git', 'Security Audits'],
      useCases: [
        { title: 'Website Maintenance', description: 'Regular updates and security patches' },
        { title: 'App Support', description: 'Bug fixes and feature enhancements' },
        { title: 'Server Management', description: 'Infrastructure monitoring and optimization' }
      ],
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    'ecommerce': {
      title: 'E-Commerce Solutions',
      description: 'Complete e-commerce platforms with payment integration, inventory management, and order tracking systems.',
      longDescription: 'Launch and scale your online store with our comprehensive e-commerce solutions. From product catalogs to payment processing and order fulfillment, we build complete online shopping experiences.',
      features: [
        'Online store development',
        'Payment gateway integration',
        'Inventory & order management',
        'Multi-vendor marketplace'
      ],
      benefits: [
        { title: 'Increased Sales', description: 'Optimized checkout and conversion funnels' },
        { title: 'Global Reach', description: 'Sell to customers worldwide' },
        { title: 'Automated Operations', description: 'Streamlined order and inventory management' },
        { title: 'Mobile Commerce', description: 'Responsive design for mobile shoppers' }
      ],
      technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'React', 'Node.js'],
      useCases: [
        { title: 'Online Retail', description: 'Full-featured e-commerce stores' },
        { title: 'Marketplace', description: 'Multi-vendor platforms like Amazon' },
        { title: 'Subscription Commerce', description: 'Recurring billing and subscriptions' }
      ],
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
          <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    'digital-marketing': {
      title: 'Digital Marketing & SEO',
      description: 'Comprehensive digital marketing strategies to boost your online presence and drive growth.',
      longDescription: 'Grow your online presence and drive qualified traffic with our data-driven digital marketing services. From SEO to social media marketing, we help businesses reach and engage their target audience.',
      features: [
        'SEO optimization',
        'Social media marketing',
        'Content marketing',
        'PPC campaigns'
      ],
      benefits: [
        { title: 'Increased Visibility', description: 'Rank higher in search results' },
        { title: 'Targeted Traffic', description: 'Reach the right audience at the right time' },
        { title: 'Better ROI', description: 'Data-driven campaigns that convert' },
        { title: 'Brand Awareness', description: 'Build strong online presence' }
      ],
      technologies: ['Google Analytics', 'SEO Tools', 'Social Media', 'Google Ads', 'Content Marketing'],
      useCases: [
        { title: 'SEO Services', description: 'Organic search ranking improvement' },
        { title: 'Social Media', description: 'Facebook, Instagram, LinkedIn campaigns' },
        { title: 'PPC Advertising', description: 'Google Ads and paid social campaigns' }
      ],
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    'blockchain': {
      title: 'Blockchain Development',
      description: 'Decentralized applications, smart contracts, and blockchain solutions for modern businesses.',
      longDescription: 'Leverage blockchain technology to build secure, transparent, and decentralized solutions. From smart contracts to DApps and NFT marketplaces, we deliver cutting-edge blockchain applications.',
      features: [
        'Smart contract development',
        'DApp development',
        'NFT marketplace',
        'Cryptocurrency integration'
      ],
      benefits: [
        { title: 'Transparency', description: 'Immutable and transparent transactions' },
        { title: 'Security', description: 'Cryptographically secure systems' },
        { title: 'Decentralization', description: 'No single point of failure' },
        { title: 'Innovation', description: 'Stay ahead with cutting-edge tech' }
      ],
      technologies: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts', 'IPFS'],
      useCases: [
        { title: 'NFT Platforms', description: 'Create and trade digital assets' },
        { title: 'DeFi Applications', description: 'Decentralized finance solutions' },
        { title: 'Supply Chain', description: 'Transparent tracking systems' }
      ],
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    'data-analytics': {
      title: 'Data Analytics & BI',
      description: 'Transform your data into actionable insights with advanced analytics and business intelligence solutions.',
      longDescription: 'Make data-driven decisions with our comprehensive analytics and business intelligence solutions. We help businesses collect, analyze, and visualize data to uncover insights and drive growth.',
      features: [
        'Data visualization dashboards',
        'Predictive analytics',
        'Big data processing',
        'Custom reporting tools'
      ],
      benefits: [
        { title: 'Better Decisions', description: 'Data-driven insights for strategic planning' },
        { title: 'Real-time Analytics', description: 'Live dashboards and reporting' },
        { title: 'Predictive Insights', description: 'Forecast trends and outcomes' },
        { title: 'Competitive Edge', description: 'Stay ahead with data intelligence' }
      ],
      technologies: ['Python', 'Tableau', 'Power BI', 'SQL', 'Apache Spark', 'Machine Learning'],
      useCases: [
        { title: 'Business Dashboards', description: 'Real-time KPI tracking and visualization' },
        { title: 'Predictive Analytics', description: 'Forecast sales and trends' },
        { title: 'Customer Analytics', description: 'Understand customer behavior patterns' }
      ],
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    }
  };

  const service = servicesData[serviceId];

  if (!service) {
    return (
      <div className="service-detail-page">
        <div className="container">
          <div className="not-found">
            <h1>Service Not Found</h1>
            <p>The service you're looking for doesn't exist.</p>
            <button className="btn btn-primary" onClick={() => navigate('/services')}>
              Back to Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      {/* Hero Section */}
      <section className="service-detail-hero section">
        <div className="container">
          <div
            ref={heroRef}
            className={`service-detail-hero-content scroll-animate ${heroVisible ? 'visible' : ''}`}
          >
            <div className="service-detail-icon">{service.icon}</div>
            <h1 className="service-detail-title">{service.title}</h1>
            <p className="service-detail-description">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="service-detail-content section">
        <div className="container">
          <div
            ref={contentRef}
            className={`content-grid scroll-animate ${contentVisible ? 'visible' : ''}`}
          >
            {/* Overview */}
            <div className="content-section glass-card">
              <h2>Overview</h2>
              <p>{service.longDescription}</p>
            </div>

            {/* Key Features */}
            <div className="content-section glass-card">
              <h2>Key Features</h2>
              <ul className="features-list">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="content-section full-width">
              <h2>Benefits</h2>
              <div className="benefits-grid">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="benefit-card glass-card">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="content-section glass-card">
              <h2>Technologies We Use</h2>
              <div className="tech-tags">
                {service.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">
                    <span className="tech-icon">
                      {getTechIcon(tech)}
                    </span>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="content-section glass-card">
              <h2>Use Cases</h2>
              <div className="use-cases-list">
                {service.useCases.map((useCase, idx) => (
                  <div key={idx} className="use-case-item">
                    <h4>{useCase.title}</h4>
                    <p>{useCase.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="content-section full-width">
              <h2>Our Process</h2>
              <div className="process-timeline">
                <div className="process-step">
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <h3>Discovery & Planning</h3>
                    <p>We understand your requirements and create a detailed project roadmap</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">02</div>
                  <div className="step-content">
                    <h3>Design & Development</h3>
                    <p>Our team designs and develops your solution using best practices</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">03</div>
                  <div className="step-content">
                    <h3>Testing & QA</h3>
                    <p>Comprehensive testing to ensure everything works perfectly</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">04</div>
                  <div className="step-content">
                    <h3>Launch & Support</h3>
                    <p>Smooth deployment with ongoing support and maintenance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="content-section full-width cta-section">
              <div className="cta-card glass-card">
                <h2>Ready to Get Started?</h2>
                <p>Let's discuss how we can help you with {service.title.toLowerCase()}</p>
                <div className="cta-buttons">
                  <button className="btn btn-primary" onClick={() => navigate('/contact')}>
                    Book a Consultation
                  </button>
                  <a href="tel:+919687140960" className="btn btn-secondary">
                    Call Us Now
                  </a>
                </div>
              </div>
            </div>

            {/* Back to Services */}
            <div className="content-section full-width back-to-services-section">
              <button className="back-button-bottom" onClick={() => navigate('/services')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Services
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;