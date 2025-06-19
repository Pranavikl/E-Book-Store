import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const featuredBooks = [
    {
      id: 1,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Timeless lessons on wealth, greed, and happiness."
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "An easy & proven way to build good habits & break bad ones."
    },
    {
      id: 3,
      title: "The Alchemist",
      author: "Paulo Coelho",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "A magical story about following your dreams."
    }
  ];
  
  const readingBenefits = [
    {
      id: 1,
      title: "Mental Stimulation",
      description: "Reading is to the mind what exercise is to the body. Studies show that regular reading can slow the progress of Alzheimer's and Dementia by keeping your brain active and engaged. The mental stimulation from reading helps create new neural pathways and strengthens existing ones, improving overall brain function and memory."
    },
    {
      id: 2,
      title: "Stress Reduction",
      description: "In a study at the University of Sussex, researchers found that reading for just six minutes can reduce stress levels by up to 68%. The act of being immersed in a story provides a wonderful escape from daily stressors, allowing your muscles to relax and your heart rate to slow. Many therapists recommend reading as part of treatment for various anxiety disorders."
    },
    {
      id: 3,
      title: "Empathy Development",
      description: "Literary fiction, in particular, has been shown to help readers understand what others are thinking by reading about their perspectives. This ability to understand others' mental states is called 'Theory of Mind' and is crucial for complex social relationships. People who read regularly tend to be more empathetic and better at understanding different viewpoints."
    },
    {
      id: 4,
      title: "Improved Sleep Quality",
      description: "Making reading part of your bedtime ritual signals to your body that it's time to wind down and relax. Unlike screens that emit blue light which disrupts melatonin production, reading a physical book helps you transition to sleep. A Mayo Clinic study found that a consistent reading habit before bed can help people with insomnia and sleep disorders."
    },
    {
      id: 5,
      title: "Vocabulary and Language Mastery",
      description: "The Princeton Review reported that reading deliberately and extensively increases your vocabulary significantly more than talking or direct teaching. The average American knows about 20,000-35,000 words, but regular readers often know 50,000+ words. This expanded vocabulary correlates with higher academic achievement and greater professional success throughout life."
    },
    {
      id: 6,
      title: "Longevity Extension",
      description: "A Yale University study found that people who read books for 30 minutes daily lived an average of two years longer than non-readers. The study, which followed 3,600 participants over 12 years, discovered that book readers had a 20% lower risk of mortality over the study period compared to non-readers or magazine readers. The cognitive engagement involved in reading creates a 'survival advantage.'"
    }
  ];
  
  const storeInfo = {
    name: "BookHaven",
    address: "123 Literary Lane, Bookville, BK 12345",
    phone: "+1 (555) 123-4567",
    helpline: "1-800-BOOK-HELP",
    email: "support@bookhaven.com",
    hours: "Monday-Saturday: 9AM-8PM, Sunday: 10AM-6PM"
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Next Favorite Book</h1>
          <p>Explore our vast collection of books across various genres</p>
          <div className="hero-buttons">
            <Link to="/books" className="btn primary-btn">Browse Books</Link>
          </div>
        </div>
      </div>

      <section className="featured-section">
        <h2>Recommended Books</h2>
        <div className="featured-books">
          {featuredBooks.map(book => (
            <div key={book.id} className="featured-book">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p className="author">{book.author}</p>
              <p className="description">{book.description}</p>
              <Link to="/books" className="view-more">View Details</Link>
            </div>
          ))}
        </div>
        <div className="view-all">
          <Link to="/books" className="btn outline-btn">View All Books</Link>
        </div>
      </section>

      <section className="benefits-section">
        <h2>Why Reading Is Important</h2>
        <div className="benefits-grid">
          {readingBenefits.map(benefit => (
            <div key={benefit.id} className="benefit-card">
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="categories-section">
        <h2>Browse by Category</h2>
        <div className="categories">
          <div className="category-card">
            <h3>Fiction</h3>
            <Link to="/books" className="category-link">Explore</Link>
          </div>
          <div className="category-card">
            <h3>Non-Fiction</h3>
            <Link to="/books" className="category-link">Explore</Link>
          </div>
          <div className="category-card">
            <h3>Self-Help</h3>
            <Link to="/books" className="category-link">Explore</Link>
          </div>
          <div className="category-card">
            <h3>Biography</h3>
            <Link to="/books" className="category-link">Explore</Link>
          </div>
        </div>
      </section>
      
      <section className="contact-section">
        <h2>Visit Our Bookstore</h2>
        <div className="store-info">
          <div className="info-card">
            <h3>Address</h3>
            <p>{storeInfo.address}</p>
          </div>
          <div className="info-card">
            <h3>Contact</h3>
            <p>Phone: {storeInfo.phone}</p>
            <p>Helpline: {storeInfo.helpline}</p>
            <p>Email: {storeInfo.email}</p>
          </div>
          <div className="info-card">
            <h3>Hours</h3>
            <p>{storeInfo.hours}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;