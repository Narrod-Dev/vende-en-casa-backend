import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateMessageDto {
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
}

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  is_read?: boolean;
}
