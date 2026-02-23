import React, { useEffect } from 'react';
import './CalEmbed.css';

const CalEmbed = () => {
  useEffect(() => {
    // Initialize Cal.com embed
    const initCal = () => {
      if (window.Cal) {
        window.Cal("init", "30min", { origin: "https://app.cal.com" });
        
        window.Cal.ns["30min"]("inline", {
          elementOrSelector: "#my-cal-inline-30min",
          config: { layout: "month_view" },
          calLink: "techocoders/30min",
        });

        window.Cal.ns["30min"]("ui", {
          hideEventTypeDetails: false,
          layout: "month_view"
        });
      }
    };

    // Check if Cal is already loaded
    if (window.Cal) {
      initCal();
    } else {
      // Wait for Cal to load
      const checkCal = setInterval(() => {
        if (window.Cal) {
          clearInterval(checkCal);
          initCal();
        }
      }, 100);

      return () => clearInterval(checkCal);
    }
  }, []);

  return (
    <section className="cal-embed-section">
      <div className="container">
        <div className="cal-embed-header">
          <div className="luxury-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="9" y1="4" x2="9" y2="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="15" y1="4" x2="15" y2="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Book Your Consultation</span>
            <div className="badge-glow"></div>
          </div>
          <h2 className="luxury-title">
            <span className="title-line">Schedule Your Strategic</span>
            <span className="gradient-text">Consultation</span>
          </h2>
          <p className="cal-subtitle">
            Discover how AI-powered solutions can transform your business in a personalized 30-minute executive session
          </p>
        </div>
        
        <div className="cal-embed-container">
          <div 
            id="my-cal-inline-30min" 
            className="cal-embed-wrapper"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default CalEmbed;