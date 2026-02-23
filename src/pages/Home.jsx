import React from 'react';
import Hero from '../components/Hero';
import Showcase from '../components/Showcase';
import TrustedBy from '../components/TrustedBy';
import Process from '../components/Process';
import Features from '../components/Features';
import ResultsSection from '../components/ResultsSection';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Showcase />
      <TrustedBy />
      <Process />
      <Features />
      <ResultsSection />
    </div>
  );
};

export default Home;