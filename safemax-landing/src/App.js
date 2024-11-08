// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChoose from './components/WhyChoose';
import Testimonials from './components/Testimonials';
import Appointment from './components/Appointment';
import Footer from './components/Footer';
import AppointmentData from './components/Appointmentdata';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Navbar />
        </header>
        <Hero />
        <About />
        <Services />
        <WhyChoose />
        <Testimonials />
        <Appointment />
        <Footer />
        <Routes>
          {/* Define your routes here */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/appointments" element={<AppointmentData />} />
          {/* Add more routes as necessary */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
