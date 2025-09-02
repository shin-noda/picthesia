import React, { useState, useEffect } from 'react';
import './TextForm.css';

interface TextFormProps {
  onSubmit: (text: string) => void;
  // prop to reset the form when it changes
  resetKey?: number;
}

const MAX_WORDS = 100;

const TextForm: React.FC<TextFormProps> = ({ onSubmit, resetKey }) => {
  const [text, setText] = useState('');

  // whenever resetKey changes, clear the input
  useEffect(() => {
    setText('');
  }, [resetKey]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const words = inputText.split(/\s+/); // split by spaces, tabs, newlines
    if (words.filter(Boolean).length <= MAX_WORDS) {
      setText(inputText);
    } else {
      // optionally truncate to max words
      setText(words.slice(0, MAX_WORDS).join(' '));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="text-form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <textarea
            value={text}
            onChange={handleChange}
            placeholder={`Enter your text here... (max ${MAX_WORDS} words)`}
            className="text-input"
            rows={4}
            required
          />
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
            {wordCount}/{MAX_WORDS} words
          </div>
        </div>
        <button type="submit" className="submit-button">
          Generate Picthesia
        </button>
      </form>
    </div>
  );
};

export default TextForm;