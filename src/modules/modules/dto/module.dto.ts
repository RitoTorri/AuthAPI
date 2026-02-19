import { IsString, MinLength, MaxLength, Matches, IsNotEmpty, } from 'class-validator';

export class ModuleDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @Matches(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' })
    name: string;
}
