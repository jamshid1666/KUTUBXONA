import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class QueryBookDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    title: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    author: string;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    published_year: number;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return undefined;
    })
    available: boolean;
}
