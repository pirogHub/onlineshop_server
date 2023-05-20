import { Request, UseGuards, Body, Header, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    createUser(@Body() createUserDto: createUserDto) {
        return this.usersService.create(createUserDto)
    }


    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    login(@Request() req) {
        return { user: req.user, msg: "Logged in" }
    }




}
