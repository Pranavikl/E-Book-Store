import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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

    // Here you would typically make an API call to authenticate the user
    // For now, we'll just show a success message
    alert('Login successful!');
    navigate('/');
  };

  return (
    <div className="auth-container login-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Welcome Back</h2>
        {error && <div className="error-text">{error}</div>}
        
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <div className="auth-links">
          <a onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer' }}>
            Forgot Password?
          </a>
          <a onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>
            Don't have an account? Sign up
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;