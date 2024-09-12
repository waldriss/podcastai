import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElevenLabsClient } from 'elevenlabs/Client';
import OpenAI from 'openai';
import { SpeechCreateParams } from 'openai/resources/audio/speech';
import { PassThrough } from 'stream';

@Injectable()
export class AudioAiService {
  /*
  private openAi: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.openAi = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }
    */
  private elevenLabs:ElevenLabsClient
  constructor(private readonly configService: ConfigService) {
    this.elevenLabs= new ElevenLabsClient({
      apiKey:this.configService.get<string>('ELEVENLABS_API_KEY') 
    })
  }
   
  async generateAudio({
    voice,
    input,
  }: {
    voice: SpeechCreateParams['voice'];
    input: string;
  }) {
    try {
      const audio = await this.elevenLabs.textToSpeech.convert("pqHfZKP75CvOlQylNhV4",{text:"hello world",model_id:"eleven_multilingual_v2"});
      return audio;
    } catch (error) {
      throw new HttpException(
        { message: 'error generating Aduio' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
