import { Request, UseGuards, Body, Header, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LoginCheckResponse, LoginUserRequest, LoginUserResponse, LogoutUserResponse, SignupResponse } from './types';

import { ApiBody, ApiOkResponse } from "@nestjs/swagger"

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @ApiOkResponse({ type: SignupResponse })
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    createUser(@Body() createUserDto: createUserDto) {
        return this.usersService.create(createUserDto)
    }

    @ApiBody({ type: LoginUserRequest })
    @ApiOkResponse({ type: LoginUserResponse })
    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    login(@Request() req) {
        return { user: req.user, msg: "Logged in" }
    }

    @ApiOkResponse({ type: LoginCheckResponse })
    @Get('/login-check')
    @UseGuards(AuthenticatedGuard)
    loginCheck(@Request() req) {
        return req.user
        // return 5
    }

    @ApiOkResponse({ type: LogoutUserResponse })
    @Get('/logout')
    loginOut(@Request() req) {
        req.session.destroy()
        return { msg: "session gas ended" }
    }

}
