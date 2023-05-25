import { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport"
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {
        // console.log("canActivate");
        const result = await super.canActivate(context) as boolean
        const request = context.switchToHttp().getRequest()

        await super.logIn(request)

        return result
    }
}