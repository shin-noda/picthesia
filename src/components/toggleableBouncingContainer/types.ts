import { type WikimediaImage } from "../../services/WikiService";

export interface BallData {
  id: string;
  word: string;
  imgUrl?: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  isOutOfGraceTime: boolean;
  hasBumped: boolean;
  isProcessing?: boolean;
}

export interface ToggleableBouncingContainerProps {
  words: string[];
  images: Record<string, WikimediaImage[]>;
}
