import React, { useEffect, useState } from 'react';
import { WikipediaService, type WikimediaImage } from '../services/wikipediaService';

interface ProcessedTextProps {
  text: string;
}

const ProcessedText: React.FC<ProcessedTextProps> = ({ text }) => {
  const [images, setImages] = useState<Record<string, WikimediaImage[]>>({});
  const [loadingWords, setLoadingWords] = useState<Record<string, boolean>>({});

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

      setImages({ ...images, ...newImages });
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
            <div className="image-preview mt-2 grid grid-cols-2 gap-2">
              {loadingWords[word] ? (
                <div className="image-placeholder text-gray-500 text-xs col-span-2">
                  Generating...
                </div>
              ) : images[word]?.length > 0 ? (
                images[word].map((img, i) => (
                  <a
                    key={i}
                    href={img.sourcePage}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={img.title || word}
                  >
                    <img src={img.url} alt={img.title || word} className="word-image" />
                  </a>
                ))
              ) : (
                <div className="image-placeholder text-gray-500 text-xs col-span-2">
                  Loading...
                </div>
              )}
            </div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProcessedText;