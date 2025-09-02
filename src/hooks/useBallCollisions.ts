import type { BallData } from "../types/types";
import { v4 as uuidv4 } from "uuid";

// ---
// Helper functions to encapsulate logic
// ---

// Calculates a new ball after two balls have fused
const createFusedBall = (b1: BallData, b2: BallData): BallData => {
  const speedMagnitude = Math.sqrt(((b1.dx ** 2 + b1.dy ** 2) + (b2.dx ** 2 + b2.dy ** 2)) / 2);
  const angle = Math.random() * 2 * Math.PI;

  return {
    id: uuidv4(),
    word: "...", // Placeholder word until fetched
    imgUrl: undefined,
    x: (b1.x + b2.x) / 2,
    y: (b1.y + b2.y) / 2,
    dx: Math.cos(angle) * speedMagnitude,
    dy: Math.sin(angle) * speedMagnitude,
    size: Math.max(b1.size, b2.size),
    hasFused: true,
    isProcessing: true,
    isSimmering: true, // Shimmer animation state
  };
};

// Handles the bouncing logic for two balls
const handleBounce = (b1: BallData, b2: BallData) => {
  const dx = b2.x - b1.x;
  const dy = b2.y - b1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const minDist = b1.size;

  // Swap velocities
  [b1.dx, b2.dx] = [b2.dx, b1.dx];
  [b1.dy, b2.dy] = [b2.dy, b1.dy];

  // Move balls apart to prevent sticking
  const overlap = minDist - distance;
  const shiftX = (dx / distance) * (overlap / 2);
  const shiftY = (dy / distance) * (overlap / 2);
  b1.x -= shiftX;
  b1.y -= shiftY;
  b2.x += shiftX;
  b2.y += shiftY;
};

// ---
// Main hook logic
// ---

export const useBallCollisions = (
  enqueueFusion: (w1: string, w2: string, id: string) => void,
  fusionEnabled: boolean
) => {
  const handleCollisions = (balls: BallData[]): BallData[] => {
    const updatedBalls = [...balls];

    for (let i = 0; i < updatedBalls.length; i++) {
      for (let j = i + 1; j < updatedBalls.length; j++) {
        const ball1 = updatedBalls[i];
        const ball2 = updatedBalls[j];

        // Skip balls that are in a special state
        if (ball1.isProcessing || ball2.isProcessing || ball1.isSimmering || ball2.isSimmering) {
          continue;
        }

        const dx = ball2.x - ball1.x;
        const dy = ball2.y - ball1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check for collision
        if (distance > 0 && distance < ball1.size) {
          if (fusionEnabled) {
            // FUSION BEHAVIOR
            const newBall = createFusedBall(ball1, ball2);

            // Mark old balls for removal and add the new one
            ball1.hasFused = true;
            ball2.hasFused = true;

            // Remove old balls & add the new simmering ball
            updatedBalls.splice(j, 1);
            updatedBalls.splice(i, 1);
            updatedBalls.push(newBall);

            // Enqueue async fusion
            enqueueFusion(ball1.word, ball2.word, newBall.id);

            // Stop after the first fusion to handle one per frame
            return updatedBalls;
          } else {
            // BOUNCE BEHAVIOR
            handleBounce(ball1, ball2);
          }
        }
      }
    }

    return updatedBalls;
  };

  return { handleCollisions };
};