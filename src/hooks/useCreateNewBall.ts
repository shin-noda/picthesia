import { v4 as uuidv4 } from "uuid";
import type { BallData } from "../types/types";
import { WikipediaService, type WikimediaImage } from "../services/WikiService";

interface UseCreateNewBallReturn {
  createNewBall: (
    fusedWord: string,
    b1: BallData,
    b2: BallData,
    setBalls: React.Dispatch<React.SetStateAction<BallData[]>>
  ) => Promise<void>;
}

export const useCreateNewBall = (): UseCreateNewBallReturn => {
  const createNewBall = async (
    fusedWord: string,
    b1: BallData,
    b2: BallData,
    setBalls: React.Dispatch<React.SetStateAction<BallData[]>>
  ) => {
    try {
      // Generate a unique ID for the new ball
      const newBallId = uuidv4();

      // Step 1: Create a simmering ball immediately (no image yet)
      setBalls((prevBalls) => {
        const filteredBalls = prevBalls.filter((b) => b.id !== b1.id && b.id !== b2.id);

        const simmerBall: BallData = {
          id: newBallId,
          word: "...",
          imgUrl: undefined,
          x: (b1.x + b2.x) / 2,
          y: (b1.y + b2.y) / 2,
          dx: (b1.dx + b2.dx) / 2,
          dy: (b1.dy + b2.dy) / 2,
          size: Math.max(b1.size, b2.size),
          hasFused: true,
          isProcessing: true,
          isSimmering: true, // ← shimmer animation
        };

        return [...filteredBalls, simmerBall];
      });

      // Step 2: Fetch images for the fused word
      const images: WikimediaImage[] = await WikipediaService.searchImages(fusedWord);
      const imgUrl = images.length > 0 ? images[0].url : undefined;

      // Step 3: Update the simmering ball with the real image and remove simmer flag
      setBalls((prevBalls) =>
        prevBalls.map((b) =>
          b.id === newBallId
            ? {
                ...b,
                word: fusedWord,
                imgUrl,
                isProcessing: false,
                isSimmering: false,
              }
            : b
        )
      );
    } catch (err) {
      console.error("useCreateNewBall error:", err);
    }
  };

  return { createNewBall };
};