import { IsString, MinLength, MaxLength, Matches, IsNotEmpty, IsNumber, Min, IsEmail, } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    roleId: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    @Matches(/^[a-zA-Z\s]+$/, { message: 'name must contain only letters' })
    @Transform(({ value }) => value.toLowerCase())
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