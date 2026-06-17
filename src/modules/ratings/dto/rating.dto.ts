import { ApiProperty, PartialType } from "@nestjs/swagger";
import { 
    IsInt, 
    IsNotEmpty, 
    IsOptional, 
    IsPositive, 
    IsString } 
    from "class-validator";

export class CreateRatingDto{
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    reviewee_id: number;
    
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    product_id: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    score: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    comment: string;
}

export class UpdateRatingDto extends PartialType(CreateRatingDto){}
