import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { SigInOrSignUpGoogleDto } from './dto/auth-google-user.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async register(@Body() registerUserDto:RegisterUserDto) {
    return this.authService.registerUser(registerUserDto)
  }
  @Post('/SigInOrSignUpGoogle')
  async SigInOrSignUpGoogle(@Body() sigInOrSignUpGoogleDto:SigInOrSignUpGoogleDto) {
    return this.authService.SigInOrSignUpGoogle(sigInOrSignUpGoogleDto)
  }
}
