import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseDto } from './base.dto';

/**
 * Register DTO
 */
export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    confirmPassword: string;
}


/**
 * Login DTO
 */
export class LoginDto {
    @IsEmail()
    email: string;

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


class JwtResponsePayload {
    accessToken: string;
    refreshToken?: string; // kalau pakai refresh token
}

export class JwtResponseDto extends BaseDto<JwtResponsePayload> { }

