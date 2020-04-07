import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  Matches,
  IsNumber,
} from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @MinLength(4)
  @MaxLength(200)
  fullname: string;

  @IsString()
  @MinLength(4)
  @MaxLength(200)
  address: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  dni: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1)
  gender: string;

  @IsString()
  @MinLength(4)
  @MaxLength(200)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(40)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password is too weak',
  // })
  password: string; // Mayuscula, numero y caracterespecial

  @IsNumber()
  district_id: number;
}
