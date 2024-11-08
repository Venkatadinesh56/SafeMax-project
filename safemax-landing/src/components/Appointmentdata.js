// src/components/AppointmentData.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentData = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch appointments only if authenticated
      const fetchAppointments = async () => {
        try {
          const response = await axios.get('http://localhost:5001/api/appointments');
          setAppointments(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch appointments');
          setLoading(false);
        }
      };
      fetchAppointments();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (username === 'Admin' && password === 'password') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid username or password');
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await axios.put(`http://localhost:5001/api/appointments/${appointmentId}`, {
        status: newStatus,
      });
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (err) {
      setError('Failed to update status');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <h2 style={{color:"green"}}>Admin Login</h2>
        {authError && <div className="error">{authError}</div>}
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button style={{ width: "100%" }} onClick={handleLogin}>Login</button>
        </div>
    );
  }

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="appointment-data">
      <h2>Appointment Data</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.name}</td>
              <td>{appointment.email}</td>
              <td>{new Date(appointment.date).toLocaleDateString()}</td>
              <td>{appointment.time}</td>
              <td>{appointment.message}</td>
              <td>
                <select
                  value={appointment.status}
                  onChange={(e) =>
                    handleStatusChange(appointment._id, e.target.value)
                  }
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentData;
