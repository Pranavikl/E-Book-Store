import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Shop.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    paymentMethod: 'card'
  });

  const paymentOptions = [
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'upi', label: 'UPI Payment' },
    { value: 'netbanking', label: 'Net Banking' },
    { value: 'cod', label: 'Cash on Delivery' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmOrder = () => {
    localStorage.removeItem('cartItems');
    navigate('/');
  };

  return (
    <div className="shop-container">
      <div className="checkout-form-container glass-morphism">
        <h2 className="section-title">Checkout</h2>
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h3>Shipping Address</h3>
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Complete Address"
                required
                className="form-input"
                rows="3"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="PIN Code"
                  required
                  pattern="[0-9]{6}"
                  title="Please enter a valid 6-digit PIN code"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Payment Method</h3>
            <div className="form-group">
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
                className="form-input"
              >
                {paymentOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="checkout-button glass-morphism">
            Confirm Order
          </button>
        </form>
      </div>

      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal glass-morphism">
            <h3>Order Confirmed! 🎉</h3>
            <p>Thank you for shopping with us! Your order has been successfully placed.</p>
            <p>We'll send you an email with the order details and tracking information.</p>
            <button 
              className="action-button add-button glass-morphism"
              onClick={handleConfirmOrder}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;