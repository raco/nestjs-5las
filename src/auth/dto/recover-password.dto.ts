import {
    IsString,
    MaxLength,
    MinLength,
    IsEmail,
} from 'class-validator';

export class RecoverPasswordDto {
    @IsString()
    @MinLength(4)
    @MaxLength(200)
    @IsEmail()
    email: string;
}
