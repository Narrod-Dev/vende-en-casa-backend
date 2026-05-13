import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductImageDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  product_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  image_url: string;

  @IsBoolean()
  @ApiProperty()
  is_main: boolean;
}

export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {}