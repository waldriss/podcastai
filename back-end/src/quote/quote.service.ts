import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuoteParams } from './types/quote.type';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/db/prisma.service';
import { VoiceName } from 'src/shared/types';

@Injectable()
export class QuoteService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private prisma: PrismaService,
  ) {}
  async createQuote(
    {
      audioDuration,
      audioFile,
      imageFile,
      imagePrompt,
      quoteDescription,
      quoteTitle,
      views,
      voicePrompt,
      voiceType,
    }: CreateQuoteParams,
    authId: number,
  ) {
    try {
      const [imageUrl, audioUrl] = await Promise.all([
        this.cloudinaryService.uploadImage(imageFile),
        this.cloudinaryService.uploadAudio(audioFile),
      ]);
      const createdQuote = await this.prisma.quote.create({
        data: {
          audioUrl,
          imageUrl,
          audioDuration,
          description: quoteDescription,
          imagePrompt,
          title: quoteTitle,
          views: 0,
          voicePrompt,
          voiceType,
          userId: authId,
        },
      });

      return { message: 'quote created sucessfully' };
    } catch (error) {
      throw new HttpException(
        { message: `Error creating quote:${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getTrendingQuotes() {
    try {
      const quotes = await this.prisma.quote.findMany({
        select: {
          id: true,
          description: true,
          title: true,
          imageUrl: true,
        },
        take: 20,
      });
      return { quotes };
    } catch (error) {
      throw new HttpException(
        { message: `Error getting trending quotes:${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getQuotesByVoice(voice:VoiceName) {
    try {
      const quotes = await this.prisma.quote.findMany({
        select: {
          id: true,
          description: true,
          title: true,
          imageUrl: true,
        },
        where:{
          voiceType:voice
        },
        take: 20,
      });
      return { quotes };
    } catch (error) {
      throw new HttpException(
        { message: `Error getting quotes by voice:${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getQuoteById(id: number) {
    try {
      const quote = await this.prisma.quote.findUnique({
        where: {
          id: id,
        },
        include:{
          user:{
            select:{
              id:true,
              name:true,
              imageUrl:true
            }
          }
        }
      });
      
      return {quote}
    } catch (error) {
      throw new HttpException(
        { message: `Error getting quote by id:${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
