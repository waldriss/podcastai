import { Injectable } from '@nestjs/common';
import { ClerkService } from 'src/clerk/clerk.service';
import { RegisterUserDto } from 'src/db/dto/register-user.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly clerkService: ClerkService,
  ) {}

  async registerUser({ email, password, name }: RegisterUserDto) {
    const userWithEmail = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (userWithEmail) {
      return { message: 'Email already in use. Please choose another.' };
    }
    const createduser = await this.prisma.user.create({
      data: { email: email, password: password, name: name },
    });
    if (createduser) {
    }
  }
  async test() {
    await this.clerkService.getUsers();
  }
}
