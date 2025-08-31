import { useState, useEffect } from "react";
import type { BallData } from "./types";
import { v4 as uuidv4 } from "uuid";

export const useBalls = (
  words: string[],
  images: Record<string, any>, // WikimediaImage[]
  graceDuration: number = 50
) => {
  const [balls, setBalls] = useState<BallData[]>([]);

  useEffect(() => {
    const uniqueWords = Array.from(new Set(words.map((w) => w.toLowerCase())));
    const newBalls: BallData[] = uniqueWords.map((word) => {
      const imgKey = Object.keys(images).find((k) => k.toLowerCase() === word);
      const imgUrl = imgKey ? images[imgKey]?.[0]?.url : undefined;

      const size = 50;
      const x = Math.random() * 400; // default container size fallback
      const y = Math.random() * 400;
      const angle = Math.random() * 2 * Math.PI;
      const speed = 1;

      return {
        id: uuidv4(),
        word,
        imgUrl,
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        size,
        hasFused: false,
      };
    });

    setBalls(newBalls);
  }, [words, images, graceDuration]);

  const updateWallCollisions = (balls: BallData[], width: number, height: number) => {
    return balls.map((ball) => {
      let { x, y, dx, dy, size } = ball;

      if (x + dx < 0) { dx = Math.abs(dx); x = 0; }
      if (x + dx + size > width) { dx = -Math.abs(dx); x = width - size; }
      if (y + dy < 0) { dy = Math.abs(dy); y = 0; }
      if (y + dy + size > height) { dy = -Math.abs(dy); y = height - size; }

      x += dx;
      y += dy;

      return { ...ball, x, y, dx, dy };
    });
  };

  return { balls, setBalls, updateWallCollisions };
};
