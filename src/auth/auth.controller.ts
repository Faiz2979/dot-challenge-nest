import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiResponseWithBase } from 'src/common/swagger-response-decorator';
import { JwtResponsePayload, LoginDto, RegisterDto, RegisterDtoResponsePayload } from '../dtos/auth.dtos';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiBody({ type: RegisterDto })
    @ApiResponseWithBase(RegisterDtoResponsePayload) // 👈 cukup panggil ini
    @HttpCode(201)
    userRegister(@Body() body: RegisterDto) {
        return this.authService.userRegister(body);
    }

    @Post('login')
    @ApiBody({ type: LoginDto })
    @ApiResponseWithBase(JwtResponsePayload)
    @HttpCode(201)
    userLogin(@Body() body: LoginDto) {
        return this.authService.userLogin(body);
    }

    @Delete('delete-user')
    @ApiBody({ schema: { example: { id: 'user-id-to-delete' } } })
    @HttpCode(200)
    deleteUser(@Body('id') userId: string) {
        return this.authService.deleteUser(userId);
    }
}
