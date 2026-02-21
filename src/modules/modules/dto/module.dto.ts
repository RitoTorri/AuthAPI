import { Transform } from 'class-transformer';
import { IsString, MinLength, MaxLength, Matches, IsNotEmpty, IsLowercase, } from 'class-validator';

export class ModuleDto {
    @IsNotEmpty()
    @IsLowercase()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @Matches(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' })
    @Transform(({ value }) => value.toLowerCase())
    name: string;
}
