import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { UnauthorizedException } from "@nestjs/common"

import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService
    ) { }

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findOne({ where: { username } })

        if (!user) {
            throw new UnauthorizedException("Invadid credentials")
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if (!passwordValid) {
            throw new UnauthorizedException("Invadid credentials")
        }

        if (user && passwordValid) {
            return {
                userId: user.id,
                username: user.username,
                email: user.email
            }
        } else {
            return null
        }
    }
}
