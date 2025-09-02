import { useState, useEffect } from "react";
import TextForm from "../components/textForm/TextForm";
import ToggleableBouncingContainer from "../components/toggleableBouncingContainer/ToggleableBouncingContainer";
import { WikipediaService, type WikimediaImage } from "../services/WikiService";

interface FusionProps {
  submittedText: string;
  setSubmittedText: (text: string) => void;
  resetCounter: number;
}

const Fusion = ({ submittedText, setSubmittedText, resetCounter }: FusionProps) => {
  const [images, setImages] = useState<Record<string, WikimediaImage[]>>({});
  const [, setLoadingWords] = useState<Record<string, boolean>>({});

  // Reset images and loading whenever resetCounter changes
  useEffect(() => {
    setImages({});
    setLoadingWords({});
    setSubmittedText(""); // Clear text when resetCounter increments
  }, [resetCounter, setSubmittedText]);

  const handleTextSubmit = (text: string) => {
    setSubmittedText(text);
  };

  // Fetch images whenever submittedText changes
  useEffect(() => {
    if (!submittedText) {
      setImages({});
      setLoadingWords({});
      return;
    }

    const words = submittedText.split(/\s+/);
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
            console.error("Error fetching images for", word, err);
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
  }, [submittedText]);

  const words = submittedText.split(/\s+/);

  return (
    <main className="app-main">
      <TextForm
        onSubmit={handleTextSubmit}
        resetKey={resetCounter}
        maxWords={16}
        submitLabel={"Generate Fuse Balls"}
        variant={'fusion'}
      />

      {submittedText && (
        <ToggleableBouncingContainer words={words} images={images} />
      )}
    </main>
  );
};

export default Fusion;