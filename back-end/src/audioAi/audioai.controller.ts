import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AudioAiService } from './audioai.service';
import { GenerateAudioDto } from './dto/generateAudio.dto';
import { PassThrough } from 'stream';

@Controller('')
export class AudioAiController {
  constructor(private readonly audioAiService: AudioAiService) {}

  @Post('/generate-audio')
  async generateAudio(@Body() {voice,input}: GenerateAudioDto, @Res() res: Response) {
    try {
      
      const audio = await this.audioAiService.generateAudio({ voice, input });
      const passThrough = new PassThrough();
      audio.pipe(passThrough);
      res.setHeader('Content-Type', 'audio/mpeg'); // Set the correct MIME type
      res.setHeader('Content-Disposition', 'attachment; filename=audio.mp3'); // Optional: set a filename
  
      
      passThrough.pipe(res);
      
    } catch (error) {
      throw error
      
    }

  }
}