import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigInOrSignUpGoogleDto {
  @IsNotEmpty()
  readonly userId: string;
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
