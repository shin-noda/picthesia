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
            <p>Picthesia transforms plain text into an interactive visual learning experience. Here's how it works:</p>
            <div className="process-steps">
              <div className="step">
                <h3>1. Input Text</h3>
                <p>Type or paste any text you want to explore - from simple sentences to complex paragraphs.</p>
              </div>

              <div className="step">
                <h3>2. Automatic Underlining</h3>
                <p>Each word is automatically underlined in real-time, ready for visual enhancement.</p>
              </div>

              <div className="step">
                <h3>3. Visual Discovery</h3>
                <p>Hover over any underlined word to see a relevant image from our wide-ranging educational sources. If an image isn’t available, a fallback ensures every word gets representation.</p>
              </div>

              <div className="step">
                <h3>4. Enhanced Learning</h3>
                <p>Connect words with visuals to make learning more engaging and memorable.</p>
              </div>

              <div className="step">
                <h3>5. Fusion Feature</h3>
                <p>Picthesia also offers a fun Fusion feature powered by Gemini AI, which combines two words into a creative new word for educational exploration.</p>
              </div>
            </div>
          </section>

          <section>
            <h2>How It Works</h2>
            <ul>
              <li><strong>Text Processing:</strong> Algorithms identify words for enhancement in real-time</li>
              <li><strong>Image Sources:</strong> Access millions of educational images, with reliable fallbacks if needed</li>
              <li><strong>Real-time Privacy:</strong> Text is never stored permanently</li>
            </ul>
          </section>

          <section>
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Accessibility</h3>
                <p>Learning should be available to everyone, regardless of style or background.</p>
              </div>
              <div className="value-item">
                <h3>Innovation</h3>
                <p>We explore new ways to make education more engaging and effective.</p>
              </div>
              <div className="value-item">
                <h3>Informative Content</h3>
                <p>We use trusted sources to ensure educational and informative content.</p>
              </div>
              <div className="value-item">
                <h3>Privacy</h3>
                <p>Your learning journey is private; all text is processed in real-time and not stored.</p>
              </div>
            </div>
          </section>

          <section>
            <h2>Technology</h2>
            <ul>
              <li><strong>Frontend:</strong> React with TypeScript for robust, maintainable code</li>
              <li><strong>APIs:</strong> Educational image sources and Gemini AI for fusion</li>
              <li><strong>Design:</strong> Responsive interface that works on all devices</li>
              <li><strong>Performance:</strong> Optimized for fast, smooth experience</li>
            </ul>
          </section>

          <section>
            <h2>Get Involved</h2>
            <ul>
              <li><strong>Use Picthesia:</strong> Explore your own text visually</li>
              <li><strong>Share Feedback:</strong> Tell us how we can improve</li>
              <li><strong>Spread the Word:</strong> Share with educators and learners</li>
              <li><strong>Stay Updated:</strong> Follow our progress as we enhance features</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;