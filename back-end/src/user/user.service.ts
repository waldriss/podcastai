import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {
        
    }
    async getTopPodcasters(){
        try {
            const topPodcasters=await this.prisma.user.findMany({
                take:5
                
            })
            
        } catch (error) {
            throw new HttpException(
                { message: `Error getting podcaster:${error.message}` },
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            
        }

    }
    
}