import { UseGuards,applyDecorators } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';


export const Auth =() => applyDecorators(UseGuards(JwtGuard))