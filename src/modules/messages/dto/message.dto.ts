import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, 
    IsPositive, IsString,  } from "class-validator";



export class CreateMessageDto{
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    conversation_id: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    sender_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    content: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    sent_at: string;
    
    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    is_read: boolean;

}

export class UpdateMessageDto extends 
PartialType(CreateMessageDto){}