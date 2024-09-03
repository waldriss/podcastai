import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/db/prisma.module';
import { ClerkModule } from 'src/clerk/clerk.module';
import { AuthGuard } from './auth.guard';


@Module({
    imports:[PrismaModule,ClerkModule],
    controllers: [AuthController],
    providers: [AuthService,AuthGuard],
    exports:[AuthGuard]
})
export class AuthModule {};