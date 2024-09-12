import { Module } from '@nestjs/common';
import { AudioAiService } from './audioai.service';
import { AudioAiController } from './audioai.controller';

@Module({
    controllers: [AudioAiController],
    providers: [AudioAiService],
    exports: [AudioAiService],
})
export class AudioAiModule {
    
};