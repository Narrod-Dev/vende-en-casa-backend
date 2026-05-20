import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
