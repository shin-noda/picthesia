import { useEffect, useState } from "react";
import type { BallData } from "../../types/types";
import "./Ball.css";

export interface BallProps {
  ball: BallData;
  showPic: boolean;
}

const Ball = ({ ball, showPic }: BallProps) => {
  const [animate, setAnimate] = useState(false);

  // Trigger pop animation on mount
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  // Show simmer effect if ball is waiting for an image
  const isSimmering = showPic && !ball.imgUrl;

  return (
    <div
      className={`word-ball ${showPic && ball.imgUrl ? "pic" : ""} ${animate ? "pop" : ""} ${
        isSimmering ? "simmer" : ""
      }`}
      style={{
        width: ball.size,
        height: ball.size,
        left: ball.x,
        top: ball.y,
        backgroundImage: showPic && ball.imgUrl ? `url(${ball.imgUrl})` : undefined,
      }}
    >
      {!showPic && <span>{ball.word}</span>}
    </div>
  );
};

export default Ball;
