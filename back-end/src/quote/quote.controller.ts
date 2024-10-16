import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateQuoteParamsDto } from './dto/create-quote.dto';
import { QuoteService } from './quote.service';
import { AuthenticatedUserId } from 'src/auth/authenticated-user-id.decorator';
import { GetQuoteByVoiceDTO } from './dto/get-quotes-by-voice.dto';
import { GetQuotesParamsDto } from './dto/get-quotes.dto';

@Controller('')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post('create-quote')
  @UseInterceptors(AnyFilesInterceptor())
  async createQuote(
    @Body() createQuoteParamsDto: CreateQuoteParamsDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @AuthenticatedUserId() authId: number,
  ) {
    const audioFile = files.find((file) => file.fieldname === 'audioFile');
    const imageFile = files.find((file) => file.fieldname === 'imageFile');

    return this.quoteService.createQuote(
      { ...createQuoteParamsDto, audioFile, imageFile },
      authId,
    );
  }

  @Get('trending-quotes')
  async getTrendingQuotes() {
    return this.quoteService.getTrendingQuotes();
  }
  @Get('quotes-by-voice')
  async getQuotesByVoice(@Query() query: GetQuoteByVoiceDTO) {
    if (
      query.voice == 'Brian' ||
      query.voice == 'Bill' ||
      query.voice == 'George' ||
      query.voice == 'Lilly'
    )
      return this.quoteService.getQuotesByVoice(query.voice);
    else {
      throw new BadRequestException('Invalid voice type. Must be one of: Brian, Bill, George, or Lilly.');

    }
  }
  @Get('quotes/:id')
  async getQuoteById(@Param('id', ParseIntPipe) id: number) {
    return this.quoteService.getQuoteById(id);
  }
  @Get('quotes')
  async getQuotes(@Query() query: GetQuotesParamsDto) {
    return this.quoteService.getQuotes(query.search);
  }
  @Delete('quote-delete/:id')
  async deleteQuote(
    @Param('id', ParseIntPipe) id: number,
    @AuthenticatedUserId() authId: number,
  ) {
    return await this.quoteService.deleteQuote(id, authId);
  }
}
