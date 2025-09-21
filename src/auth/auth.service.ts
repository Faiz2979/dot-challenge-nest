import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto, JwtResponseDto, LoginDto, RegisterDto, RegisterDtoResponse } from '../dtos/auth.dtos';
import { BaseDto } from '../dtos/base.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    // 🔹 hanya untuk testing (echo request)
    testRegister(body: RegisterDto): RegisterDto {
        return {
            username: body.username,
            email: body.email,
            password: body.password,
            confirmPassword: body.confirmPassword,
        };
    }

    // 🔹 Register user baru
    async userRegister(body: RegisterDto): Promise<RegisterDtoResponse> {

        if (body.password !== body.confirmPassword) {
            throw new BadRequestException('Password dan Confirm Password tidak sesuai');
        }
        // Check if email already exists
        const existingEmail = await this.prisma.user.findUnique({ where: { email: body.email } });
        if (existingEmail) {
            throw new BadRequestException('Email sudah terdaftar');
        }

        // Check if username already exists
        const existingUsername = await this.prisma.user.findUnique({ where: { username: body.username } });
        if (existingUsername) {
            throw new BadRequestException('Username sudah terdaftar');
        }

        // hash password dulu
        const hashed = await bcrypt.hash(body.password, 10);

        const user = await this.prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashed,
            },
        });

        return {
            id: user.id, // pake id asli dari DB
            message: 'User registered successfully',
            payload: {
                username: user.username,
                email: user.email,
            },
            statusCode: 201,
            timestamp: new Date(),
        };
    }

    // 🔹 Login user
    async userLogin(body: LoginDto): Promise<JwtResponseDto> {
        const user = await this.prisma.user.findUnique({ where: { email: body.email } });
        if (!user) throw new UnauthorizedException('Email atau Password Salah');

        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Email atau Password Salah');

        const payload: JwtPayloadDto = {
            uid: user.id,
            email: user.email,
        };

        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });


        return {
            id: user.id,
            statusCode: 200,
            message: 'Login success',
            timestamp: new Date(),
            payload: {
                accessToken,
                refreshToken,
            },
        };
    }

    async validateUser(userId: string) {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }

    // just for testing purpose
    async deleteUser(userId: string): Promise<BaseDto> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new BadRequestException('User tidak ditemukan');
        await this.prisma.user.delete({ where: { id: userId } });
        return {
            id: userId,
            message: 'User berhasil dihapus',
            statusCode: 200,
            timestamp: new Date(),
        };
    }

    async refreshToken(userId: string): Promise<JwtResponseDto> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new UnauthorizedException('User tidak ditemukan');

        const payload: JwtPayloadDto = {
            uid: user.id,
            email: user.email,
        };

        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

        return {
            id: user.id,
            statusCode: 200,
            message: 'Token berhasil di-refresh',
            timestamp: new Date(),
            payload: {
                accessToken,
                refreshToken,
            },
        };
    }
}
