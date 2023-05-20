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

const mockedUser = {
    username: "Tester",
    email: "test@test.test",
    password: "123456"
}
describe("Auth Controller", () => {
    let app: INestApplication
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

        app = testModule.createNestApplication()

        app.use(session({
            secret: "sdgfdss",
            resave: false,
            saveUninitialized: false
        }))

        app.use(passport.initialize())
        app.use(passport.session())
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

    it('should login user', async () => {

        const response = await request(app.getHttpServer()).post('/users/login').send({ ...mockedUser })
        console.log("response.body", response.body);


        expect(response.body.user.username).toBe(mockedUser.username)
        expect(response.body.msg).toBe("Logged in")
        expect(response.body.user.email).toBe(mockedUser.email)
    })

    it('should login check', async () => {

        const login = await request(app.getHttpServer()).post('/users/login').send({ ...mockedUser })
        const loginCheck = await request(app.getHttpServer()).get('/users/login-check').set("Cookie", login.header["set-cookie"])


        console.log("response.body", loginCheck.body);


        expect(loginCheck.body.username).toBe(mockedUser.username)
        expect(loginCheck.body.email).toBe(mockedUser.email)
    })

    it('should login check', async () => {

        const response = await request(app.getHttpServer()).get('/users/logout')
        console.log("response.body", response.body);

        expect(response.body.msg).toBe("session has ended")
    })
})