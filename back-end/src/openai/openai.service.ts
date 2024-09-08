import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { SpeechCreateParams } from 'openai/resources/audio/speech';

@Injectable()
export class OpenAiService {
  private openAi: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.openAi = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }
  async generateAudio({
    voice,
    input,
  }: {
    voice: SpeechCreateParams['voice'];
    input: string;
  }) {
    try {
      const mp3 = await this.openAi.audio.speech.create({
        model: 'tts-1',
        voice: voice,
        input: input,
      });
      const buffer = Buffer.from(await mp3.arrayBuffer());
      return buffer;
    } catch (error) {
      throw new HttpException(
        { message: 'error generating Aduio' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
