// import { SessionSerializer } from './../auth/session.serializer';
// import { Request, Response, UseGuards, Body, Header, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { createUserDto } from './dto/create-user.dto';
// import { LocalAuthGuard } from 'src/auth/local.auth.guard';
// import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
// import { LoginCheckResponse, LoginUserRequest, LoginUserResponse, LogoutUserResponse, SignupResponse } from './types';

// import { ApiBody, ApiTags, ApiOkResponse } from "@nestjs/swagger"

// @ApiTags("users")
// @Controller('users')
// export class UsersController {

//     constructor(private readonly usersService: UsersService,
//         private readonly sessionSerializer: SessionSerializer) { }

//     @ApiOkResponse({ type: SignupResponse })
//     @Post('/signup')
//     @HttpCode(HttpStatus.CREATED)
//     @Header('Content-type', 'application/json')
//     async createUser(@Request() req, @Body() createUserDto: createUserDto) {
//         const user = await this.usersService.create(createUserDto)


//         return user
//     }

//     @ApiBody({ type: LoginUserRequest })
//     @ApiOkResponse({ type: LoginUserResponse })
//     @Post('/login')
//     @UseGuards(LocalAuthGuard)
//     @HttpCode(HttpStatus.OK)
//     login(@Request() req) {
//         // console.log("req", req.session);
//         // console.log("res", res);
//         return { user: req.user, msg: "Logged in" }
//     }

//     @ApiOkResponse({ type: LoginCheckResponse })
//     @Get('/login-check')
//     @Auth()
//     loginCheck(@Request() req) {
//         return req.user
//         // return 5
//     }

//     @ApiOkResponse({ type: LogoutUserResponse })
//     @Get('/logout')
//     loginOut(@Request() req) {
//         req.session.destroy()
//         return { msg: "session has ended" }
//     }

// }
