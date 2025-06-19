import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 E-Book Store</h1>
        <p>Find, explore, and buy your favorite books online.</p>
        <nav>
          <a href="#books">Browse Books</a> | <a href="#login">Login</a> | <a href="#signup">Sign Up</a>
        </nav>
      </header>

      <main>
        <section id="books">
          <h2>Featured Books</h2>
          <div className="book-list">
            <div className="book-card">
              <h3>The Great Gatsby</h3>
              <p>by F. Scott Fitzgerald</p>
            </div>
            <div className="book-card">
              <h3>1984</h3>
              <p>by George Orwell</p>
            </div>
            <div className="book-card">
              <h3>Atomic Habits</h3>
              <p>by James Clear</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 E-Book Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
