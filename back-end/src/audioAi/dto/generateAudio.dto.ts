import { IsString } from 'class-validator';
import { SpeechCreateParams } from 'openai/resources/audio/speech';
import { Voice } from 'src/shared/types';

export class GenerateAudioDto {
  @IsString()
  voice:Voice

  @IsString()
  input: string;
}
