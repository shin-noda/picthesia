// /components/fusionListBoard/FusionListBoard.tsx
import React from "react";
import "./FusionListBoard.css";
import type { FusionItem } from "../toggleableBouncingContainer/types";

interface FusionListBoardProps {
  fusionList: FusionItem[];
}

const FusionListBoard: React.FC<FusionListBoardProps> = ({ fusionList }) => {
  if (!fusionList.length) return null;

  // Deduplicate by word1+word2, keep the latest fusion
  const uniqueFusionList = Array.from(
    fusionList.reduce((map, f) => map.set(`${f.word1}+${f.word2}`, f), new Map())
  ).map(([_, f]) => f);

  return (
    <div className="fusion-list-board">
      <h3 className="fusion-list-title">Fusion List:</h3>
      <ul>
        {uniqueFusionList.map((fusion, idx) => (
          <li key={fusion.id || idx} className="fusion-item">
            {fusion.word1} + {fusion.word2} →{" "}
            {fusion.resultWord ? (
              <>
                <strong>{fusion.resultWord}</strong>
                {fusion.resultImg && (
                  <img
                    src={fusion.resultImg}
                    alt={fusion.resultWord}
                    className="fusion-img"
                  />
                )}
              </>
            ) : (
              "…"
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FusionListBoard;