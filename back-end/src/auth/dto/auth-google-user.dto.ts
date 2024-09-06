import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthWithGoogleDto {
  @IsNotEmpty()
  readonly userId: string;
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
