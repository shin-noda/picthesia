import TextForm from '../components/textForm/TextForm';
import ProcessedText from '../components/processedText/ProcessedText';
import './Pages.css';

interface HomeProps {
  submittedText: string;
  setSubmittedText: React.Dispatch<React.SetStateAction<string>>;
  resetCounter: number;
}

const Home = ({ submittedText, setSubmittedText, resetCounter }: HomeProps) => {
  const handleTextSubmit = (text: string) => {
    setSubmittedText(text);
  };

  return (
    <main className="app-main">
      <TextForm onSubmit={handleTextSubmit} resetKey={resetCounter} maxWords={100} />
      <ProcessedText text={submittedText} />
    </main>
  );
};

export default Home;