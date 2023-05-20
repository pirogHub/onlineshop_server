import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './users/config/sequelizeConfig.service';
import { databaseConfig } from './users/config/configuration';
import { AuthModule } from './auth/auth.module';
import { BoilerPartsModule } from './boiler-parts/boiler-parts.module';
import { BoilerPartsController } from './boiler-parts/boiler-parts.controller';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService
    }),
    ConfigModule.forRoot({
      load: [databaseConfig]
    }),
    UsersModule,
    AuthModule,
    BoilerPartsModule],
  controllers: [BoilerPartsController],
  providers: [],
})
export class AppModule { }
