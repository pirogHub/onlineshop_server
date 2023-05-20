import * as bcrypt from "bcrypt"

import { TestingModule, Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from "src/users/config/sequelizeConfig.service";
import { databaseConfig } from 'src/users/config/configuration';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.model';
import { UsersService } from "src/users/users.service";


describe("Users Service", () => {
    let app: INestApplication
    let usersService: UsersService
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

        usersService = testModule.get<UsersService>(UsersService)
        app = testModule.createNestApplication()
        await app.init()

    })



    afterEach(async () => {
        await User.destroy({ where: { username: "Test" } })
    })

    it('should create user', async () => {
        const newUser = {
            username: "Test",
            email: "tester@tester.tester",
            password: "123456"
        }

        const user = await usersService.create(newUser) as User

        const passwordIsValid = await bcrypt.compare(newUser.password, user.password)

        expect(user.username).toBe(newUser.username)
        expect(passwordIsValid).toBe(true)
        expect(user.email).toBe(newUser.email)
    })
})