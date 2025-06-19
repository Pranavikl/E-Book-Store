import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Here you would typically make an API call to register the user
    // For now, we'll just show a success message
    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <div className="auth-container signup-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Create Account</h2>
        {error && <div className="error-text">{error}</div>}
        
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>

        <div className="auth-links">
          <a onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
            Already have an account? Login
          </a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
