import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/dtos/auth.dtos';
import { BaseDto } from 'src/dtos/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    // 🔹 hanya untuk testing (echo request)
    testRegister(body: RegisterDto): RegisterDto {
        return {
            email: body.email,
            password: body.password,
            confirmPassword: body.confirmPassword,
        };
    }

    // 🔹 Register user baru
    async userRegister(body: RegisterDto): Promise<BaseDto> {

        if (body.password !== body.confirmPassword) {
            throw new UnauthorizedException('Password and Confirm Password do not match');
        }
        const existingUser = await this.prisma.user.findUnique({ where: { email: body.email } });
        if (existingUser) {
            throw new UnauthorizedException('Email already in use');
        }
        // hash password dulu
        const hashed = await bcrypt.hash(body.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: body.email,
                password: hashed,
            },
        });

        return {
            id: user.id, // pake id asli dari DB
            statusCode: 201,
            message: 'User registered successfully',
            timestamp: new Date(),
            payload: {
                email: user.email,
            },
        };
    }

    // 🔹 Login user
    async userLogin(email: string, password: string): Promise<BaseDto> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
        });

        return {
            id: user.id,
            statusCode: 201,
            message: 'Login success',
            timestamp: new Date(),
            payload: { access_token: token },
        };
    }

    async validateUser(userId: string) {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }

}
