import { Injectable } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { InjectModel } from '@nestjs/sequelize';
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from 'src/users/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET
        })
    }


    async validate({ id }: { id: number }) {
        const user = await this.userModel.findOne({ where: { id } })

        return user
    }
}