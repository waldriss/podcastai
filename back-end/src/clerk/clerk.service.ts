import { ClerkClient, createClerkClient } from '@clerk/clerk-sdk-node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClerkService {
  private clerkClient: ClerkClient;

  constructor(private readonly configService: ConfigService) {
    this.clerkClient = createClerkClient({
      secretKey: this.configService.get<string>('CLERK_SECRET_KEY'), // Access environment variable via ConfigService
    });
  }
  async getUsers() {
    console.log('its !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! work');
    console.log('its !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! work');
    console.log('its !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! work');
    return await this.clerkClient.users.getCount();
    
  }
  
}
