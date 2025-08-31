import type { BallData } from "./types";
import { v4 as uuidv4 } from "uuid";

export const useBallCollisions = (
  enqueueFusion: (w1: string, w2: string, id: string) => void,
  fusionEnabled: boolean
) => {
  const handleCollisions = (balls: BallData[]): BallData[] => {
    const updated = [...balls];

    for (let i = 0; i < updated.length; i++) {
      for (let j = i + 1; j < updated.length; j++) {
        const b1 = updated[i];
        const b2 = updated[j];

        // Skip if either ball is processing or already fused
        if (b1.isProcessing || b2.isProcessing || b1.hasFused || b2.hasFused)
          continue;

        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = b1.size;

        if (distance > 0 && distance < minDist) {
          if (fusionEnabled) {
            // --- Fusion behavior ---
            const speedMagnitude = Math.sqrt(
              ((b1.dx ** 2 + b1.dy ** 2) + (b2.dx ** 2 + b2.dy ** 2)) / 2
            );
            const angle = Math.random() * 2 * Math.PI;

            const newBall: BallData = {
              id: uuidv4(),
              word: "...",
              imgUrl: b1.imgUrl || b2.imgUrl,
              x: (b1.x + b2.x) / 2,
              y: (b1.y + b2.y) / 2,
              dx: Math.cos(angle) * speedMagnitude,
              dy: Math.sin(angle) * speedMagnitude,
              size: Math.max(b1.size, b2.size),
              isOutOfGraceTime: true,
              hasFused: true,      // mark as fused
              isProcessing: true,
            };

            // Mark old balls as fused so they won’t fuse again
            b1.hasFused = true;
            b2.hasFused = true;

            // Remove the old balls and add the new fused one
            updated.splice(j, 1);
            updated.splice(i, 1);
            updated.push(newBall);

            enqueueFusion(b1.word, b2.word, newBall.id);

            return updated; // handle only one fusion per frame
          } else {
            // --- Bounce off behavior ---
            const tempDx = b1.dx;
            const tempDy = b1.dy;

            b1.dx = b2.dx;
            b1.dy = b2.dy;

            b2.dx = tempDx;
            b2.dy = tempDy;

            // Move balls slightly apart to avoid sticking
            const overlap = minDist - distance;
            const shiftX = (dx / distance) * (overlap / 2);
            const shiftY = (dy / distance) * (overlap / 2);

            b1.x -= shiftX;
            b1.y -= shiftY;
            b2.x += shiftX;
            b2.y += shiftY;
          }
        }
      }
    }

    return updated;
  };

  return { handleCollisions };
};