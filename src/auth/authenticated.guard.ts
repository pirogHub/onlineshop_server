import { Injectable, ExecutionContext, CanActivate } from "@nestjs/common"

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        // console.log("AuthenticatedGuard");
        const request = context.switchToHttp().getRequest()
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!request", request);

        const flag = request.isAuthenticated() // это поле в реквесте есть, так как мы установили в проект пакет password
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!flag", flag);

        return flag
    }
}