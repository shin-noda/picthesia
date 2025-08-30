import React from "react";
import "./Ball.css";

export interface BallProps {
  word: string;
  imgUrl?: string;
  x: number;
  y: number;
  size: number;
  showPic: boolean;
}

const Ball: React.FC<BallProps> = ({ word, imgUrl, x, y, size, showPic }) => {
  return (
    <div
      className={`word-ball ${showPic && imgUrl ? "pic" : ""}`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        backgroundImage: showPic && imgUrl ? `url(${imgUrl})` : undefined,
      }}
    >
      {!showPic && <span>{word}</span>}
    </div>
  );
};

export default Ball;
