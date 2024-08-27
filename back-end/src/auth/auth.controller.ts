import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Get("/users")
    async get(){
        const a=await this.authService.test();
        console.log(a);
        return await this.authService.test();

    }

    
}