import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { GeminiService } from "../services/GeminiService";
import { WikipediaService } from "../services/WikiService";
import type { BallData, FusionItem } from "../components/toggleableBouncingContainer/types";

export const useFusionQueue = (
  setBalls: Dispatch<SetStateAction<BallData[]>>,
  setFusionList?: Dispatch<SetStateAction<FusionItem[]>>
) => {
  const [queue, setQueue] = useState<FusionItem[]>([]);

  // Set to track completed fusions
  const completedFusionSetRef = useState<Set<string>>(() => new Set())[0];

  // Add a fusion task to the queue and placeholder to Fusion List
  const enqueueFusion = (word1: string, word2: string, id: string) => {
    // 1. Add placeholder to Fusion List immediately (if not already there)
    if (setFusionList) {
      setFusionList((prev) => {
        const idx = prev.findIndex(f => f.id === id);
        if (idx === -1) {
          return [...prev, { word1, word2, id }];
        }
        return prev;
      });
    }

    // 2. Add to internal queue
    setQueue((prev) => [...prev, { word1, word2, id }]);
  };

  // Process the fusion queue asynchronously
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

          // 3. Update placeholder ball with actual word and image
          setBalls((prev) =>
            prev.map((b) =>
              b.id === item.id ? { ...b, word: trimmedWord, imgUrl } : b
            )
          );

          // 4. Update Fusion List with the actual word & image
          if (setFusionList) {
            setFusionList((prev) =>
              prev.map((f) =>
                f.id === item.id
                  ? { ...f, resultWord: trimmedWord, resultImg: imgUrl }
                  : f
              )
            );
          }

          // 🔹 Add to completed fusions Set and log it
          const key = `${item.word1}+${item.word2}`;
          completedFusionSetRef.add(key);
          
        } catch (error) {
          console.error(`Failed to fuse "${item.word1}" + "${item.word2}":`, error);
        }
      }
    };

    processQueue();
  }, [queue, setBalls, setFusionList, completedFusionSetRef]);

  return { enqueueFusion };
};