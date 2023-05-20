import * as bcrypt from "bcrypt"
import * as request from "supertest"
import * as session from "express-session"
import * as passport from "passport"

import { TestingModule, Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from "src/users/config/sequelizeConfig.service";
import { databaseConfig } from 'src/users/config/configuration';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.model';
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";

const mockedUser = {
    username: "Tester",
    email: "test@test.test",
    password: "123456"
}
describe("Auth Controller", () => {
    let app: INestApplication
    let authService: AuthService
    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRootAsync({
                    imports: [ConfigModule],
                    useClass: SequelizeConfigService
                }),
                ConfigModule.forRoot({
                    load: [databaseConfig]
                }),
                AuthModule
            ]
        }).compile()

        authService = testModule.get<AuthService>(AuthService)

        app = testModule.createNestApplication()


        await app.init()

    })
    beforeEach(async () => {
        const user = new User()

        const hashedPassword = await bcrypt.hash(mockedUser.password, 10)

        user.username = mockedUser.username
        user.password = hashedPassword
        user.email = mockedUser.email

        user.save()
    })



    afterEach(async () => {
        await User.destroy({ where: { username: mockedUser.username } })
    })

    it('should validate user', async () => {
        const user = await authService.validateUser(mockedUser.username, mockedUser.password)


        expect(user.username).toBe(mockedUser.username)
        expect(user.email).toBe(mockedUser.email)
    })


})