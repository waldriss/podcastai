import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/db/prisma.service';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports:[PrismaService]
})
export class UserModule {};