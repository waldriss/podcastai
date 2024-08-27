import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/db/prisma.module';


@Module({
    imports:[PrismaModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {};