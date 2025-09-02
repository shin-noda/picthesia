import { useState, useEffect } from "react";
import TextForm from "../components/textForm/TextForm";
import ToggleableBouncingContainer from "../components/toggleableBouncingContainer/ToggleableBouncingContainer";
import { WikipediaService, type WikimediaImage } from "../services/WikiService";

const Fusion = () => {
  const [submittedText, setSubmittedText] = useState("");
  const [resetCounter, ] = useState(0);
  const [images, setImages] = useState<Record<string, WikimediaImage[]>>({});
  const [, setLoadingWords] = useState<Record<string, boolean>>({});

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
      />

      {submittedText && (
        <ToggleableBouncingContainer words={words} images={images} />
      )}
    </main>
  );
};

export default Fusion;