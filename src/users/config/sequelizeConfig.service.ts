import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeOptionsFactory, SequelizeModuleOptions } from "@nestjs/sequelize"
import { User } from '../user.model';
@Injectable() // в знак того, что у этого класса будет создаваться инстанс
//чтобы мы этот класс прокинули как основную конфигурацию для секвалайза
export class SequelizeConfigService implements SequelizeOptionsFactory {
    constructor(private readonly configService: ConfigService) { }

    createSequelizeOptions(): SequelizeModuleOptions {
        const {
            sql: {
                dialect, logging, host, port, username, password, database
            }
        } = this.configService.get('database')

        return {
            dialect,
            logging,
            host,
            port,
            username,
            password,
            database,
            models: [User],
            autoLoadModels: true,
            synchronize: true,
            define: {
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        }
    }
}