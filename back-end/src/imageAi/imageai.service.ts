import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpServer,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageAiService {
  private cloudflareUrl: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService, // Import HttpService
  ) {
    this.cloudflareUrl = this.configService.get<string>('CLOUDFLARE_AI_URL'); // e.g., 'https://your-worker-url/'
  }
  async generateImage(prompt: string): Promise<any> {
    const url = `${this.cloudflareUrl}?prompt=${encodeURIComponent(prompt)}`; // Pass prompt in query string for GET request

    try {
      const response = await this.httpService.get(url);
      console.log(response);
      return response;
    } catch (error) {
      throw new HttpException(
        { message: `Failed to generate image: ${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
