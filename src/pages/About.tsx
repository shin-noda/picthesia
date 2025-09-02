import { Link } from 'react-router-dom';
import './Pages.css';

const About = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <nav className="page-nav">
          <Link to="/" className="back-link">← Back to Picthesia</Link>
        </nav>
        
        <div className="page-header">
          <h1>About Picthesia</h1>
        </div>

        <div className="page-body">
          <section>
            <h2>Our Mission</h2>
            <p>Picthesia was born from a simple yet powerful idea: what if every word could instantly become visual? We believe that learning should be engaging, accessible, and memorable. By combining text with relevant images, we're making education more visual, one word at a time.</p>
          </section>

          <section>
            <h2>What We Do</h2>
            <p>Picthesia is an innovative educational tool that transforms plain text into an interactive visual learning experience. Here's how it works:</p>
            <div className="process-steps">
              <div className="step">
                <h3>1. Input Text</h3>
                <p>Simply type or paste any text you want to learn about - from simple sentences to complex paragraphs.</p>
              </div>
              <div className="step">
                <h3>2. Automatic Processing</h3>
                <p>Our system automatically underlines each word in real-time, preparing it for visual enhancement.</p>
              </div>
              <div className="step">
                <h3>3. Visual Discovery</h3>
                <p>Hover over any underlined word to instantly see relevant images from Wikipedia's vast knowledge base.</p>
              </div>
              <div className="step">
                <h3>4. Enhanced Learning</h3>
                <p>Connect words with visual representations, making learning more engaging and memorable.</p>
              </div>
            </div>
          </section>

          <section>
            <h2>How It Works</h2>
            <p>Our technology seamlessly integrates multiple services to create a smooth learning experience:</p>
            <ul>
              <li><strong>Text Processing:</strong> Advanced algorithms identify and prepare individual words for enhancement in real-time</li>
              <li><strong>Wikipedia Integration:</strong> Direct access to millions of educational images and resources</li>
              <li><strong>Smart Fallbacks:</strong> Reliable image sources when Wikipedia content isn't available</li>
              <li><strong>Real-time Privacy:</strong> User text is never permanently stored and remains private</li>
            </ul>
          </section>

          <section>
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Accessibility</h3>
                <p>Education should be available to everyone, regardless of learning style or background.</p>
              </div>
              <div className="value-item">
                <h3>Innovation</h3>
                <p>We constantly explore new ways to make learning more engaging and effective.</p>
              </div>
              <div className="value-item">
                <h3>Quality</h3>
                <p>We partner with reliable sources like Wikipedia to ensure accurate, high-quality content.</p>
              </div>
              <div className="value-item">
                <h3>Privacy</h3>
                <p>Your learning journey is private - all text is processed in real-time and never stored.</p>
              </div>
            </div>
          </section>

          <section>
            <h2>Technology</h2>
            <p>Picthesia is built with modern, reliable technologies:</p>
            <ul>
              <li><strong>Frontend:</strong> React with TypeScript for robust, maintainable code</li>
              <li><strong>APIs:</strong> Wikipedia MediaWiki API for comprehensive image access</li>
              <li><strong>Design:</strong> Responsive design that works on all devices</li>
              <li><strong>Performance:</strong> Optimized for fast, smooth user experience</li>
            </ul>
          </section>

          <section>
            <h2>Get Involved</h2>
            <p>We're passionate about making education better for everyone. Here's how you can be part of our journey:</p>
            <ul>
              <li><strong>Use Picthesia:</strong> Try it with your own text and see how it enhances your learning</li>
              <li><strong>Share Feedback:</strong> Tell us how we can improve and what features you'd like to see</li>
              <li><strong>Spread the Word:</strong> Share Picthesia with educators, students, and learners</li>
              <li><strong>Stay Updated:</strong> Follow our progress as we add new features and improvements</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;