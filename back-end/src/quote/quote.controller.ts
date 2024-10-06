import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateQuoteParamsDto } from './dto/create-quote.dto';
import { QuoteService } from './quote.service';
import { AuthenticatedUserId } from 'src/auth/authenticated-user-id.decorator';

@Controller('')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post('create-quote')
  @UseInterceptors(AnyFilesInterceptor())
  async createQuote(
    @Body() createQuoteParamsDto: CreateQuoteParamsDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @AuthenticatedUserId() authId: number
  ) {
    const audioFile = files.find(file => file.fieldname === 'audioFile');
    const imageFile = files.find(file => file.fieldname === 'imageFile');

    return this.quoteService.createQuote({...createQuoteParamsDto,audioFile,imageFile},authId)
  }

  @Get('trending-quotes')
  async getTrendingQuotes(){
    return this.quoteService.getTrendingQuotes();

  }
  @Get('/quotes/:id')
  async getQuoteById(@Param('id', ParseIntPipe) id: number){
    return this.quoteService.getQuoteById(id);

  }
}
