import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt"

import { UnauthorizedException } from "@nestjs/common"

import * as bcrypt from "bcrypt"
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { RefreshTokenDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private readonly jwtService: JwtService
    ) { }

    findOne(filter: { where: { id?: string, username?: string, email?: string } }): Promise<User> {
        return this.userModel.findOne({ ...filter })
    }

    async getNewTokens({ refreshToken }: RefreshTokenDto) {
        if (!refreshToken) throw new UnauthorizedException("unauthorized")

        const result = await this.jwtService.verifyAsync(refreshToken)
        if (!result) throw new UnauthorizedException("jwt-expired")

        const user = await this.findOne({ where: { id: result.id } })

        const tokens = await this.issueTokenPair(user.id)


        return { user: { username: user.username, email: user.email, id: user.id }, ...tokens }

    }
    async login(dto: Pick<AuthDto, "username" | "password">) {

        const user = await this.validateUser(dto)

        const tokens = await this.issueTokenPair(user.id)

        return { user: { username: user.username, email: user.email, id: user.id }, ...tokens }
    }

    async register(createUserDto: AuthDto) {

        try {
            const existingByUserName = await this.findOne({ where: { username: createUserDto.username } })
            const existingByEmail = await this.findOne({ where: { email: createUserDto.email } })

            if (existingByUserName)
                return { warningMessage: "Пользователь с таким именем уже существует" }
            if (existingByEmail)
                return { warningMessage: "Пользователь с таким email уже существует" }

            const user = new User()

            const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

            user.username = createUserDto.username
            user.password = hashedPassword
            user.email = createUserDto.email


            await user.save()

            const tokens = await this.issueTokenPair(user.id)

            return { user: { username: user.username, email: user.email, id: user.id }, ...tokens }
        } catch (error) {
            throw new BadRequestException("server error then user creating")
        }


    }


    async validateUser({ username, password }: { username: string, password: string }) {
        const user = await this.findOne({ where: { username } })
        // console.log("validateUser");
        if (!user) {
            throw new UnauthorizedException("Invadid credentials")
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if (!passwordValid) {
            throw new UnauthorizedException("Invadid credentials")
        }

        if (user && passwordValid) {
            return {
                id: user.id,
                username: user.username,
                email: user.email
            }
        } else {
            throw new BadRequestException("Server error when user identificating")
        }
    }


    async issueTokenPair(userId: string) {
        const data = { id: userId }


        const refreshToken = await this.jwtService.signAsync(data, {
            expiresIn: '15d'
        })
        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: '1h'
        })
        return { refreshToken, accessToken }
    }
}
