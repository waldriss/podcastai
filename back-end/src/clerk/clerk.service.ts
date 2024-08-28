import { ClerkClient, createClerkClient } from '@clerk/clerk-sdk-node';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class ClerkService {
  private clerkClient: ClerkClient;

  constructor(private readonly configService: ConfigService) {
    this.clerkClient = createClerkClient({
      secretKey: this.configService.get<string>('CLERK_SECRET_KEY'), // Access environment variable via ConfigService
    });
  }
  async getUsers() {
    try {
      const user = await this.clerkClient.users.getUser(
        'user_2lHvrJK8yp2K7laBkfTHzRtuxnE',
      );

      return await this.clerkClient.users.getCount();
    } catch (error) {
      throw new HttpException(
        { message: 'Error caugh' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createUser({ email, userId, password }: CreateUserDto) {
    try {
      const clerkCreatedUser = await this.clerkClient.users.createUser({
        externalId: userId,
        emailAddress: [email],
        password: password,
      });
      return clerkCreatedUser
    } catch (error) {
      throw error
    }
  }
}
