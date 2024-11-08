import React, { useEffect, useState } from 'react';
import AppointmentData from './Appointmentdata'; // Ensure correct import path

const Navbar = () => {
  const [showAdminCM, setShowAdminCM] = useState(false);

  useEffect(() => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    const toggleMenu = () => {
      navLinks.classList.toggle('active');
    };

    menuToggle.addEventListener('click', toggleMenu);

    return () => {
      menuToggle.removeEventListener('click', toggleMenu);
    };
  }, []);

  const handleAdminCMClick = () => {
    setShowAdminCM(true); // Show Admin CM when clicked
  };

  const handleCloseAdminCM = () => {
    setShowAdminCM(false); // Hide Admin CM when clicking outside
  };

  return (
    <nav className="navbar">
      <div className="logo">SafeMax</div>
      <div className="menu-toggle">&#9776;</div>
      <ul className="nav-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#why-choose">Why Choose Us</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#Appointment">Appointment</a></li>
        {/* Use a button for non-link behavior */}
        <li><button onClick={handleAdminCMClick}>Admin CMS</button></li>
      </ul>

      {showAdminCM && (
        <div className="admin-cm-overlay" onClick={handleCloseAdminCM}>
          <div className="admin-cm-content" onClick={(e) => e.stopPropagation()}>
            <AppointmentData />
            <button className="close-btn" onClick={handleCloseAdminCM}>Close</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
