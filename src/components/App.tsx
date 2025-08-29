import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TextForm from './TextForm';
import ProcessedText from './ProcessedText';
import Footer from './Footer';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import About from '../pages/About';
import Contact from '../pages/Contact';
import './App.css';

const App: React.FC = () => {
  const [submittedText, setSubmittedText] = useState<string>('');

  const handleTextSubmit = (text: string) => {
    setSubmittedText(text);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <header className="app-header">
                <h1>Picthesia</h1>
                <p>Transform text into visual learning with images</p>
              </header>
              
              <main className="app-main">
                <TextForm onSubmit={handleTextSubmit} />
                <ProcessedText text={submittedText} />
              </main>
            </>
          } />
          
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
