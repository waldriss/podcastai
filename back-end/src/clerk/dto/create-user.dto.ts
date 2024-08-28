import { IsNotEmpty } from "class-validator";
import { UserWithoutNameDto } from "src/shared/dto/user-without-name.dto";


export class CreateUserDto extends UserWithoutNameDto{
    @IsNotEmpty()
    userId:string;
    
}