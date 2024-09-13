import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ImageAiService } from './imageai.service';
import { Response } from 'express';

@Controller('')
export class ImageAiController {
  constructor(private readonly imageAiService: ImageAiService) {}
  @Post('generate-image')
  async generateImage(@Body('prompt') prompt: string, @Res() res: Response) {
    const imageData = await this.imageAiService.generateImage(prompt);
    res.setHeader('Content-Type', 'image/png'); // Assuming the image is in PNG format, adjust accordingly
    res.setHeader('Content-Disposition', 'inline'); // To display inline, or change to 'attachment' to trigger download

    return res.send(imageData); 
    return imageData;
  }
}
