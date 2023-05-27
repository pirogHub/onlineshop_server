import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User as UserModel } from 'src/users/user.model';

type TypeData = keyof UserModel & keyof { id: number }

export const User = createParamDecorator((data: TypeData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user

    return data ? user[data] : user
})