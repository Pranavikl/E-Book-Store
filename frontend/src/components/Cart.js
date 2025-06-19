import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Shop.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveFromCart = (bookId) => {
    setCartItems(cartItems.filter(item => item.id !== bookId));
  };

  const handleUpdateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === bookId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="shop-container">
      <h2 className="section-title">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Add books from your wishlist or browse our collection!</p>
          <button
            className="action-button add-button"
            onClick={() => navigate('/wishlist')}
            style={{ width: 'auto', padding: '1rem 2rem', margin: '1rem' }}
          >
            Go to Wishlist
          </button>
        </div>
      ) : (
        <>
          <div className="book-grid">
            {cartItems.map(book => (
              <div key={book.id} className="book-card">
                <img src={book.image} alt={book.title} />
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                <p className="price">₹{book.price}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleUpdateQuantity(book.id, book.quantity - 1)}
                    className="quantity-button"
                  >
                    -
                  </button>
                  <span className="quantity">{book.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(book.id, book.quantity + 1)}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
                <p className="subtotal">Subtotal: ₹{book.price * book.quantity}</p>
                <div className="action-buttons">
                  <button
                    className="action-button remove-button"
                    onClick={() => handleRemoveFromCart(book.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
