import React, { useEffect, useState } from 'react';
import { WikipediaService, type WikimediaImage } from '../services/wikipediaService';

import PicsDefWindow from './PicsDefWindow';

interface ProcessedTextProps {
  text: string;
}

// Definition cache type
interface DefinitionCache {
  [word: string]: string | null;
}

const ProcessedText: React.FC<ProcessedTextProps> = ({ text }) => {
  const [images, setImages] = useState<Record<string, WikimediaImage[]>>({});
  const [loadingWords, setLoadingWords] = useState<Record<string, boolean>>({});
  const [definitionCache, setDefinitionCache] = useState<DefinitionCache>({});

  // Helper to update cache
  const setCache = (word: string, def: string) => {
    setDefinitionCache((prev) => ({ ...prev, [word]: def }));
  };

  useEffect(() => {
    if (!text) return;

    const words = text.split(/\s+/);

    const fetchImages = async () => {
      const newImages: Record<string, WikimediaImage[]> = {};
      const newLoading: Record<string, boolean> = {};

      await Promise.all(
        words.map(async (word) => {
          if (!word) return;

          newLoading[word] = true;
          setLoadingWords({ ...newLoading });

          try {
            const imgs = await WikipediaService.searchImages(word, 4);
            newImages[word] = imgs;
          } catch (err) {
            console.error('Error fetching images for', word, err);
            newImages[word] = [];
          } finally {
            newLoading[word] = false;
            setLoadingWords({ ...newLoading });
          }
        })
      );

      setImages((prev) => ({ ...prev, ...newImages }));
    };

    fetchImages();
  }, [text]);

  if (!text) return null;

  const words = text.split(/\s+/);

  return (
    <div className="processed-text">
      <h3>Your Picthesia Result:</h3>
      <div className="text-output flex flex-wrap gap-4">
        {words.map((word, index) => (
          <span key={index} className="word-container flex flex-col items-center">
            <span className="underlined-word font-semibold underline">{word}</span>
            <PicsDefWindow word={word} images={images[word]} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProcessedText;