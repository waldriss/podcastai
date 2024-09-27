import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateQuoteParamsDto } from './dto/create-quote.dto';
import { QuoteService } from './quote.service';

@Controller('')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post('create-quote')
  @UseInterceptors(AnyFilesInterceptor())
  createQuote(
    @Body() createQuoteParamsDto: CreateQuoteParamsDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const audioFile = files.find(file => file.fieldname === 'audioFile');
    const imageFile = files.find(file => file.fieldname === 'imageFile');

    return this.quoteService.createQuote({...createQuoteParamsDto,audioFile,imageFile})
  }
}
