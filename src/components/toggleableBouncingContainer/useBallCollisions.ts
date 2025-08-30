import type { BallData } from "./types";
import { v4 as uuidv4 } from "uuid";
import { useGraceTime } from "./useGraceTime";

export const useBallCollisions = (
  enqueueFusion: (w1: string, w2: string, id: string) => void
) => {
  const isOutOfGraceTime = useGraceTime(1000);

  const handleCollisions = (balls: BallData[]): BallData[] => {
    const updated = [...balls];
    let collisionHandled = false;

    // IDs of balls to remove and new ball to add
    const removeIds: string[] = [];
    let newBall: BallData | null = null;
    let fusionWords: [string, string] = ["", ""];

    for (let i = 0; i < updated.length && !collisionHandled; i++) {
      for (let j = i + 1; j < updated.length && !collisionHandled; j++) {
        const b1 = updated[i];
        const b2 = updated[j];

        if (
          !isOutOfGraceTime ||
          b1.hasBumped ||
          b2.hasBumped ||
          b1.isProcessing ||
          b2.isProcessing
        ) continue;

        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = b1.size;

        if (distance > 0 && distance < minDist) {
          collisionHandled = true;

          removeIds.push(b1.id, b2.id);
          fusionWords = [b1.word, b2.word];

          const speedMagnitude = Math.sqrt(
            ((b1.dx ** 2 + b1.dy ** 2) + (b2.dx ** 2 + b2.dy ** 2)) / 2
          );
          const angle = Math.random() * 2 * Math.PI;

          newBall = {
            id: uuidv4(),
            word: "...",
            imgUrl: b1.imgUrl || b2.imgUrl,
            x: (b1.x + b2.x) / 2,
            y: (b1.y + b2.y) / 2,
            dx: Math.cos(angle) * speedMagnitude,
            dy: Math.sin(angle) * speedMagnitude,
            size: Math.max(b1.size, b2.size),
            isOutOfGraceTime: true,
            hasBumped: true,
            isProcessing: true,
          };

          break;
        }
      }
    }

    // Return new balls array (remove collided, add new one)
    let filtered = updated.filter((b) => !removeIds.includes(b.id));
    if (newBall) filtered.push(newBall);

    // Trigger fusion outside of loop
    if (newBall) enqueueFusion(fusionWords[0], fusionWords[1], newBall.id);

    return filtered;
  };

  return { handleCollisions };
};