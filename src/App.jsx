import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import PageTransition from './components/PageTransition';
import { ScrollProgressBar } from './components/ProgressBar';
import { KonamiCode, ConfettiExplosion, MatrixRain, ConsoleEasterEgg } from './components/EasterEggs';
import ScrollToTopButton from './components/ScrollToTopButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import InsideTechnocoders from './pages/InsideTechnocoders';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import './App.css';
import './styles/animations.css';

function AppContent() {
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleKonamiCode = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleSecretCode = () => {
    setShowMatrix(true);
    setTimeout(() => setShowMatrix(false), 5000);
  };

  return (
    <KonamiCode onActivate={handleKonamiCode}>
      <div className="app">
        <ScrollProgressBar />
        <AnimatedBackground />
        <Header />
        <main>
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/inside" element={<InsideTechnocoders />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
        <ScrollToTopButton />
        <ConfettiExplosion active={showConfetti} />
        <MatrixRain active={showMatrix} />
        <ConsoleEasterEgg />
      </div>
    </KonamiCode>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;