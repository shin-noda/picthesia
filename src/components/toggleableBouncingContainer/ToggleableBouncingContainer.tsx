import React, { useRef, useEffect, useState } from "react";

// Components
import Ball from "../ball/Ball";
import PicWordToggle from "../picWordToggle/PicWordToggle";
import BallsFuseToggle from "../ballsFuseToggle/BallsFuseToggle";
import FusionListBoard from "../fusionListBoard/FusionListBoard";

// Custom Hooks
import { useBalls } from "./useBalls";
import { useFusionQueue } from "../../hooks/useFusionQueue";
import { useBallCollisions } from "./useBallCollisions";

// Types and Styles
import type { ToggleableBouncingContainerProps, BallData, FusionItem } from "./types";
import "./ToggleableBouncingContainer.css";

const ToggleableBouncingContainer: React.FC<ToggleableBouncingContainerProps> = ({
  words,
  images,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // State
  const [visible, setVisible] = useState(true);
  const [showPic, setShowPic] = useState(true);
  const [fusionEnabled, setFusionEnabled] = useState(false);
  const [fusionList, setFusionList] = useState<FusionItem[]>([]);

  // Set to track unique fusion entries (prevents duplicates)
  const fusionSetRef = useRef<Set<string>>(new Set());

  // Custom Hooks
  const { balls, setBalls, updateWallCollisions } = useBalls(words, images);

  // Use fusion queue directly with setBalls and setFusionList
  const { enqueueFusion } = useFusionQueue(setBalls, setFusionList);

  // Handle fusion with duplicate prevention and debug Set
  const handleEnqueueFusion = (word1: string, word2: string, id: string) => {
    const key = `${word1}+${word2}`;

    // Existing placeholder logic
    if (!fusionSetRef.current.has(key)) {
      fusionSetRef.current.add(key);

      setFusionList((prev: FusionItem[]) => [
        ...prev,
        { word1, word2, id }, // placeholder
      ]);
    }

    // Enqueue fusion to queue (async)
    enqueueFusion(word1, word2, id);
  };

  const { handleCollisions } = useBallCollisions(handleEnqueueFusion, fusionEnabled);

  useEffect(() => {
    if (!visible) return;

    const animate = () => {
      if (!containerRef.current) return;

      const { clientWidth: width, clientHeight: height } = containerRef.current;

      setBalls((prevBalls) => {
        const ballsAfterWallCollision = updateWallCollisions(prevBalls, width, height);
        return handleCollisions(ballsAfterWallCollision);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [visible, handleCollisions, updateWallCollisions, setBalls]);

  return (
    <div className="bouncing-container-wrapper">
      <button className="toggle-button" onClick={() => setVisible((prev) => !prev)}>
        {visible ? "Hide Word Balls" : "Show Word Balls"}
      </button>

      {visible && (
        <>
          <div className="toggles-row">
            <PicWordToggle showPic={showPic} setShowPic={setShowPic} />
            <BallsFuseToggle fusionEnabled={fusionEnabled} setFusionEnabled={setFusionEnabled} />
          </div>

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

          <FusionListBoard
            fusionList={fusionList.map((f) => ({
              ...f,
              resultWord: f.resultWord ?? "…",
            }))}
          />
        </>
      )}
    </div>
  );
};

export default ToggleableBouncingContainer;
