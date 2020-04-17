import {
    IsString,
    MaxLength,
    MinLength,
    IsEmail,
    Matches,
} from 'class-validator';

export class ResetPasswordDto {
    @IsString()
    token: string;

    @IsString()
    @MinLength(6)
    @MaxLength(40)
    password: string; // Mayuscula, numero y caracterespecial
}
