import { IsString, MinLength, MaxLength, Matches, IsNotEmpty, } from 'class-validator';

export class RoleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    @Matches(/^[a-zA-Z/s]*$/)
    name: string;
}
