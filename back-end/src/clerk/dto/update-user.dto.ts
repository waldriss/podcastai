import { IsNotEmpty } from "class-validator";


export class UpdateUserDto{
    @IsNotEmpty()
    userId:string;
    @IsNotEmpty()
    externalId:string;
    
}