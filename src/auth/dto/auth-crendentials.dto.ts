import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  Matches,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(200)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(40)
  password: string; // Mayuscula, numero y caracterespecial
}
