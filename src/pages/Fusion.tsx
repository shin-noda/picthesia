import { useState, useEffect } from "react";

// components
import TextForm from "../components/textForm/TextForm";
import ToggleableBouncingContainer from "../components/toggleableBouncingContainer/ToggleableBouncingContainer";
import FusionBackButton from "../components/fusionBackButton/FusionBackButton";

// services
import { WikipediaService, type WikimediaImage } from "../services/WikiService";

interface FusionProps {
  submittedText: string;
  setSubmittedText: (text: string) => void;
  resetCounter: number;
}

const Fusion = ({ submittedText, setSubmittedText, resetCounter }: FusionProps) => {
  const [images, setImages] = useState<Record<string, WikimediaImage[]>>({});
  const [, setLoadingWords] = useState<Record<string, boolean>>({});
  const [inputVisible, setInputVisible] = useState(true); // track if input should be shown

  // Reset images, loading, and submitted text whenever resetCounter changes
  useEffect(() => {
    setImages({});
    setLoadingWords({});
    setSubmittedText(""); 
    setInputVisible(true);
  }, [resetCounter, setSubmittedText]);

  // Handle text submission
  const handleTextSubmit = (text: string) => {
    if (!text.trim()) return;
    setSubmittedText(text);
    setInputVisible(false); // hide input permanently until back
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
      {/* Show input only if visible */}
      {inputVisible && (
        <TextForm
          onSubmit={handleTextSubmit}
          resetKey={resetCounter}
          maxWords={8}
          submitLabel="Generate Fuse Balls"
          variant="fusion"
        />
      )}

      {/* Show balls container if text is submitted */}
      {submittedText && (
        <ToggleableBouncingContainer
          words={words}
          images={images}
        />
      )}

      {/* Show Back button if input is hidden */}
      {!inputVisible && (
        <FusionBackButton
          onBack={() => {
            setInputVisible(true);
            setSubmittedText("");
            setImages({});
          }}
        />
      )}
    </main>
  );
};

export default Fusion;