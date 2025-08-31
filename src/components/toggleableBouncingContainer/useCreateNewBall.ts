// /hooks/useCreateNewBall.ts
import { v4 as uuidv4 } from "uuid";
import type { BallData } from "./types";
import { WikipediaService, type WikimediaImage } from "../../services/WikiService";

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
      // Fetch images for the fused word
      const images: WikimediaImage[] = await WikipediaService.searchImages(fusedWord);
      const imgUrl = images.length > 0 ? images[0].url : b1.imgUrl || b2.imgUrl || "/fallback.png";

      setBalls((prevBalls) => {
        // Remove the two original balls
        const filteredBalls = prevBalls.filter((b) => b.id !== b1.id && b.id !== b2.id);

        // Create the new fused ball at midpoint
        const newBall: BallData = {
          id: uuidv4(),
          word: fusedWord,
          imgUrl,
          x: (b1.x + b2.x) / 2,
          y: (b1.y + b2.y) / 2,
          dx: (b1.dx + b2.dx) / 2,
          dy: (b1.dy + b2.dy) / 2,
          size: Math.max(b1.size, b2.size),
          isOutOfGraceTime: false,
          hasBumped: true,
        };

        return [...filteredBalls, newBall];
      });
    } catch (err) {
      console.error("useCreateNewBall error:", err);
    }
  };

  return { createNewBall };
};