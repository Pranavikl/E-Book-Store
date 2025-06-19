import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddBook.css';

function AddBook() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    price: '',
    category: '',
    description: ''
  });
  const [coverImage, setCoverImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = ['Fiction', 'Non-Fiction', 'Science', 'Biography', 'Children', 'Fantasy'];

  const validateForm = () => {
    const newErrors = {};
    if (!book.title.trim()) newErrors.title = 'Title is required';
    if (!book.author.trim()) newErrors.author = 'Author is required';
    if (!book.price || isNaN(book.price)) newErrors.price = 'Valid price required';
    if (!book.category) newErrors.category = 'Category is required';
    if (!book.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    for (const key in book) {
      formData.append(key, book[key]);
    }
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      await axios.post('/api/books/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setBook({ title: '', author: '', price: '', category: '', description: '' });
      setCoverImage(null);
      setErrors({});
    } catch (error) {
      alert('Error adding book');
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form" encType="multipart/form-data">
        <input
          type="text"
          placeholder="Enter Title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}

        <input
          type="text"
          placeholder="Enter Author"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />
        {errors.author && <span className="error-text">{errors.author}</span>}

        <input
          type="text"
          placeholder="Enter Price"
          value={book.price}
          onChange={(e) => setBook({ ...book, price: e.target.value })}
        />
        {errors.price && <span className="error-text">{errors.price}</span>}

        <select
          value={book.category}
          onChange={(e) => setBook({ ...book, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span className="error-text">{errors.category}</span>}

        <textarea
          placeholder="Enter Description"
          value={book.description}
          onChange={(e) => setBook({ ...book, description: e.target.value })}
        />
        {errors.description && <span className="error-text">{errors.description}</span>}

        <div className="file-input-container">
          <label className="file-input-label">
            {coverImage ? 'Cover Image Selected' : 'Choose Cover Image (Optional)'}
            <input
              type="file"
              className="file-input"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </label>
        </div>

        <button type="submit" className="submit-button">
          Add Book
        </button>
      </form>

      {showSuccess && (
        <div className="success-popup">
          Book added successfully!
        </div>
      )}
    </div>
  );
}

export default AddBook;
