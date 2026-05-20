import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsPositive, isPositive } from "class-validator";




export class CreateConversationDto {
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    product_id: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    buyer_id: number;
    
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    seller_id: number;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    created_at: Date;
}

export class UpdateConversationDto extends
PartialType(CreateConversationDto){}