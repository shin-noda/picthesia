import React, { useEffect, useRef, useState } from "react";
import "./ToggleableBouncingContainer.css";
import type { WikimediaImage } from "../../services/wikipediaService";

interface ToggleableBouncingContainerProps {
  words: string[];
  images: Record<string, WikimediaImage[]>;
}

interface Ball {
  word: string;
  imgUrl?: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
}

const ToggleableBouncingContainer: React.FC<ToggleableBouncingContainerProps> = ({ words, images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [balls, setBalls] = useState<Ball[]>([]);
  const [visible, setVisible] = useState(true);
  const animationFrameRef = useRef<number | null>(null);

  const uniqueWords = Array.from(new Set(words.map(w => w.toLowerCase())));

  // Initialize balls once
  useEffect(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;

    const newBalls: Ball[] = uniqueWords.map(word => {
      // Case-insensitive lookup for images
      const imgKey = Object.keys(images).find(k => k.toLowerCase() === word);
      const imgObj = imgKey ? images[imgKey]?.[0] : undefined;
      const imgUrl = imgObj?.url;

      const size = 50;
      const x = Math.floor(Math.random() * (clientWidth - size));
      const y = Math.floor(Math.random() * (clientHeight - size));

      // Random angle for movement
      const angle = Math.random() * 2 * Math.PI; // 0 to 360 degrees in radians
      const speed = 1; // pixels per frame
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;

      return { word, imgUrl, x, y, dx, dy, size };
    });

    setBalls(newBalls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  // Animate balls
  useEffect(() => {
    if (!visible) return;

    let lastMoveTime = Date.now();
    const moveInterval = 1; // ms

    const animate = () => {
      const now = Date.now();
      if (now - lastMoveTime >= moveInterval) {
        lastMoveTime = now;

        if (!containerRef.current) return;
        const { clientWidth, clientHeight } = containerRef.current;

        setBalls(prev =>
          prev.map(ball => {
            let newX = ball.x + ball.dx;
            let newY = ball.y + ball.dy;
            let newDx = ball.dx;
            let newDy = ball.dy;

            // Bounce X
            if (newX <= 0) {
              newX = 0;
              newDx = -newDx; // reverse angle on X bounce
            } else if (newX + ball.size >= clientWidth) {
              newX = clientWidth - ball.size;
              newDx = -newDx;
            }

            // Bounce Y
            if (newY <= 0) {
              newY = 0;
              newDy = -newDy; // reverse angle on Y bounce
            } else if (newY + ball.size >= clientHeight) {
              newY = clientHeight - ball.size;
              newDy = -newDy;
            }

            return { ...ball, x: newX, y: newY, dx: newDx, dy: newDy };
          })
        );
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [visible]);

  return (
    <div className="bouncing-container-wrapper">
      <button
        className="toggle-button"
        onClick={() => setVisible(prev => !prev)}
      >
        {visible ? "Hide Word Balls" : "Show Word Balls"}
      </button>

      {visible && (
        <div className="bouncing-container" ref={containerRef}>
          {balls.map(ball => (
            <div
              key={ball.word}
              className="word-ball"
              style={{
                width: ball.size,
                height: ball.size,
                left: ball.x,
                top: ball.y,
                backgroundImage: ball.imgUrl ? `url(${ball.imgUrl})` : undefined,
                backgroundColor: ball.imgUrl ? "#ccc" : "#667eea", // fallback color
              }}
            >
              {!ball.imgUrl && <span>{ball.word}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToggleableBouncingContainer;
