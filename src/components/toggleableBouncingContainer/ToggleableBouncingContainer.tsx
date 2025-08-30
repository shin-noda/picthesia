import React, { useRef, useEffect, useState } from "react";
import PicWordToggle from "../picWordToggle/PicWordToggle";
import Ball from "../ball/Ball";
import { useFusionQueue } from "../../hooks/useFusionQueue";
import { useBalls } from "./useBalls";
import { useBallCollisions } from "./useBallCollisions";
import type { ToggleableBouncingContainerProps, BallData } from "./types";
import "./ToggleableBouncingContainer.css";

const ToggleableBouncingContainer: React.FC<ToggleableBouncingContainerProps> = ({
  words,
  images,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [visible, setVisible] = useState(true);
  const [showPic, setShowPic] = useState(true);

  const { balls, setBalls, updateWallCollisions } = useBalls(words, images);
  const { enqueueFusion } = useFusionQueue(setBalls);
  const { handleCollisions } = useBallCollisions(enqueueFusion, setBalls);

  useEffect(() => {
    if (!visible) return;

    const animate = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      setBalls((prev) => handleCollisions(updateWallCollisions(prev, width, height)));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [visible, handleCollisions, updateWallCollisions, setBalls]);

  return (
    <div className="bouncing-container-wrapper">
      <button
        className="toggle-button"
        onClick={() => setVisible((prev) => !prev)}
      >
        {visible ? "Hide Word Balls" : "Show Word Balls"}
      </button>

      {visible && (
        <>
          <PicWordToggle showPic={showPic} setShowPic={setShowPic} />
          <div className="bouncing-container" ref={containerRef}>
            {balls.map((ball: BallData) => (
              <Ball
                key={ball.id}
                word={ball.word}
                imgUrl={ball.imgUrl}
                x={ball.x}
                y={ball.y}
                size={ball.size}
                showPic={showPic}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ToggleableBouncingContainer;
