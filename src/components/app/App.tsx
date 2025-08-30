import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TextForm from '../textForm/TextForm';
import ProcessedText from '../processedText/ProcessedText';
import Footer from '../footer/Footer';
import Privacy from '../../pages/Privacy';
import Terms from '../../pages/Terms';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import './App.css';

// Keep Home simple — no need for useLocation inside it anymore
const Home: React.FC<{ submittedText: string; onSubmit: (text: string) => void }> = ({ submittedText, onSubmit }) => {
  return (
    <>
      <header className="app-header">
        <h1>Picthesia</h1>
        <p>Transform text into visual learning with images</p>
      </header>
      <main className="app-main">
        <TextForm onSubmit={onSubmit} />
        <ProcessedText text={submittedText} />
      </main>
    </>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [submittedText, setSubmittedText] = useState<string>('');

  const handleTextSubmit = (text: string) => {
    setSubmittedText(text);
  };

  // Clear submittedText whenever the route changes away from home
  useEffect(() => {
    if (location.pathname !== '/') {
      setSubmittedText('');
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home submittedText={submittedText} onSubmit={handleTextSubmit} />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

const App: React.FC = () => (
  <Router>
    <div className="app">
      <AppContent />
      <Footer />
    </div>
  </Router>
);

export default App;