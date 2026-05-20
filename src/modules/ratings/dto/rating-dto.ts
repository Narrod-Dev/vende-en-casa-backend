import { ApiProperty } from "@nestjs/swagger";
import { 
    IsInt, 
    IsNotEmpty, 
    IsOptional, 
    IsPositive, 
    IsString } 
    from "class-validator";



export class RatingDto{
    @IsInt()
    @IsPositive()
    @IsOptional()
    @ApiProperty()
    reviewer_id: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    @ApiProperty()
    reviewee_id: number;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
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

    @IsString()
    @IsOptional()
    @ApiProperty()
    created_at: string;

}
