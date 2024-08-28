import { Injectable } from '@nestjs/common';
import { ClerkService } from 'src/clerk/clerk.service';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { PrismaService } from 'src/db/prisma.service';
import { SigInOrSignUpGoogleDto } from './dto/auth-google-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly clerkService: ClerkService,
  ) {}

  async registerUser({ email, password, name }: RegisterUserDto) {
    try {
      const userWithEmail = await this.prisma.user.findUnique({
        where: { email: email },
      });
      if (userWithEmail) {
        return { message: 'Email already in use. Please choose another.' };
      }
      const createduser = await this.prisma.user.create({
        data: { email: email, name: name },
      });
      if (createduser) {
        const clerkCreatedUser = await this.clerkService.createUser({
          email,
          password,
          userId: createduser.id.toString(),
        });
        return { message: 'user created' };
      }
    } catch (error) {
      throw error;
    }
  }
  async SigInOrSignUpGoogle({ email, name, userId }: SigInOrSignUpGoogleDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });
      if (user) {
        const updatedUser = await this.prisma.user.update({
          where: { email: email },
          data: {
            name: name,
          },
        });

        return { message: 'user updated' };
      } else {
        const createduser = await this.prisma.user.create({
          data: { name: name, email: email },
        });
        const clerkUpdatedUser = await this.clerkService.updateUser({
          userId,
          externalId: createduser.id.toString(),
        });
      }
    } catch (error) {
      throw error;
    }
  }
 
}
