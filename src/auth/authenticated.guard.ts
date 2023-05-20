import { Injectable, ExecutionContext, CanActivate } from "@nestjs/common"

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest()

        return request.isAuthenticated() // это поле в реквесте есть, так как мы установили в проект пакет password

    }
}