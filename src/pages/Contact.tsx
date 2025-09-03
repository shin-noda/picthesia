import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/xldwwyqq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: new URLSearchParams(formData)
      });

      if (response.ok) {
        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      } else {
        alert("Oops! There was a problem submitting your form.");
      }
    } catch (err) {
      console.error(err);
      alert("Oops! There was a problem submitting your form.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <nav className="page-nav">
          <Link to="/" className="back-link">← Back to Picthesia</Link>
        </nav>
        
        <div className="page-header">
          <h1>Contact Us</h1>
        </div>

        <div className="page-body">
          <section>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  rows={5}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </section>

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="faq-section">
              <div className="faq-grid">
                <div className="faq-item">
                  <h3>How does Picthesia work?</h3>
                  <p>Our system automatically underlines each word and fetches relevant images from reliable sources in real-time. Your text is never stored permanently.”</p>
                </div>
                
                <div className="faq-item">
                  <h3>Is my text stored permanently?</h3>
                  <p>No, we process your text in real-time and don't permanently store it. Your privacy is important to us.</p>
                </div>
                
                <div className="faq-item">
                  <h3>Can I use this for educational purposes?</h3>
                  <p>Absolutely! Picthesia is designed specifically for education and learning. It's perfect for students, teachers, and anyone wanting to make text more visual.</p>
                </div>
                
                <div className="faq-item">
                  <h3>What if no image is found for a word?</h3>
                  <p>We use a vast collection of images from trusted sources first, and if no relevant image is found, we provide a fallback to ensure every word gets visual representation.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;