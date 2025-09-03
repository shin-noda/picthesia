import { Link } from 'react-router-dom';
import './Pages.css';

const Privacy = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <nav className="page-nav">
          <Link to="/" className="back-link">← Back to Picthesia</Link>
        </nav>
        
        <div className="page-header">
          <h1>Privacy Policy</h1>
        </div>

        <div className="page-body">
          <section>
            <h2>Information We Collect</h2>
            <p>Picthesia is committed to protecting your privacy. We collect minimal information necessary to provide our service:</p>
            <ul>
              <li><strong>Text Input:</strong> The text you submit to generate images (processed in real-time, not stored permanently)</li>
              <li><strong>Usage Data:</strong> How you interact with our service</li>
              <li><strong>Technical Data:</strong> Browser type, device information, and IP address</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Process your text and generate relevant images</li>
              <li>Improve our service and user experience</li>
              <li>Ensure security and prevent abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <p>Picthesia integrates with:</p>
            <ul>
              <li><strong>Wikipedia API:</strong> To fetch educational images</li>
              <li><strong>Picsum Photos:</strong> For fallback images when Wikipedia doesn't have relevant content</li>
              <li><strong>Gemini API:</strong> Used to generate creative word combinations and fusions for enhanced learning experiences</li>
            </ul>
            <p>These services have their own privacy policies and data handling practices.</p>
          </section>

          <section>
            <h2>Data Storage and Security</h2>
            <p>We implement appropriate security measures to protect your information:</p>
            <ul>
              <li>Text input is processed in real-time and not permanently stored</li>
              <li>We use HTTPS encryption for all data transmission</li>
              <li>Access to our systems is restricted to authorized personnel only</li>
            </ul>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Understand how your information is used</li>
              <li>Request deletion of any temporary data associated with your usage</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p>Since Picthesia does not permanently store personal information, requests for access or correction are not applicable.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;