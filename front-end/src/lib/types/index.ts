import { Dispatch, SetStateAction } from "react";


declare global {
  interface CustomJwtSessionClaims {
    userId?:string;
  }
}


export interface PodcastCardProps {
  imgUrl: string;
  title: string;
  description: string;
  podcastId: number;
}

export interface GeneratePodcastProps {
  voiceType: string;
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
  setAudioStorageId: Dispatch<SetStateAction<null>>;
  voicePrompt: string;
  setVoicePrompt: Dispatch<SetStateAction<string>>;
  setAudioDuration: Dispatch<SetStateAction<number>>;
}

export interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>;
  setImageStorageId: Dispatch<SetStateAction<null>>;
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
