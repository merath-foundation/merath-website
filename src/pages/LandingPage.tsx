import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import './LandingPage.css';
import logo from '../assets/merath_logo_transparent.png';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <NavBar />
      
      <section className="hero-section">
        <div className="hero-content">
          <img src={logo} alt="Merath Logo" className="hero-logo" />
          
          <div className="hero-subtitle">
            merath operates between research and production.
          </div>
          
          <div className="hero-description">
            It engages archives, exhibitions, and collective study as methods for approaching how art can document, translate, and transform lived experience.
          </div>
          
          <div className="hero-description-secondary">
            The collective's work extends across Libya and its neighbouring countries.
          </div>
          
          <div className="hero-side-text">
            We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.
          </div>
        </div>
      </section>
      
      <section className="cards-section">
        <div className="cards-container">
          <Card 
            title="Projects"
            description="Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story."
          />
          <Card 
            title="Archives/Exhibitions"
            description="Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story."
          />
          <Card 
            title="About Us"
            description="Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story."
          />
        </div>
      </section>
      
      <section className="project-showcase">
        <div className="showcase-image"></div>
        <div className="showcase-image"></div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
