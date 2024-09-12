import { Module } from '@nestjs/common';
import { ImageAiController } from './imageai.controller';
import { ImageAiService } from './imageai.service';
import { HttpModule } from '@nestjs/axios';


@Module({
    imports:[HttpModule],
    controllers: [ImageAiController],
    providers: [ImageAiService],
    exports: [ImageAiService],
})
export class ImageAiModule {};