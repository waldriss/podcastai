import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getTopAuthors() {
    try {
      const topAuthors = await this.prisma.user.findMany({
        where:{
            quotes:{
                some:{}
            }
        }
        ,
        orderBy: {
          quotes: {
            _count: 'desc',
          },
        },
        include: {
          quotes: {
            select: {
              id: true,
              title: true,
              imageUrl: true,
            },
            orderBy: {
              views: 'desc',
            },
            take: 1,
          },
          _count:{
            select:{
                quotes:true
            }
          }
        },
        take: 3,
      });
     
      return {topAuthors}
    } catch (error) {
      throw new HttpException(
        { message: `Error getting explore Top Authors:${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
