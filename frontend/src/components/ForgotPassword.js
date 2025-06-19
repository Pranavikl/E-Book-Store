import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // Here you would typically make an API call to send reset email
      // For now, we'll just show a success message
      setMessage('Password reset link has been sent to your email!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              placeholder="Enter your registered email"
            />
          </div>

          <button type="submit" className="auth-button">Send Reset Link</button>

          <div className="auth-links">
            <p>
              Remember your password?{' '}
              <span onClick={() => navigate('/login')} className="link">
                Back to Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;