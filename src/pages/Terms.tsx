import { Link } from 'react-router-dom';
import './Pages.css';

const Terms = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <nav className="page-nav">
          <Link to="/" className="back-link">← Back to Picthesia</Link>
        </nav>
        
        <div className="page-header">
          <h1>Terms of Use</h1>
        </div>

        <div className="page-body">
          <section>
            <h2>Acceptance of Terms</h2>
            <p>By accessing and using Picthesia, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree, please do not use this service.</p>
          </section>

          <section>
            <h2>Description of Service</h2>
            <p>Picthesia is an educational tool that transforms text into visual learning experiences by:</p>
            <ul>
              <li>Processing user-submitted text in real-time and underlining individual words</li>
              <li>Providing relevant images from Wikipedia when hovering over underlined words</li>
              <li>Offering fallback images when Wikipedia content is unavailable</li>
              <li>Creating an interactive learning environment for educational purposes</li>
            </ul>
          </section>

          <section>
            <h2>User Responsibilities</h2>
            <p>As a user of Picthesia, you agree to:</p>
            <ul>
              <li>Use the service for educational and lawful purposes only</li>
              <li>Not submit harmful, offensive, or inappropriate content</li>
              <li>Respect intellectual property rights of Wikipedia and other content providers</li>
              <li>Not attempt to disrupt or interfere with the service</li>
              <li>Provide accurate information when using contact forms</li>
            </ul>
          </section>

          <section>
            <h2>Content and Intellectual Property</h2>
            <p>Picthesia respects intellectual property rights:</p>
            <ul>
              <li><strong>Wikipedia Content:</strong> Images and content from Wikipedia are subject to their respective licenses and terms</li>
              <li><strong>User Content:</strong> Text you submit is processed in real-time and not permanently stored</li>
              <li><strong>Service Content:</strong> Picthesia's interface and functionality are protected by applicable copyright laws</li>
              <li><strong>Third-Party Services:</strong> External services have their own terms of use</li>
            </ul>
          </section>

          <section>
            <h2>Service Availability</h2>
            <p>We strive to maintain high service availability, but Picthesia is provided "as is" without warranties:</p>
            <ul>
              <li>Service may be temporarily unavailable due to maintenance or technical issues</li>
              <li>We are not responsible for interruptions in Wikipedia API services</li>
              <li>Image availability depends on Wikipedia's content and our fallback services</li>
              <li>We reserve the right to modify or discontinue the service with notice</li>
            </ul>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>Picthesia and its operators are not liable for:</p>
            <ul>
              <li>Any damages arising from the use or inability to use the service</li>
              <li>Content accuracy or appropriateness of images provided</li>
              <li>Interruptions or technical issues with third-party services</li>
              <li>Educational outcomes or learning results</li>
              <li>Indirect, incidental, or consequential damages</li>
            </ul>
          </section>

          <section>
            <h2>Changes to Terms</h2>
            <p>We may update these terms from time to time:</p>
            <ul>
              <li>Changes will be posted on this page with updated dates</li>
              <li>Continued use of the service constitutes acceptance of new terms</li>
              <li>Major changes will be communicated through the service or email</li>
              <li>Users are responsible for reviewing terms regularly</li>
            </ul>
          </section>

          <section>
            <h2>Data Privacy Note</h2>
            <p>Picthesia processes your text input in real-time and does not permanently store personal information. By using the service, you acknowledge that:</p>
            <ul>
              <li>Requests to access or correct submitted text are not applicable</li>
              <li>Temporary data is used solely for generating images and interactive content</li>
              <li>All external services have their own privacy and terms policies</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;