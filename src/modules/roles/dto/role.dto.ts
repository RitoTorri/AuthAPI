import { IsString, MinLength, MaxLength, Matches, IsNotEmpty, } from 'class-validator';
<<<<<<< HEAD
=======
import { Transform } from 'class-transformer';
>>>>>>> desarrollo

export class RoleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    @Matches(/^[a-zA-Z/s]*$/)
<<<<<<< HEAD
=======
    @Transform(({ value }) => value.toLowerCase())
>>>>>>> desarrollo
    name: string;
}
