import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
        const uniqueName = `${uuidv4()}`;
        const imageFormat = file.mimetype.split("/")[1] || "jpeg";
        const base64Image = `data:image/${imageFormat};base64,${file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64Image, {
          public_id: uniqueName,
          folder: 'quotes/thumbnails',
          format: 'webp',
        });
        return result.secure_url;
        
    } catch (error) {
        throw new HttpException(
            { message: `Error uploading the image` },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
   
  }

  async uploadAudio(file: Express.Multer.File): Promise<string> {
    try {
        const uniqueName = `${uuidv4()}`;
        const audioFormat = file.mimetype.split("/")[1] || "mp3";
        const base64Audio = `data:audio/${audioFormat};base64,${file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64Audio, {
          public_id: uniqueName,
          resource_type: 'video', // Audio is treated as video in Cloudinary
          folder: 'quotes/audios', // Optional: specify a folder in Cloudinary
        });
        return result.secure_url; 
        
    } catch (error) {
        throw new HttpException(
            { message: `Error uploading the audio` },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        
    }

  }
}
