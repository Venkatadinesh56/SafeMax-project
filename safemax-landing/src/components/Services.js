// src/components/Services.js
import React from 'react';

const Services = () => {
  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <div className="service-list">
        <div className="service-item">
          <h3>VAPT</h3>
          <p>Vulnerability Assessment & Penetration Testing to keep your systems safe.</p>
        </div>
        <div className="service-item">
          <h3>Network Security</h3>
          <p>Comprehensive network protection against cyber threats.</p>
        </div>
        <div className="service-item">
          <h3>Incident Response</h3>
          <p>Quick action to minimize the impact of security breaches.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
