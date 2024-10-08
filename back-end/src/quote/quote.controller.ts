import {
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
    return this.quoteService.getQuotesByVoice(query.voice);
  }
  @Get('quotes/:id')
  async getQuoteById(@Param('id', ParseIntPipe) id: number) {
    return this.quoteService.getQuoteById(id);
  }
  @Get("quotes")
  async getQuotes(){
    
  }
  @Delete('quote-delete/:id')
  async deleteQuote(
    @Param('id', ParseIntPipe) id: number,
    @AuthenticatedUserId() authId: number,
  ) {
    return await this.quoteService.deleteQuote(id, authId);
  }
}
