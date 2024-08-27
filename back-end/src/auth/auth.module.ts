import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/db/prisma.module';
import { ClerkModule } from 'src/clerk/clerk.module';


@Module({
    imports:[PrismaModule,ClerkModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {};