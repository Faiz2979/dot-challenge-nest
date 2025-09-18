import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterDto } from 'src/dtos/auth.dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('test')
    @HttpCode(200)
    UserRegister(@Body() body: RegisterDto): RegisterDto {
        return this.authService.testRegister(body);
    }

    @Post('register')
    @HttpCode(201)
    userRegister(@Body() body: RegisterDto) {
        return this.authService.userRegister(body);
    }

    @Post('login')
    @HttpCode(201)
    userLogin(@Body() body: { email: string; password: string }) {
        return this.authService.userLogin(body.email, body.password);
    }
}
