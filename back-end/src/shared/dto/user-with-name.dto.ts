import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserWithNameDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
