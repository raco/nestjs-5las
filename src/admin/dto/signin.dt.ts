import {
    IsString,
    MaxLength,
    MinLength,
    IsEmail,
    Matches,
} from 'class-validator';

export class SignInDto {
    @IsString()
    @MinLength(4)
    @MaxLength(200)
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(40)
    password: string; // Mayuscula, numero y caracterespecial
}
