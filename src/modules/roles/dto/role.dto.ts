import { IsString, MinLength, MaxLength, Matches, IsNotEmpty, } from 'class-validator';
import { Transform } from 'class-transformer';

export class RoleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    @Matches(/^[a-zA-Z/s]*$/)
    @Transform(({ value }) => value.toLowerCase())
    name: string;
}
