import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Lightbulb, Rocket, RefreshCw, Users, Zap, Target, MessageSquare, Code, Cloud, Smartphone, Shield, Database, BarChart, Coffee, GitBranch } from 'lucide-react';
import './InsideTechnocoders.css';

const InsideTechnocoders = () => {
  const buildingProcess = [
    {
      icon: <Brain />,
      title: 'Discover Deeply',
      description: 'We analyze workflows, user behavior, and business processes before designing any solution.'
    },
    {
      icon: <Lightbulb />,
      title: 'Design Intelligently',
      description: 'We architect systems using AI, automation, and modern frameworks built for long-term performance.'
    },
    {
      icon: <Rocket />,
      title: 'Build Efficiently',
      description: 'Using agile development and rapid iterations, we transform ideas into powerful digital products faster.'
    },
    {
      icon: <RefreshCw />,
      title: 'Evolve Continuously',
      description: 'Technology should grow with your business. We continuously improve and optimize systems after launch.'
    }
  ];

  const focusedTeamBenefits = [
    {
      title: 'Direct Collaboration',
      description: 'You work directly with the people building your solution'
    },
    {
      title: 'Faster Decision Making',
      description: 'Small team, quick actions, rapid development cycles'
    },
    {
      title: 'Personal Attention',
      description: 'Every project gets dedicated focus'
    },
    {
      title: 'Innovation Driven',
      description: 'We quickly adopt smarter technologies and approaches'
    },
    {
      title: 'Quality Over Quantity',
      description: 'We take on projects we believe in and deliver fully'
    }
  ];

  const expertise = [
    { icon: <Brain />, title: 'AI & Automation Systems' },
    { icon: <Code />, title: 'Modern Web Applications (React & Node.js)' },
    { icon: <Smartphone />, title: 'Mobile App Development' },
    { icon: <Cloud />, title: 'Cloud Infrastructure & Deployment' },
    { icon: <Shield />, title: 'Secure & Scalable Architectures' },
    { icon: <Zap />, title: 'Business Process Automation' },
    { icon: <Database />, title: 'Custom Dashboards & Data Systems' },
    { icon: <GitBranch />, title: 'DevOps & CI/CD' }
  ];

  const mindsetStatements = [
    'Technology should solve problems, not create complexity.',
    'AI should simplify workflows, not overwhelm teams.',
    'Software should scale smoothly as businesses grow.',
    'Automation should save time and unlock productivity.',
    'Clear communication is just as important as clean code.'
  ];

  return (
    <div className="inside-technocoders-page">
      {/* Hero Section */}
      <section className="inside-hero section">
        <div className="container">
          <div className="inside-hero-content">
            <h1 className="inside-hero-title">
              Inside <span className="text-gradient">Technocoders</span>
            </h1>
            <p className="inside-hero-description">
              A focused team building AI-powered digital solutions that help businesses grow smarter, faster, and more efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* How We Build Section */}
      <section className="building-process section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How We Build Intelligent Solutions</h2>
            <p className="section-description">
              At Technocoders, we believe great technology starts with deep understanding. Every project begins by learning how your business works, identifying challenges, and discovering where intelligent systems can make real impact. We don't just write code — we design systems that think, automate, and scale.
            </p>
          </div>

          <div className="process-grid">
            {buildingProcess.map((item, index) => (
              <div key={index} className="process-card glass-card">
                <div className="process-icon">{item.icon}</div>
                <h3 className="process-title">{item.title}</h3>
                <p className="process-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder-section section">
        <div className="container">
          <h2 className="section-title">The Mind Behind Technocoders</h2>
          
          <div className="founder-content">
            <div className="founder-image-wrapper">
              <div className="founder-image-container glass-card">
                <img
                  src="/founder_image.PNG"
                  alt="Founder of Technocoders"
                  className="founder-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="founder-placeholder"><Users size={80} /></div>';
                  }}
                />
              </div>
              <div className="founder-role">
                <p className="role-title">Founder & AI Solutions Architect</p>
              </div>
            </div>

            <div className="founder-text">
              <p className="founder-bio">
                Technocoders is led by a passionate technology entrepreneur focused on building intelligent digital systems that create real business impact. With hands-on expertise in AI integrations, scalable web platforms, and automation-driven solutions, the vision is simple — use technology to make businesses smarter, faster, and future-ready.
              </p>
              <p className="founder-bio">
                From strategy to system architecture, every project is guided with a problem-solving mindset and a commitment to long-term value. The goal isn't just to deliver software, but to build digital ecosystems that grow alongside the businesses they serve.
              </p>
              <p className="founder-quote">
                "Great technology should not just support businesses — it should help them think smarter and grow faster."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Focused Team Section */}
      <section className="focused-team section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why a Focused Team Delivers Better Results</h2>
            <p className="section-description">
              We are intentionally built as a focused, high-performance team. This allows us to deliver faster communication, smarter execution, and more personalized attention to every project.
            </p>
          </div>

          <div className="benefits-grid">
            {focusedTeamBenefits.map((benefit, index) => (
              <div key={index} className="benefit-card glass-card">
                <div className="benefit-number">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="expertise-section section">
        <div className="container">
          <h2 className="section-title">What We're Great At</h2>
          
          <div className="expertise-grid">
            {expertise.map((item, index) => (
              <div key={index} className="expertise-card glass-card">
                <div className="expertise-icon">{item.icon}</div>
                <h3 className="expertise-title">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mindset Section */}
      <section className="mindset-section section">
        <div className="container">
          <h2 className="section-title">Inside Our Mindset</h2>
          
          <div className="mindset-statements">
            {mindsetStatements.map((statement, index) => (
              <div key={index} className="mindset-statement">
                <div className="statement-marker"></div>
                <p className="statement-text">{statement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Code Section */}
      <section className="beyond-code section">
        <div className="container">
          <div className="beyond-code-content glass-card">
            <div className="beyond-code-icon">
              <Coffee size={48} />
            </div>
            <h2 className="section-title">Beyond Code</h2>
            <p className="beyond-code-text">
              We are engineers, problem-solvers, and creative thinkers. We get excited about complex challenges, enjoy turning manual processes into smart automation, and love building systems that make a real difference. And yes — coffee is often part of the development process.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="inside-cta section">
        <div className="container">
          <div className="inside-cta-content">
            <h2 className="inside-cta-title">
              Let's Build Something <span className="text-gradient">Intelligent</span> Together
            </h2>
            <p className="inside-cta-subtitle">
              Have an idea or project in mind? Let's turn it into a powerful, AI-driven digital solution.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsideTechnocoders;