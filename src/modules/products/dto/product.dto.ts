import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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

}
export class UpdateProductDto extends PartialType(CreateProductDto) {
// Permite actualizar el estado del producto (Sold,Reserved... etc)
// Antes se solicitaba el status al crear el producto pero ya no era necesario
// Ahora el backend asigna automaticamente "Available" al crear un producto
// Este campo permitirá cambios de estado mediante PATCH luego de la creación del producto
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  status?: string;
}
