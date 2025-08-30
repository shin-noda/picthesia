import React, { useState, useEffect, useRef } from 'react';
import { type WikimediaImage } from '../../services/wikipediaService';
import WordDefinition from '../wordDefinition/WordDefinition';

interface PicsDefWindowProps {
  word: string;
  images: WikimediaImage[] | undefined;
}

interface DefinitionCache {
  [word: string]: string | null;
}

const PicsDefWindow: React.FC<PicsDefWindowProps> = ({ word, images }) => {
  const [definitionCache, setDefinitionCache] = useState<DefinitionCache>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const setCache = (word: string, def: string) => {
    setDefinitionCache((prev) => ({ ...prev, [word]: def }));
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      // If the popup is above viewport, push it down
      if (rect.top < 5) {
        const offset = 5 - rect.top;
        el.style.top = `${el.offsetTop + offset}px`;
      }
    }
  }, []);

  if (!images) {
    return (
      <div className="image-placeholder">
        Generating...
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="image-placeholder">
        No images found
      </div>
    );
  }

  return (
    <div ref={containerRef} className="image-preview">
      {images.map((img, i) => (
        <a
          key={i}
          href={img.sourcePage}
          target="_blank"
          rel="noopener noreferrer"
          title={img.title || word}
        >
          <img src={img.url} alt={img.title || word} className="word-image" />
        </a>
      ))}

      {/* Definition row under images */}
      <div className="definition-text">
        <WordDefinition word={word} cache={definitionCache} setCache={setCache} />
      </div>
    </div>
  );
};

export default PicsDefWindow;