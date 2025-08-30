import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { GeminiService } from "../services/GeminiService";
import type { BallData } from "../components/toggleableBouncingContainer/types";

/**
 * A custom hook for managing a queue of word fusions for "BallData" objects.
 * It uses the GeminiService to process fusions and update the balls state.
 *
 * @param {BallData[]} balls The current array of BallData objects.
 * @param {Dispatch<SetStateAction<BallData[]>>} setBalls The state setter for the balls array.
 * @returns {{ enqueueFusion: (word1: string, word2: string) => void }} An object containing the `enqueueFusion` function.
 */
export const useFusionQueue = (
  balls: BallData[],
  setBalls: Dispatch<SetStateAction<BallData[]>>
) => {
  const [fusionQueue, setFusionQueue] = useState<[string, string][]>([]);

  /**
   * Adds a new word fusion request to the queue.
   * @param {string} word1 The first word to fuse.
   * @param {string} word2 The second word to fuse.
   */
  const enqueueFusion = (word1: string, word2: string) => {
    setFusionQueue((prev) => [...prev, [word1, word2]]);
  };

  // Process the fusion queue whenever it changes
  useEffect(() => {
    if (fusionQueue.length === 0) {
      return;
    }

    const processQueue = async () => {
      // Process a copy of the queue to prevent a race condition with new fusions
      const queueToProcess = [...fusionQueue];
      setFusionQueue([]); // Clear the queue immediately

      for (const [word1, word2] of queueToProcess) {
        try {
          const fused = await GeminiService.getFusionWord(word1, word2);

          if (fused) {
            setBalls((prev: BallData[]) =>
              prev.map((ball) => {
                // If the ball's word matches either of the fused words, update it
                if (ball.word === word1 || ball.word === word2) {
                  console.log(`Fusion result for "${word1} + ${word2}": ${fused}`);
                  return { ...ball, word: fused };
                }
                return ball;
              })
            );
          }
        } catch (error) {
          console.error(`Failed to fuse words "${word1}" and "${word2}":`, error);
        }
      }
    };

    processQueue();
  }, [fusionQueue, setBalls]);

  return { enqueueFusion };
};