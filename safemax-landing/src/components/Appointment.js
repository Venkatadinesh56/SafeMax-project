import React, { useState } from 'react';
import axios from 'axios';
import './Appointmentdata.css';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    message: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    try {
      const response = await axios.post('http://localhost:5001/api/appointments', formData);
      alert(response.data.message);
      
      // Reset the form fields
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        message: ''
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);  // Show the error message from the server
      } else {
        setErrorMessage('Failed to book appointment');
      }
    }
  };

  return (
    <section id="Appointment" className="Appointment">
      <h2>Appointment Booking</h2>
      {errorMessage && <p style={{ color: 'yellow' }}>{errorMessage}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name} 
          required 
          onChange={handleChange} 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email} 
          required 
          onChange={handleChange} 
        />
        <input 
          type="date" 
          name="date" 
          placeholder="Select the date" 
          value={formData.date} 
          required 
          onChange={handleChange} 
        />
        <input 
          type="time" 
          name="time" 
          placeholder="Select the time" 
          value={formData.time} 
          required 
          onChange={handleChange} 
        />
        <textarea 
          name="message" 
          placeholder="Your Message" 
          value={formData.message} 
          required 
          onChange={handleChange}
        ></textarea> 
        <button type="submit">Book Appointment</button>
      </form>
    </section>
  );
};

export default Appointment;
