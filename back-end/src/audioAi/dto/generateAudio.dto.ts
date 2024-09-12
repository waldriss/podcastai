import { IsString } from 'class-validator';
import { SpeechCreateParams } from 'openai/resources/audio/speech';

export class GenerateAudioDto {
  @IsString()
  voice: SpeechCreateParams['voice'];

  @IsString()
  input: string;
}