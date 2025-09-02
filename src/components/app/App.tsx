import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import Home from '../../pages/Home';
import Fusion from '../../pages/Fusion';
import Privacy from '../../pages/Privacy';
import Terms from '../../pages/Terms';
import About from '../../pages/About';
import Contact from '../../pages/Contact';

// components
import ScrollToTop from '../scrollToTop/ScrollToTop';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

// css
import './App.css';
import { useState } from 'react';

const App = () => {
  const [submittedText, setSubmittedText] = useState('');
  const [resetCounter, setResetCounter] = useState(0);

  const handleReset = () => {
    setSubmittedText('');
    setResetCounter(prev => prev + 1); // triggers TextForm reset
  };

  return (
    <Router>
      {/* Make the page scroll to the top */}
      <ScrollToTop />

      <div className="app">
        <Header onReset={handleReset} />

        <Navbar
          links={[
            { label: "Home", to: "/" },
            { label: "Fusion Balls", to: "/fusion" },
          ]}
          onReset={handleReset}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                submittedText={submittedText}
                setSubmittedText={setSubmittedText}
                resetCounter={resetCounter}
              />
            }
          />
          
          <Route
            path="/fusion"
            element={
              <Fusion
                submittedText={submittedText}
                setSubmittedText={setSubmittedText}
                resetCounter={resetCounter}
              />
            }
          />

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