import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/db/dto/register-user.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
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
}
