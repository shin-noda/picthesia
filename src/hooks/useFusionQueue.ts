import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { GeminiService } from "../services/GeminiService";
import { WikipediaService } from "../services/WikiService";
import type { BallData } from "../components/toggleableBouncingContainer/types";

interface FusionItem {
  word1: string;
  word2: string;
  id: string; // placeholder ball id
}

export const useFusionQueue = (setBalls: Dispatch<SetStateAction<BallData[]>>) => {
  const [queue, setQueue] = useState<FusionItem[]>([]);

  const enqueueFusion = (word1: string, word2: string, id: string) => {
    setQueue((prev) => [...prev, { word1, word2, id }]);
  };

  useEffect(() => {
    if (queue.length === 0) return;

    const processQueue = async () => {
      const q = [...queue];
      setQueue([]);

      for (const item of q) {
        try {
          // 1. Get fused word from Gemini
          const fusedWord = await GeminiService.getFusionWord(item.word1, item.word2);
          if (!fusedWord) continue;

          const trimmedWord = fusedWord.trim();

          // 2. Fetch an image for this fused word
          const images = await WikipediaService.searchImages(trimmedWord);
          const imgUrl = images.length > 0 ? images[0].url : undefined;

          // 3. Update placeholder ball with both word and image
          setBalls((prev) =>
            prev.map((b) =>
              b.id === item.id ? { ...b, word: trimmedWord, imgUrl } : b
            )
          );
        } catch (error) {
          console.error(
            `Failed to fuse "${item.word1}" + "${item.word2}":`,
            error
          );
        }
      }
    };

    processQueue();
  }, [queue, setBalls]);

  return { enqueueFusion };
};
