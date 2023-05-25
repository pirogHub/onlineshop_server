import { SessionSerializer } from './../auth/session.serializer';
import { Request, UseGuards, Body, Header, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LoginCheckResponse, LoginUserRequest, LoginUserResponse, LogoutUserResponse, SignupResponse } from './types';

import { ApiBody, ApiTags, ApiOkResponse } from "@nestjs/swagger"

@ApiTags("users")
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService,
        private readonly sessionSerializer: SessionSerializer) { }

    @ApiOkResponse({ type: SignupResponse })
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    async createUser(@Request() req, @Body() createUserDto: createUserDto) {
        const user = await this.usersService.create(createUserDto)
        // const tmp = await this.sessionSerializer.serializeUser(user, () => { })
        // const tmp1 = await this.sessionSerializer.deserializeUser(user, () => { })

        // console.log("tmp", tmp);
        // console.log("tmp1", tmp1);
        // console.log("req", req.session);

        return user
    }

    @ApiBody({ type: LoginUserRequest })
    @ApiOkResponse({ type: LoginUserResponse })
    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    login(@Request() req) {
        // console.log("req", req.session);
        return { user: req.user, msg: "Logged in" }
    }

    @ApiOkResponse({ type: LoginCheckResponse })
    @Get('/login-check')
    @UseGuards(AuthenticatedGuard)
    loginCheck(@Request() req) {
        return { data: req.user }
        // return 5
    }

    @ApiOkResponse({ type: LogoutUserResponse })
    @Get('/logout')
    loginOut(@Request() req) {
        req.session.destroy()
        return { msg: "session has ended" }
    }

}
