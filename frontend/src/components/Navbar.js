import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          BookStore
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/books" className="nav-link">Books</Link>
          </li>
          <li className="nav-item">
            <Link to="/ebooks" className="nav-link">E-Books</Link>
          </li>
          <li className="nav-item">
            <Link to="/wishlist" className="nav-link">Wishlist</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">Cart</Link>
          </li>
        </ul>
        
        <div className="nav-auth">
          <Link to="/login" className="auth-link">Login</Link>
          <Link to="/signup" className="auth-link signup">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;