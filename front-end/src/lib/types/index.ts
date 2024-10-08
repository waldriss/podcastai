import { Dispatch, SetStateAction } from "react";
import { Voice } from "./quote";


declare global {
  interface CustomJwtSessionClaims {
    userId?:string;
  }
}


export interface QuoteCardProps {
  imgUrl: string;
  title: string;
  description: string;
  quoteId: number;
}

export interface GenerateQuoteProps {
  voiceType: Voice;
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
  voicePrompt: string;
  setVoicePrompt: Dispatch<SetStateAction<string>>;
  setAudioDuration: Dispatch<SetStateAction<number>>;
}

export interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>;
  image: string;
  imagePrompt: string;
  setImagePrompt: Dispatch<SetStateAction<string>>;
}
export type GetTokenOptions = {
  template?: string;
  leewayInSeconds?: number;
  skipCache?: boolean;
};
export type GetToken = (options?: GetTokenOptions) => Promise<string | null>;



export interface Audio {
  title: string;
  audioUrl: string;
  authorName: string;
  imageUrl: string;
  quoteId: number;
}