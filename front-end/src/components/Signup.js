import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Assuming you have a CSS file for styling

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // New success state
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess(false);

  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      formData,
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000); // Shorter delay
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Registration failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      {success && <div className="success-message">Registration successful! Redirecting...</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="6"
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner"></span> Processing...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </div>
  );
}

export default Signup;