import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Voice } from "src/shared/types";



export class CreateQuoteParamsDto{
    @IsNotEmpty()
    @IsString()
    quoteTitle:string;
    @IsNotEmpty()
    @IsString()
    quoteDescription:string;
    @IsNotEmpty()
    @IsString()
    imagePrompt:string;
    @IsNotEmpty()
    @IsString()
    voicePrompt:string;
    @IsNotEmpty()
    @IsString()
    voiceType:Voice;
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    views:number
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    audioDuration:number;
    audioFile:Express.Multer.File
    imageFile:Express.Multer.File
}