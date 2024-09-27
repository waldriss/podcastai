import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { PrismaModule } from 'src/db/prisma.module';


@Module({
    imports:[
        MulterModule.register({
            storage: multer.memoryStorage(), // Use memory storage to keep files in memory as buffer
          }),
          CloudinaryModule,PrismaModule
    ],
    controllers: [QuoteController],
    providers: [QuoteService],
})
export class QuoteModule {};