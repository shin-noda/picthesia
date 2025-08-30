import type { WikimediaImage } from "../../services/wikipediaService";

export interface BallData {
  id: string;       // unique ID for React keys
  word: string;
  imgUrl?: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
}

export interface ToggleableBouncingContainerProps {
  words: string[];
  images: Record<string, WikimediaImage[]>;
}
