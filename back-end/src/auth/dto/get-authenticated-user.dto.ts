import { IsNotEmpty } from "class-validator";



export class GetAuthenticatedUserParam{
    @IsNotEmpty()
    id:number

}