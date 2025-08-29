import React, { useState } from 'react';

interface TextFormProps {
  onSubmit: (text: string) => void;
}

const TextForm: React.FC<TextFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
    }
  };

  return (
    <div className="text-form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here... (e.g., Cats dogs cows)"
            className="text-input"
            rows={4}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Generate Picthesia
        </button>
      </form>
    </div>
  );
};

export default TextForm;
