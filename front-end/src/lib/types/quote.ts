import { Author } from "./user";

export type Voice = "Brian" | "Bill" | "George" | "Lilly";

export interface GenerateAudioParams {
  voice: Voice;
  input: string;
}

export interface CreateQuoteParams {
  quoteTitle: string;
  quoteDescription: string;
  audioUrl: string;
  imageUrl: string;
  voiceType: Voice;
  imagePrompt: string;
  voicePrompt: string;
  views: number;
  audioDuration: number;
}

export interface TrendingQuote {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}
export interface exploreQuote{
  id:number;
  title:string;
  imageUrl:string
}
export interface SimilarVoiceQuote extends TrendingQuote{}

export interface QuoteDetailPlayerProps {
  audioUrl: string;
  title: string;
  author: Author;
  imageUrl: string;
  id: number;
  isOwner: boolean;
  
}

export interface Quote {
  title: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
  user: Author;
  userId: number;
  id: number;
  isOwner: boolean;
  voicePrompt: string;
  imagePrompt: string;
  voiceType: Voice;
  audioDuration: number;
  views: number;
}
