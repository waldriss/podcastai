import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpServer,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ImageAiService {
  private cloudflareUrl: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService, // Import HttpService
  ) {
    this.cloudflareUrl = this.configService.get<string>('CLOUDFLARE_AI_URL'); 
  }
  async generateImage(prompt: string): Promise<any> {
    const url = `${this.cloudflareUrl}?prompt=${encodeURIComponent(prompt)}`; 

    try {
      const response = await lastValueFrom(this.httpService.get(url,{timeout:20000}));
      
      return response.data;
    } catch (error) {
      throw new HttpException(
        { message: `Failed to generate image: ${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
