import React, { useState, useEffect, useRef } from 'react';
import { useMagneticCursor } from '../hooks/useMagneticCursor';
// import { useTextReveal } from '../hooks/useTextReveal';
import './CTA.css';

const CTA = () => {
  const magneticBackRef = useMagneticCursor({ strength: 0.3 });
  const magneticNextRef = useMagneticCursor({ strength: 0.4 });
  // const [titleRef, titleText] = useTextReveal('Book Your Exclusive Demo', {
  //   mode: 'word',
  //   delay: 80
  // });
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    teamSize: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const canvasRef = useRef(null);

  const totalSteps = 3;

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(94, 179, 199, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate calendar dates
  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Get the last day of current month
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Generate all dates from 1st to last day of current month
    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(currentYear, currentMonth, day);
      // Only include dates from today onwards
      if (date >= today.setHours(0, 0, 0, 0)) {
        dates.push(date);
      }
    }
    
    // If we need more dates (current month ending soon), add next month dates
    if (dates.length < 15) {
      const nextMonth = currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const daysNeeded = 15 - dates.length;
      
      for (let day = 1; day <= daysNeeded; day++) {
        const date = new Date(nextYear, nextMonth === 12 ? 0 : nextMonth, day);
        dates.push(date);
      }
    }
    
    return dates;
  };

  const calendarDates = generateCalendarDates();

  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: false },
    { time: '05:00 PM', available: true }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    } else if (step === 2) {
      if (!formData.company.trim()) newErrors.company = 'Company is required';
      if (!formData.role) newErrors.role = 'Role is required';
      if (!formData.teamSize) newErrors.teamSize = 'Team size is required';
    } else if (step === 3) {
      if (!selectedDate) newErrors.date = 'Please select a date';
      if (!selectedTimeSlot) newErrors.time = 'Please select a time slot';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setFormData(prev => ({ 
      ...prev, 
      preferredDate: date.toISOString().split('T')[0] 
    }));
    if (errors.date) {
      setErrors(prev => ({ ...prev, date: '' }));
    }
  };

  const handleTimeSelect = (slot) => {
    if (slot.available) {
      setSelectedTimeSlot(slot.time);
      setFormData(prev => ({ ...prev, preferredTime: slot.time }));
      if (errors.time) {
        setErrors(prev => ({ ...prev, time: '' }));
      }
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      role: '',
      teamSize: '',
      preferredDate: '',
      preferredTime: ''
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    setErrors({});
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()]
    };
  };

  if (isSubmitted) {
    return (
      <section className="cta section">
        <canvas ref={canvasRef} className="particle-canvas"></canvas>
        <div className="gradient-mesh"></div>
        
        <div className="container">
          <div className="cta-success luxury-card">
            <div className="success-icon-wrapper">
              <div className="success-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="success-glow"></div>
            </div>
            
            <h2 className="success-title">Demo Booked Successfully! 🎉</h2>
            <p className="success-message">
              Thank you, <strong>{formData.name}</strong>! We've received your consultation request for <strong>{formData.company}</strong>.
            </p>
            
            <div className="booking-details">
              <div className="detail-card">
                <div className="detail-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="detail-text">
                  <div className="detail-label">Date</div>
                  <div className="detail-value">{selectedDate ? formatDate(selectedDate).day + ', ' + formatDate(selectedDate).month + ' ' + formatDate(selectedDate).date : formData.preferredDate}</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="detail-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="detail-text">
                  <div className="detail-label">Time</div>
                  <div className="detail-value">{formData.preferredTime}</div>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="detail-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="detail-text">
                  <div className="detail-label">Confirmation sent to</div>
                  <div className="detail-value">{formData.email}</div>
                </div>
              </div>
            </div>
            
            <p className="success-note">
              Our executive team will contact you within 24 hours to confirm your strategic consultation session.
            </p>
            
            <button onClick={resetForm} className="btn btn-primary btn-3d magnetic-btn">
              <span>Schedule Another Session</span>
              <div className="btn-glow"></div>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cta section">
      <canvas ref={canvasRef} className="particle-canvas"></canvas>
      <div className="gradient-mesh"></div>
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>
      
      <div className="container">
        <div className="cta-header">
          <div className="cta-badge luxury-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Enterprise AI Solutions</span>
            <div className="badge-glow"></div>
          </div>
          
          <h2 className="cta-title luxury-title text-reveal">
            Schedule Your Strategic Consultation
          </h2>
          <p className="cta-subtitle">Discover how AI-powered solutions can transform your business in a personalized 30-minute executive session</p>
        </div>

        <div className="cta-content">
          {/* Progress Bar */}
          <div className="progress-container luxury-progress">
            <div className="progress-bar-3d">
              <div 
                className="progress-fill-3d" 
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="progress-shimmer"></div>
              </div>
            </div>
            <div className="progress-steps">
              {[1, 2, 3].map((step) => (
                <div 
                  key={step}
                  className={`progress-step luxury-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                >
                  <div className="step-number-3d">
                    {currentStep > step ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      step
                    )}
                    <div className="step-glow"></div>
                  </div>
                  <div className="step-label">
                    {step === 1 && 'Personal Info'}
                    {step === 2 && 'Company Details'}
                    {step === 3 && 'Schedule Demo'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Steps */}
          <div className="form-container luxury-card">
            <div className="card-shine"></div>
            <div className="form-steps">
              {/* Step 1: Personal Info */}
              <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
                <h3 className="step-title">Let's start with your details</h3>
                <div className="form-grid">
                  <div className="form-group luxury-input-group">
                    <label htmlFor="name">Full Name *</label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=""
                        className={errors.name ? 'error' : ''}
                      />
                    </div>
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>
                  <div className="form-group luxury-input-group">
                    <label htmlFor="email">Work Email *</label>
                    <div className="input-wrapper">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=""
                        className={errors.email ? 'error' : ''}
                      />
                    </div>
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>
              </div>

              {/* Step 2: Company Details */}
              <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
                <h3 className="step-title">Tell us about your company</h3>
                <div className="form-grid">
                  <div className="form-group luxury-input-group">
                    <label htmlFor="company">Company Name *</label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder=""
                        className={errors.company ? 'error' : ''}
                      />
                    </div>
                    {errors.company && <span className="error-message">{errors.company}</span>}
                  </div>
                  <div className="form-group luxury-input-group">
                    <label htmlFor="role">Your Role *</label>
                    <div className="input-wrapper">
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={errors.role ? 'error' : ''}
                      >
                        <option value="">Select your role</option>
                        <option value="cto">CTO / Tech Lead</option>
                        <option value="developer">Developer</option>
                        <option value="product">Product Manager</option>
                        <option value="founder">Founder / CEO</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {errors.role && <span className="error-message">{errors.role}</span>}
                  </div>
                  <div className="form-group luxury-input-group full-width">
                    <label htmlFor="teamSize">Team Size *</label>
                    <div className="input-wrapper">
                      <select
                        id="teamSize"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className={errors.teamSize ? 'error' : ''}
                      >
                        <option value="">Select team size</option>
                        <option value="1-10">1-10 people</option>
                        <option value="11-50">11-50 people</option>
                        <option value="51-200">51-200 people</option>
                        <option value="201+">201+ people</option>
                      </select>
                    </div>
                    {errors.teamSize && <span className="error-message">{errors.teamSize}</span>}
                  </div>
                </div>
              </div>

              {/* Step 3: Schedule Demo */}
              <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
                <h3 className="step-title">Pick your preferred time</h3>
                
                <div className="calendar-section">
                  <label className="calendar-label">Select Date *</label>
                  <div className="calendar-grid">
                    {calendarDates.map((date, index) => {
                      const formatted = formatDate(date);
                      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
                      return (
                        <div
                          key={index}
                          className={`calendar-date ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleDateSelect(date)}
                        >
                          <div className="date-day">{formatted.day}</div>
                          <div className="date-number">{formatted.date}</div>
                          <div className="date-month">{formatted.month}</div>
                          {isSelected && <div className="date-glow"></div>}
                        </div>
                      );
                    })}
                  </div>
                  {errors.date && <span className="error-message">{errors.date}</span>}
                </div>

                <div className="timeslot-section">
                  <label className="timeslot-label">Select Time Slot *</label>
                  <div className="timeslot-grid">
                    {timeSlots.map((slot, index) => (
                      <div
                        key={index}
                        className={`timeslot ${selectedTimeSlot === slot.time ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                        onClick={() => handleTimeSelect(slot)}
                      >
                        <div className="timeslot-time">{slot.time}</div>
                        {!slot.available && <div className="timeslot-badge">Booked</div>}
                        {slot.available && <div className="timeslot-badge available">Available</div>}
                        {selectedTimeSlot === slot.time && <div className="timeslot-glow"></div>}
                      </div>
                    ))}
                  </div>
                  {errors.time && <span className="error-message">{errors.time}</span>}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="form-actions">
              {currentStep > 1 && (
                <button ref={magneticBackRef} onClick={handleBack} className="btn btn-secondary btn-3d magnetic-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Back</span>
                </button>
              )}
              <button ref={magneticNextRef} onClick={handleNext} className="btn btn-primary btn-3d magnetic-btn">
                <span>{currentStep === totalSteps ? 'Confirm Consultation' : 'Continue'}</span>
                {currentStep < totalSteps && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                <div className="btn-glow"></div>
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators luxury-trust">
            <div className="trust-item luxury-trust-card">
              <div className="trust-icon-3d">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="icon-glow"></div>
              </div>
              <div className="trust-text">
                <div className="trust-value">99%</div>
                <div className="trust-label">Success Rate</div>
              </div>
            </div>
            <div className="trust-item luxury-trust-card">
              <div className="trust-icon-3d">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="icon-glow"></div>
              </div>
              <div className="trust-text">
                <div className="trust-value">10x</div>
                <div className="trust-label">Faster Development</div>
              </div>
            </div>
            <div className="trust-item luxury-trust-card">
              <div className="trust-icon-3d">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div className="icon-glow"></div>
              </div>
              <div className="trust-text">
                <div className="trust-value">24/7</div>
                <div className="trust-label">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;