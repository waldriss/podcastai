import { Voice } from 'src/shared/types';

export interface CreateQuoteParams {
  quoteTitle: string;

  quoteDescription: string;

  imagePrompt: string;

  voicePrompt: string;

  voiceType: Voice;

  views: number;

  audioDuration: number;
  audioFile: Express.Multer.File;
  imageFile: Express.Multer.File;
}
