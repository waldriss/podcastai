import { IsString } from 'class-validator';
import { SpeechCreateParams } from 'openai/resources/audio/speech';

export class GenerateAudioDto {
  @IsString()
  voice:
    | 'nPczCjzI2devNBz1zQrb'
    | 'pqHfZKP75CvOlQylNhV4'
    | 'JBFqnCBsd6RMkjVDRZzb'
    | 'pFZP5JQG7iQjIQuC4Bku';

  @IsString()
  input: string;
}
