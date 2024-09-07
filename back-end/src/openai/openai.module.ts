import { Module } from '@nestjs/common';
import { OpenAiService } from './openai.service';

@Module({
    controllers: [],
    providers: [OpenAiService],
    exports: [OpenAiService],
})
export class OpenAiModule {
    
};