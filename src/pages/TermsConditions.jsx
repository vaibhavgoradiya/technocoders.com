import React from 'react';
import './TermsConditions.css';

const TermsConditions = () => {
  // Get current date in Asia/Kolkata timezone
  const getCurrentDate = () => {
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="terms-page">
      <div className="terms-hero">
        <div className="container">
          <h1 className="terms-title">
            Terms & <span className="gradient-text">Conditions</span>
          </h1>
          <p className="terms-subtitle">
            Please read these terms and conditions carefully before using our services.
          </p>
          <div className="effective-date">
            <span className="date-label">Effective Date:</span> {getCurrentDate()}
          </div>
        </div>
      </div>

      <div className="terms-content">
        <div className="container">
          <section className="terms-section">
            <div className="section-number">1</div>
            <h2 className="section-title">Acceptance of Terms</h2>
            <p className="section-text">
              By accessing and using Technocoders' services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="terms-section">
            <div className="section-number">2</div>
            <h2 className="section-title">Services Provided</h2>
            <p className="section-text">Technocoders provides:</p>
            <ul className="terms-list">
              <li>AI Development and Integration Services</li>
              <li>Web and Mobile Application Development</li>
              <li>Cloud Solutions and Infrastructure</li>
              <li>Custom Software Development</li>
              <li>Digital Transformation Consulting</li>
            </ul>
          </section>

          <section className="terms-section">
            <div className="section-number">3</div>
            <h2 className="section-title">User Responsibilities</h2>
            <p className="section-text">As a user of our services, you agree to:</p>
            <ul className="terms-list">
              <li>Provide accurate and complete information when required.</li>
              <li>Maintain the confidentiality of your account credentials.</li>
              <li>Use our services in compliance with all applicable laws and regulations.</li>
              <li>Not engage in any activity that could harm or disrupt our services.</li>
            </ul>
          </section>

          <section className="terms-section">
            <div className="section-number">4</div>
            <h2 className="section-title">Intellectual Property</h2>
            <p className="section-text">
              All content, designs, code, and materials provided by Technocoders are protected by intellectual property rights. Unless otherwise agreed in writing:
            </p>
            <ul className="terms-list">
              <li>Technocoders retains ownership of all proprietary tools and frameworks.</li>
              <li>Custom-developed solutions become the property of the client upon full payment.</li>
              <li>You may not reproduce, distribute, or create derivative works without permission.</li>
            </ul>
          </section>

          <section className="terms-section">
            <div className="section-number">5</div>
            <h2 className="section-title">Payment Terms</h2>
            <ul className="terms-list">
              <li>Payment terms will be specified in individual project agreements.</li>
              <li>All fees are exclusive of applicable taxes unless stated otherwise.</li>
              <li>Late payments may incur additional charges as specified in the agreement.</li>
              <li>Refunds are subject to the terms outlined in the project contract.</li>
            </ul>
          </section>

          <section className="terms-section">
            <div className="section-number">6</div>
            <h2 className="section-title">Limitation of Liability</h2>
            <p className="section-text">
              Technocoders shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service in question.
            </p>
          </section>

          <section className="terms-section">
            <div className="section-number">7</div>
            <h2 className="section-title">Confidentiality</h2>
            <p className="section-text">
              Both parties agree to maintain the confidentiality of any proprietary information shared during the course of the engagement. This obligation continues even after the termination of services.
            </p>
          </section>

          <section className="terms-section">
            <div className="section-number">8</div>
            <h2 className="section-title">Termination</h2>
            <p className="section-text">
              Either party may terminate services under the conditions specified in the project agreement. Upon termination:
            </p>
            <ul className="terms-list">
              <li>All outstanding payments become immediately due.</li>
              <li>Access to services and materials may be revoked.</li>
              <li>Confidentiality obligations remain in effect.</li>
            </ul>
          </section>

          <section className="terms-section">
            <div className="section-number">9</div>
            <h2 className="section-title">Modifications to Terms</h2>
            <p className="section-text">
              Technocoders reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services constitutes acceptance of modified terms.
            </p>
          </section>

          <section className="terms-section">
            <div className="section-number">10</div>
            <h2 className="section-title">Governing Law</h2>
            <p className="section-text">
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat.
            </p>
          </section>

          <section className="terms-section terms-contact">
            <div className="contact-box">
              <h2 className="contact-title">Questions About Our Terms?</h2>
              <p className="contact-text">
                If you have any questions or concerns about these terms and conditions, please don't hesitate to reach out to us.
              </p>
              <a href="mailto:info@technocoders.com" className="contact-email">
                info@technocoders.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;