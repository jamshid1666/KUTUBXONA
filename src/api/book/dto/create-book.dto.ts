import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    published_year: number;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    available: boolean;
}
