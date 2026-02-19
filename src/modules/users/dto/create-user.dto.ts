import { IsString, MinLength, MaxLength, Matches, IsNotEmpty, IsNumber, Min, IsEmail, } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    roleId: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    @Matches(/^[a-zA-Z]+$/, { message: 'Username must contain only letters' })
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @MinLength(15)
    @MaxLength(100)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(255)
    password: string;
}