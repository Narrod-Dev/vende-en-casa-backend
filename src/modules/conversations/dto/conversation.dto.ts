import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateConversationDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  product_id: number;
}

export class UpdateConversationDto {}
