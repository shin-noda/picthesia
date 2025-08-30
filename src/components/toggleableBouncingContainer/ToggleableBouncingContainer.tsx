import React, { useEffect, useRef, useState } from "react";
import PicWordToggle from "../picWordToggle/PicWordToggle";
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
  const [showPic, setShowPic] = useState(true);
  const animationFrameRef = useRef<number | null>(null);

  const uniqueWords = Array.from(new Set(words.map(w => w.toLowerCase())));

  // Initialize balls once
  useEffect(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;

    const newBalls: Ball[] = uniqueWords.map(word => {
      const imgKey = Object.keys(images).find(k => k.toLowerCase() === word);
      const imgObj = imgKey ? images[imgKey]?.[0] : undefined;
      const imgUrl = imgObj?.url;

      const size = 50;
      const x = Math.floor(Math.random() * (clientWidth - size));
      const y = Math.floor(Math.random() * (clientHeight - size));

      const angle = Math.random() * 2 * Math.PI;
      const speed = 1;
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;

      return { word, imgUrl, x, y, dx, dy, size };
    });

    setBalls(newBalls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  // Collision detection between all balls
  const collisionDetection = (ballArray: Ball[]): Ball[] => {
    const updatedBalls = [...ballArray];

    for (let i = 0; i < updatedBalls.length; i++) {
      for (let j = i + 1; j < updatedBalls.length; j++) {
        const b1 = updatedBalls[i];
        const b2 = updatedBalls[j];

        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = b1.size;

        if (distance < minDist && distance > 0) {
          // Simple elastic collision for equal mass
          const angle = Math.atan2(dy, dx);
          const speed1 = Math.sqrt(b1.dx * b1.dx + b1.dy * b1.dy);
          const speed2 = Math.sqrt(b2.dx * b2.dx + b2.dy * b2.dy);
          const dir1 = Math.atan2(b1.dy, b1.dx);
          const dir2 = Math.atan2(b2.dy, b2.dx);

          // Swap velocities along the collision vector
          const vx1 = speed1 * Math.cos(dir1 - angle);
          const vy1 = speed1 * Math.sin(dir1 - angle);
          const vx2 = speed2 * Math.cos(dir2 - angle);
          const vy2 = speed2 * Math.sin(dir2 - angle);

          const final_vx1 = vx2;
          const final_vx2 = vx1;

          // Convert back to original coordinate system
          b1.dx = Math.cos(angle) * final_vx1 + Math.cos(angle + Math.PI/2) * vy1;
          b1.dy = Math.sin(angle) * final_vx1 + Math.sin(angle + Math.PI/2) * vy1;
          b2.dx = Math.cos(angle) * final_vx2 + Math.cos(angle + Math.PI/2) * vy2;
          b2.dy = Math.sin(angle) * final_vx2 + Math.sin(angle + Math.PI/2) * vy2;

          // Push balls apart slightly to avoid sticking
          const overlap = (minDist - distance) / 2;
          b1.x -= overlap * Math.cos(angle);
          b1.y -= overlap * Math.sin(angle);
          b2.x += overlap * Math.cos(angle);
          b2.y += overlap * Math.sin(angle);
        }
      }
    }

    return updatedBalls;
  };

  // Animate balls
  useEffect(() => {
    if (!visible) return;

    let lastMoveTime = Date.now();
    const moveInterval = 1;

    const animate = () => {
      const now = Date.now();
      if (now - lastMoveTime >= moveInterval) {
        lastMoveTime = now;

        if (!containerRef.current) return;
        const { clientWidth, clientHeight } = containerRef.current;

        setBalls(prev =>
          collisionDetection(
            prev.map(ball => {
              let newX = ball.x + ball.dx;
              let newY = ball.y + ball.dy;
              let newDx = ball.dx;
              let newDy = ball.dy;

              // Bounce X
              if (newX <= 0) {
                newX = 0;
                newDx = -newDx;
              } else if (newX + ball.size >= clientWidth) {
                newX = clientWidth - ball.size;
                newDx = -newDx;
              }

              // Bounce Y
              if (newY <= 0) {
                newY = 0;
                newDy = -newDy;
              } else if (newY + ball.size >= clientHeight) {
                newY = clientHeight - ball.size;
                newDy = -newDy;
              }

              return { ...ball, x: newX, y: newY, dx: newDx, dy: newDy };
            })
          )
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
        <>
            <PicWordToggle showPic={showPic} setShowPic={setShowPic} />
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
                    backgroundImage: showPic && ball.imgUrl ? `url(${ball.imgUrl})` : undefined,
                    backgroundColor: ball.imgUrl ? "#667eea" : "#ccc",
                }}
                >
                {!showPic && <span>{ball.word}</span>}
                </div>
            ))}
            </div>
        </>
        )}
    </div>
  );
};

export default ToggleableBouncingContainer;
