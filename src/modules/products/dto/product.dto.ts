import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  seller_id: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  category_id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  condition: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  status: string;

}
export class UpdateProductDto extends PartialType(CreateProductDto) {}