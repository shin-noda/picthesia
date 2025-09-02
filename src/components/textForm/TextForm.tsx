import React, { useState, useEffect } from 'react';
import './TextForm.css';

interface TextFormProps {
  onSubmit: (text: string) => void;
  resetKey?: number;            // prop to reset the form when it changes
  maxWords?: number;            // allows parent to control max words
  submitLabel?: string;         // allows parent to set button text
  variant?: 'home' | 'fusion';  // style variant
}

const TextForm = ({
  onSubmit,
  resetKey,
  maxWords = 100,
  submitLabel = 'Generate Picthesia', // default value
  variant = 'home',                   // default variant
}: TextFormProps) => {
  const [text, setText] = useState('');

  // Reset text when resetKey changes
  useEffect(() => {
    setText('');
  }, [resetKey]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const words = inputText.split(/\s+/); // split by spaces, tabs, newlines
    if (words.filter(Boolean).length <= maxWords) {
      setText(inputText);
    } else {
      setText(words.slice(0, maxWords).join(' '));
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
    <div className={`text-form ${variant}`}>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <textarea
            value={text}
            onChange={handleChange}
            placeholder={`Enter your text here... (max ${maxWords} words)`}
            className="text-input"
            rows={4}
            required
          />
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
            {wordCount}/{maxWords} words
          </div>
        </div>
        <button type="submit" className={`submit-button ${variant}`}>
          {submitLabel}
        </button>
      </form>
    </div>
  );
};

export default TextForm;