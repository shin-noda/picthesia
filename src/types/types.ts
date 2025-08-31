import { type WikimediaImage } from "../services/WikiService";

export interface BallData {
  id: string;
  word: string;
  imgUrl?: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  hasFused: boolean;
  isProcessing?: boolean;
}

export interface ToggleableBouncingContainerProps {
  words: string[];
  images: Record<string, WikimediaImage[]>;
}

export interface FusionItem {
  word1: string;
  word2: string;
  id: string; // placeholder ball id
  resultWord?: string;
  resultImg?: string;
}