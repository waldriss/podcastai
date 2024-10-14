import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService,private cloudinaryService:CloudinaryService) {}
  async getTopAuthors() {
    try {
      const topAuthors = await this.prisma.user.findMany({
        where: {
          quotes: {
            some: {},
          },
        },
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
            take: 3,
          },
          _count: {
            select: {
              quotes: true,
            },
          },
        },
        take: 3,
      });

      return { topAuthors };
    } catch (error) {
      throw new HttpException(
        { message: `Error getting explore Top Authors:${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAuthor(id: number) {
    try {
      
      const author = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          quotes: {
            select: {
              id: true,
              title: true,
              imageUrl: true,
              audioUrl:true,
              views:true,
              description:true,
            },
          },
          _count: {
            select: {
              quotes: true,
            },
          },
        },
      });
      

      return { author };
    } catch (error) {
      throw new HttpException(
        { message: `Error getting Author:${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async changeProfileImage(imageFile: Express.Multer.File,id:number){
    try {
      
      const existingUser=this.prisma.user.findUnique({where:{id:id}});
      if(existingUser){
        const imageUrl= await this.cloudinaryService.uploadProfileImage(imageFile);
        await this.prisma.user.update({
          where:{
            id:id
          },
          data:{
            imageUrl:imageUrl
          }
        });
        return {"message":"profile image changed Sucessfully"}

      }else{
        throw Error("user does not exist")
      }
      
    } catch (error) {
      throw new HttpException(
        { message: `Error changing profile pic:${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      
    }

  }
}
