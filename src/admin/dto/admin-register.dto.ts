import {
    IsString,
    MaxLength,
    MinLength,
    IsEmail,
    Matches,
    IsNumber,
    Length,
} from 'class-validator';

export class AdminRegisterDto {
    @IsString()
    @MinLength(4)
    @MaxLength(200)
    fullname: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    dni: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    phone: string;

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


    @Length(11)
    ruc: string;

    @IsString()
    @MinLength(4)
    @MaxLength(200)
    business_name: string;

    @IsString()
    @MinLength(4)
    @MaxLength(200)
    branch_name: string;

    @IsString()
    @MinLength(4)
    @MaxLength(200)
    branch_address: string;

    @IsString()
    @MinLength(4)
    @MaxLength(200)
    branch_lat: string;

    @IsString()
    @MinLength(4)
    @MaxLength(200)
    branch_lng: string;

    @IsNumber()
    branch_district_id: number;
}
