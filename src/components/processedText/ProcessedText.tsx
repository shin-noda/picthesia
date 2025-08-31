import React, { useEffect, useState } from 'react';
import { WikipediaService, type WikimediaImage } from '../../services/WikiService';
import PicsDefWindow from '../picsDefWindow/PicsDefWindow';
import ToggleableBouncingContainer from '../toggleableBouncingContainer/ToggleableBouncingContainer';
import './ProcessedText.css';

interface ProcessedTextProps {
  text: string;
}

const ProcessedText: React.FC<ProcessedTextProps> = ({ text }) => {
  const [images, setImages] = useState<Record<string, WikimediaImage[]>>({});
  const [, setLoadingWords] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!text) {
      // Clear state if text is empty (e.g., after navigating away)
      setImages({});
      setLoadingWords({});
      return;
    }

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
  }, [text]); // Only runs when the text prop changes

  if (!text) return null;

  const words = text.split(/\s+/);

  return (
    <>
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

      <ToggleableBouncingContainer words={words} images={images} />
    </>
  );
};

export default ProcessedText;