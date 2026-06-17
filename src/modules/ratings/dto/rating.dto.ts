import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateRatingDto {
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
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  @ApiProperty()
  score: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  comment: string;
}

export class UpdateRatingDto extends PartialType(
  OmitType(CreateRatingDto, ['reviewee_id', 'product_id'] as const),
) {}
