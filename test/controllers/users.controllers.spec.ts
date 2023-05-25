import * as bcrypt from "bcrypt"
import * as request from "supertest"

import { TestingModule, Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from "src/users/config/sequelizeConfig.service";
import { databaseConfig } from 'src/users/config/configuration';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.model';
const mockedUser = {
    username: "Tester",
    email: "test@test.test",
    password: "123456"
}

describe("Users Controller", () => {
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
                UsersModule
            ]
        }).compile()

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
        await User.destroy({ where: { username: "Test" } })
    })

    it('should create user', async () => {
        const newUser = {
            username: "Test",
            email: "tester@tester.tester",
            password: "123456"
        }

        const response = await request(app.getHttpServer()).post('/users/signup').send(newUser)

        const passwordIsValid = await bcrypt.compare(newUser.password, response.body.password)

        expect(response.body.username).toBe(newUser.username)
        expect(passwordIsValid).toBe(true)
        expect(response.body.email).toBe(newUser.email)
    })
})