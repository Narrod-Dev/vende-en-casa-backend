import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
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
    @IsNotEmpty()
    @ApiProperty()
    role: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    is_active: boolean;

    @IsString()
    @IsOptional()
    @ApiProperty()
    created_at:string;

}
