import type { BallData } from "./types";

export const useBallCollisions = (enqueueFusion: (w1: string, w2: string) => void) => {
  const handleCollisions = (balls: BallData[]): BallData[] => {
    const updated = [...balls];

    for (let i = 0; i < updated.length; i++) {
      for (let j = i + 1; j < updated.length; j++) {
        const b1 = updated[i];
        const b2 = updated[j];

        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = b1.size;

        if (distance < minDist && distance > 0) {
          // Trigger fusion
          enqueueFusion(b1.word, b2.word);

          const angle = Math.atan2(dy, dx);
          const [vx1, vy1] = [b1.dx, b1.dy];
          const [vx2, vy2] = [b2.dx, b2.dy];

          // Rotate velocities
          const rotated_vx1 = vx1 * Math.cos(angle) + vy1 * Math.sin(angle);
          const rotated_vy1 = vy1 * Math.cos(angle) - vx1 * Math.sin(angle);
          const rotated_vx2 = vx2 * Math.cos(angle) + vy2 * Math.sin(angle);
          const rotated_vy2 = vy2 * Math.cos(angle) - vx2 * Math.sin(angle);

          // 1D elastic collision
          const final_vx1 = rotated_vx2;
          const final_vx2 = rotated_vx1;

          // Rotate back
          b1.dx = final_vx1 * Math.cos(angle) - rotated_vy1 * Math.sin(angle);
          b1.dy = rotated_vy1 * Math.cos(angle) + final_vx1 * Math.sin(angle);
          b2.dx = final_vx2 * Math.cos(angle) - rotated_vy2 * Math.sin(angle);
          b2.dy = rotated_vy2 * Math.cos(angle) + final_vx2 * Math.sin(angle);

          // Prevent sticking
          const overlap = (minDist - distance) / 2;
          b1.x -= overlap * Math.cos(angle);
          b1.y -= overlap * Math.sin(angle);
          b2.x += overlap * Math.cos(angle);
          b2.y += overlap * Math.sin(angle);
        }
      }
    }

    return updated;
  };

  return { handleCollisions };
};