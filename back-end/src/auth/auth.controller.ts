import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

import { AuthenticatedUserId } from './authenticated-user-id.decorator';
import { AuthWithGoogleDto } from './dto/auth-google-user.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }
  @Post('/auth-google')
  async sigInOrSignUpGoogle(
    @Body() authWithGoogleDto: AuthWithGoogleDto,
  ) {
    return this.authService.authWithGoogle(authWithGoogleDto);
  }
  @Get('/auth/:id')
  async getAuthenticatedUser(
    @Param('id', ParseIntPipe) id: number,
    @AuthenticatedUserId() authId: number,
  ) {
   
    if (id != authId) {
      throw new HttpException(
        { message: 'UnAuthorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.authService.getAuthenticatedUser({id})
  }
}
