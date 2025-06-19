import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookList.css';

function BookList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const famousBooks = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', price: 299, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', price: 349, image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', price: 299, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 4, title: 'Think and Grow Rich', author: 'Napoleon Hill', genre: 'Self-Help', price: 349, image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 5, title: 'The Power of Now', author: 'Eckhart Tolle', genre: 'Spirituality', price: 379, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 6, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Development', price: 499, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 7, title: 'Nature Journal', author: 'National Geographic', genre: 'Science Journal', price: 259, image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 8, title: 'Psychology Today', author: 'Sussex Publishers', genre: 'Academic Journal', price: 199, image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" }
  ];

  const readingBenefits = [
    {
      title: 'Mental Stimulation',
      description: 'Reading is to the mind what exercise is to the body. It improves memory, critical thinking, and prevents cognitive decline by keeping your brain active and engaged.'
    },
    {
      title: 'Stress Reduction',
      description: 'Studies show that reading for just 6 minutes can reduce stress levels by up to 68%. It lowers heart rate and eases muscle tension better than music or walking.'
    },
    {
      title: 'Knowledge and Vocabulary',
      description: 'The average adult has a vocabulary of 20,000-35,000 words. Regular readers can learn up to 15 new words per day, potentially expanding their vocabulary by 5,475 words annually.'
    },
    {
      title: 'Better Sleep Quality',
      description: 'Reading a physical book before bed can improve sleep quality by 42%. The blue light from screens disrupts sleep, making traditional books the better bedtime choice.'
    },
    {
      title: 'Enhanced Empathy',
      description: 'Literary fiction readers are 23% better at understanding others\'s emotions. Reading stories about different cultures and experiences broadens perspective and builds emotional intelligence.'
    },
    {
      title: 'Career Success',
      description: '85% of successful people read two or more self-improvement or educational books per month. Reading regularly correlates with higher income and career advancement.'
    }
  ];

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

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
      navigate('/cart');
    }
  };

  const filteredBooks = famousBooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="booklist-container">
      <div className="hero-section">
        <h1>Discover Your Next Adventure</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title, author, or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <section className="famous-books-section">
        <h2>Featured Books</h2>
        <div className="books-grid">
          {filteredBooks.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <span className="genre-tag">{book.genre}</span>
              <p className="price">₹{book.price}</p>
              <div className="action-buttons">
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
      </section>

      <section className="reading-benefits-section">
        <h2>Why Reading Matters</h2>
        <div className="benefits-grid">
          {readingBenefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

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
}

export default BookList;
