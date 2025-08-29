import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const Contact: React.FC = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log the form data
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <nav className="page-nav">
          <Link to="/" className="back-link">← Back to Picthesia</Link>
        </nav>
        
        <div className="page-header">
          <h1>Contact Us</h1>
          <p className="tagline">Get in touch with our team</p>
        </div>

        <div className="page-body">
          <section>
            <h2>Get in Touch</h2>
            <div className="contact-grid">
              <div className="contact-methods">
                <div className="contact-method">
                  <h3>General Inquiries</h3>
                  <p>hello@picthesia.com</p>
                </div>
                <div className="contact-method">
                  <h3>Technical Support</h3>
                  <p>support@picthesia.com</p>
                </div>
                <div className="contact-method">
                  <h3>Partnerships</h3>
                  <p>partnerships@picthesia.com</p>
                </div>
              </div>
              
              <div className="response-time">
                <h3>Response Time</h3>
                <p>We typically respond within 24-48 hours during business days.</p>
              </div>
            </div>
          </section>

          <section>
            <h2>Send us a Message</h2>
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
                  <p>Simply type or paste text, and our AI will underline each word. Hover over any underlined word to see a relevant image from Wikipedia!</p>
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
                  <p>We use Wikipedia's vast image database first, and if no relevant image is found, we provide a fallback image to ensure every word gets visual representation.</p>
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
