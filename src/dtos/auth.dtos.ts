import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseDto } from './base.dto';

/**
 * Register DTO
 */
export class RegisterDto {

    @ApiProperty({ example: 'johndoe@example.com', description: 'User email' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'johndoe', description: 'Unique username' })
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'password123', description: 'User password (min 8 characters)' })
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'password123', description: 'Confirm user password' })
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    confirmPassword: string;
}

export class RegisterDtoResponsePayload {
    @ApiProperty({ example: 'johndoe', description: 'User username' })
    @IsString()
    username: string;

    @ApiProperty({ example: 'johndoe@example.com', description: 'User email' })
    @IsEmail()
    email: string;
}

export class RegisterDtoResponse extends BaseDto<RegisterDtoResponsePayload> { }
/**
 * Login DTO
 */
export class LoginDto {
    @ApiProperty({ example: 'johndoe@example.com', description: 'User email' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'User password (min 8 characters)' })
    @IsString()
    @IsNotEmpty()
    password: string;
}

/**
 * Refresh Token DTO
 * (kalau kamu implementasi refresh token)
 */
export class RefreshTokenDto extends BaseDto {
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}

/**
 * JWT Payload
 * (isi token yang di-*sign* dan di-*verify*)
 */

export class JwtPayloadDto {
    uid: string;     // user.id (uuid dari prisma)
    email: string;
    exp?: number;    // diisi otomatis oleh JWT
    iat?: number;    // diisi otomatis oleh JWT
}


export class JwtResponsePayload {
    @ApiProperty({ example: 'jwt-access-token', description: 'JWT Access Token' })
    @IsString()
    accessToken: string;

    @ApiProperty({ example: 'jwt-refresh-token', description: 'JWT Refresh Token' })
    @IsString()
    refreshToken?: string; // kalau pakai refresh token
}

export class JwtResponseDto extends BaseDto<JwtResponsePayload> { }

