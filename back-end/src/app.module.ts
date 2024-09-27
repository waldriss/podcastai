import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AudioAiModule } from './audioAi/audioai.module';
import { ImageAiModule } from './imageAi/imageai.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true, // Make ConfigModule available globally
  }),AuthModule,AudioAiModule,ImageAiModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService,  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule {}
