import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
    private openAi:OpenAI
    constructor(private readonly configService: ConfigService) {
        this.openAi= new OpenAI({apiKey:this.configService.get<string>('OPENAI_API_KEY')})
    }
    
}