import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
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
    <div className="privacy-policy-page">
      <div className="privacy-hero">
        <div className="container">
          <h1 className="privacy-title">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="privacy-subtitle">
            At Technocoders, your privacy matters to us. We are dedicated to keeping your personal information safe and secure.
          </p>
          <div className="effective-date">
            <span className="date-label">Effective Date:</span> {getCurrentDate()}
          </div>
        </div>
      </div>

      <div className="privacy-content">
        <div className="container">
          <section className="privacy-section">
            <div className="section-number">1</div>
            <h2 className="section-title">Information We Collect</h2>
            <p className="section-text">We may collect the following types of information:</p>
            <ul className="privacy-list">
              <li>Personal details (name, email, phone number).</li>
              <li>Business information (company name, industry, project requirements).</li>
              <li>Usage data (IP address, browser type, device info).</li>
              <li>Cookies and tracking data.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <div className="section-number">2</div>
            <h2 className="section-title">How We Use Your Information</h2>
            <p className="section-text">We use the collected data to:</p>
            <ul className="privacy-list">
              <li>Provide and improve our services.</li>
              <li>Communicate with you regarding updates or offers.</li>
              <li>Analyze usage to enhance user experience.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <div className="section-number">3</div>
            <h2 className="section-title">Sharing Your Information</h2>
            <p className="section-text">
              We do not sell your personal data. However, we may share it with:
            </p>
            <ul className="privacy-list">
              <li>Trusted third-party service providers (for hosting, analytics, marketing).</li>
              <li>Legal authorities if required by law.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <div className="section-number">4</div>
            <h2 className="section-title">Data Protection</h2>
            <ul className="privacy-list">
              <li>
                We implement appropriate security measures to safeguard your personal information against unauthorized access, alteration, or disclosure.
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <div className="section-number">5</div>
            <h2 className="section-title">Your Rights</h2>
            <p className="section-text">You have the right to:</p>
            <ul className="privacy-list">
              <li>Access, update, or delete your personal information.</li>
              <li>Opt-out of marketing communications.</li>
              <li>Request data portability.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <div className="section-number">6</div>
            <h2 className="section-title">Cookies</h2>
            <p className="section-text">
              We use cookies to enhance your browsing experience. You can manage cookie preferences through your browser settings.
            </p>
          </section>

          <section className="privacy-section">
            <div className="section-number">7</div>
            <h2 className="section-title">Third-Party Links</h2>
            <p className="section-text">
              Our website may contain links to third-party sites. We are not responsible for their privacy practices.
            </p>
          </section>

          <section className="privacy-section">
            <div className="section-number">8</div>
            <h2 className="section-title">Changes to This Policy</h2>
            <p className="section-text">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>

          <section className="privacy-section privacy-contact">
            <div className="contact-box">
              <h2 className="contact-title">Questions About Our Privacy Policy?</h2>
              <p className="contact-text">
                If you have any questions or concerns about how we handle your data, please feel free to contact us.
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

export default PrivacyPolicy;