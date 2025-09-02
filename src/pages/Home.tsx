import { useState } from 'react';
import TextForm from '../components/textForm/TextForm';
import ProcessedText from '../components/processedText/ProcessedText';

const Home = () => {
    const [submittedText, setSubmittedText] = useState('');
    const [resetCounter,] = useState(0);
  
    const handleTextSubmit = (text: string) => {
      setSubmittedText(text);
    };

  return (
    <main className="app-main">
      <TextForm
        onSubmit={handleTextSubmit}
        resetKey={resetCounter}
        maxWords={100}
      />
      <ProcessedText text={submittedText} />
    </main>
  );
};

export default Home;