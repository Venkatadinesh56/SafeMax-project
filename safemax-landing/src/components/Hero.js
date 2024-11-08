// src/components/Hero.js
import React from 'react';

const Hero = () => {
  const scrollToAppointment = () => {
    const appointmentSection = document.getElementById('Appointment');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>Your Trusted Partner in Cybersecurity</h1>
        <p>Protecting Your Digital World</p>
        <button className="cta-btn" onClick={scrollToAppointment}>
          Schedule a Consultation
        </button>
      </div>
    </section>
  );
};

export default Hero;
