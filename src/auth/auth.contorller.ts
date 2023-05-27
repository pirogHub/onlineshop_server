import { AuthService } from './auth.service';
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh.dto';
import { JwtGuard } from './guards/jwt.guard';

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Get('')
    @UseGuards(JwtGuard)
    async fff(@Body() dto: AuthDto) {
        return 4
    }
    @Post('register')
    async register(@Body() dto: AuthDto) {
        return this.authService.register(dto)
    }
    @Post('login/access-token')
    async getNewTokens(@Body() dto: RefreshTokenDto) {
              return this.authService.getNewTokens(dto)
    }
    @Post('login')
    async login(@Body() dto: AuthDto) {
        return this.authService.login(dto)
    }
}
