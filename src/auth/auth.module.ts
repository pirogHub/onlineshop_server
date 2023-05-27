import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.contorller';

@Module({
  imports: [SequelizeModule.forFeature([User]), JwtModule.registerAsync({
    useFactory() {
      return { secret: process.env.JWT_SECRET }
    }
  })],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
