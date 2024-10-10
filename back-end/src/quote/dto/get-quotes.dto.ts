import { IsNotEmpty, IsString } from "class-validator";



export class GetQuotesParamsDto{
    @IsString()
    search:string
}