import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { OpenAiService } from './openai.service';
import { GenerateAudioDto } from './dto/generateAudio.dto';

@Controller('')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post('/generate-audio')
  async generateAudio(@Body() {voice,input}: GenerateAudioDto, @Res() res: Response) {
    try {
      console.log("called")
      const audioBuffer = await this.openAiService.generateAudio({ voice, input });
    
      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="audio.mp3"',
        'Content-Length': audioBuffer.length,
      });
  
      res.send(audioBuffer);
      
    } catch (error) {
      throw error
      
    }

  }
}