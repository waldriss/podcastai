import { ClerkClient, createClerkClient } from '@clerk/clerk-sdk-node';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class ClerkService {
  private clerkClient: ClerkClient;

  constructor(private readonly configService: ConfigService) {
    this.clerkClient = createClerkClient({
      secretKey: this.configService.get<string>('CLERK_SECRET_KEY'), // Access environment variable via ConfigService
    });
  }

  async createUser({ email, userId, password }: CreateUserDto) {
    try {
     
      const clerkCreatedUser = await this.clerkClient.users.createUser({
        externalId: userId,
        emailAddress: [email],
        password: password,
      });
      return clerkCreatedUser;
    } catch (error) {
    
      throw new HttpException(
        { message: 'Error creating clerk user' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser({ userId, externalId }: UpdateUserDto) {
    try {
   
      const updatedUser = await this.clerkClient.users.updateUser(userId, {
        externalId: externalId,
      });
      return { message: 'user created' };
    } catch (error) {
     
      throw new HttpException(
        { message: 'Error updating clerk user' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
