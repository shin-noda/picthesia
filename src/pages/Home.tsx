import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import TextForm from '../components/textForm/TextForm';
import ProcessedText from '../components/processedText/ProcessedText';

const Home: React.FC = () => {
  const location = useLocation();
  const [submittedText, setSubmittedText] = useState('');
  const [resetCounter, setResetCounter] = useState(0);

  const handleTextSubmit = (text: string) => {
    setSubmittedText(text);
  };

  const handleHeaderClick = () => {
    setSubmittedText('');
    setResetCounter((prev) => prev + 1);
  };

  useEffect(() => {
    if (location.pathname !== '/') {
      setSubmittedText('');
      setResetCounter((prev) => prev + 1);
    }
  }, [location.pathname]);

  return (
    <>
      <Header onClick={handleHeaderClick} />
      <main className="app-main">
        <TextForm onSubmit={handleTextSubmit} resetKey={resetCounter} />
        <ProcessedText text={submittedText} />
      </main>
    </>
  );
};

export default Home;