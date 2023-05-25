import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { SessionSerializer } from 'src/auth/session.serializer';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, SessionSerializer],
    exports: [UsersService]
})
export class UsersModule { }
