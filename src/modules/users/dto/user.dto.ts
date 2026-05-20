import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password_hash: string;

    @IsNotEmpty()
    @IsNotEmpty()
    @ApiProperty()
    location:string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    role: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    is_active: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
