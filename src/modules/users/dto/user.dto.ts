import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    last_name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    full_name?: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    location?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    roleId?: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
