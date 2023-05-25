import { Injectable } from '@nestjs/common';
import { PassportSerializer } from "@nestjs/passport"

@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: Function) {
        // console.log("serializeUser");
        done(null, user)
    }
    deserializeUser(payload: any, done: Function) {
        // console.log("deserializeUser");
        done(null, payload)
    }
}