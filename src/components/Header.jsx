import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { playPageTransitionSound, playMenuSound } from '../utils/soundEffects';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    playMenuSound();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = () => {
    playPageTransitionSound();
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Backdrop - Outside header for proper z-index stacking */}
      <div
        className={`menu-backdrop ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      />
      
      <header className="header">
        <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src="/Technocoders_orignal_logowbg.png" alt="Technocoders" className="logo-image" />
            <div className="logo-text-wrapper">
              <span className="logo-name">Technocoders</span>
              <span className="logo-tagline">Digital Transformation Partner</span>
            </div>
          </Link>

          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              About
            </Link>
            <Link
              to="/services"
              className={`nav-link ${isActive('/services') ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Services
            </Link>
            <Link
              to="/inside"
              className={`nav-link ${isActive('/inside') ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Inside
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Contact
            </Link>
          </nav>

          <div className="header-actions">
            <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;