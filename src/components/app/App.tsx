import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import Home from '../../pages/Home';
import Fusion from '../../pages/Fusion';
import Privacy from '../../pages/Privacy';
import Terms from '../../pages/Terms';
import About from '../../pages/About';
import Contact from '../../pages/Contact';

// components
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

// css
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">

        <Header />

        <Navbar
          links={[
            { label: "Home", to: "/" },
            { label: "Fusion Balls", to: "/fusion" },
          ]}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fusion" element={<Fusion />} />
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