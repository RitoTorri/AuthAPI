import { IsInt, Min, Max, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
    @IsBoolean()
    @Type(() => Boolean) // Convierte el string "true" a boolean
    active: boolean = true;

    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number = 1;

    @IsInt()
    @Min(1)
    @Max(100) // <--- AQUÍ pones el límite máximo permitido
    @Type(() => Number)
    limit: number = 10;
}