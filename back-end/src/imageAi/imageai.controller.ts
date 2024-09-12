import { Controller, Get, Query } from '@nestjs/common';
import { ImageAiService } from './imageai.service';

@Controller('')
export class ImageAiController {
  constructor(private readonly imageAiService: ImageAiService) {}
  @Get('generate-image')
  async generateImage(@Query('prompt') prompt: string) {
    const imageData = await this.imageAiService.generateImage(prompt);
    return imageData; // Send the image back to the frontend
  }
}
