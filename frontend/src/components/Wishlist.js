import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Shop.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlistItems');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Save wishlist items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const suggestedBooks = [
    {
      id: 1,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      price: 399,
      image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 299,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      price: 349,
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: 449,
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "The Power of Now",
      author: "Eckhart Tolle",
      price: 379,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 7,
      title: "1984",
      author: "George Orwell",
      price: 299,
      image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 8,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 329,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 9,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 359,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const handleAddToWishlist = (book) => {
    if (!wishlistItems.find(item => item.id === book.id)) {
      setWishlistItems([...wishlistItems, book]);
    }
  };

  const handleRemoveFromWishlist = (bookId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== bookId));
  };

  const handleAddToCartClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleAddToCart = () => {
    if (selectedBook) {
      const updatedCart = [...cartItems];
      const existingItem = updatedCart.find(item => item.id === selectedBook.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        updatedCart.push({ ...selectedBook, quantity: 1 });
      }

      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setShowModal(false);
      // Show a success message instead of navigating away
      alert(`"${selectedBook.title}" has been added to your cart!`);
    }
  };

  return (
    <div className="shop-container">
      <h2 className="section-title">Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="empty-state">
          <h3>Your wishlist is empty</h3>
          <p>Add books from our suggestions below!</p>
        </div>
      ) : (
        <div className="book-grid">
          {wishlistItems.map(book => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h4>{book.title}</h4>
              <p>{book.author}</p>
              <p className="price">₹{book.price}</p>
              <div className="action-buttons">
                <button
                  className="action-button remove-button"
                  onClick={() => handleRemoveFromWishlist(book.id)}
                >
                  Remove
                </button>
                <button
                  className="action-button add-button"
                  onClick={() => handleAddToCartClick(book)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className="section-subtitle">Suggested Books</h3>
      <div className="book-grid">
        {suggestedBooks.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            <p className="price">₹{book.price}</p>
            <div className="action-buttons">
              <button
                className="action-button add-button"
                onClick={() => handleAddToWishlist(book)}
              >
                Add to Wishlist
              </button>
              <button
                className="action-button add-button"
                onClick={() => handleAddToCartClick(book)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add to Cart</h3>
            <p>Do you want to add "{selectedBook?.title}" to your cart?</p>
            <div className="modal-buttons">
              <button className="action-button add-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="action-button remove-button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
