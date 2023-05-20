import { ApiProperty } from '@nestjs/swagger';
export class LoginUserRequest {
    @ApiProperty({ default: "Bob", example: "Bob" })
    username: string

    @ApiProperty({ default: "123456", example: "123456" })
    password: string
}

export class LoginUserResponse {
    @ApiProperty({
        default: {
            user: {
                userId: 1,
                username: "Bob",
                password: "123456"
            }
        }, example: {
            user: {
                userId: 1,
                username: "Bob",
                password: "123456"
            }
        }
    })
    user: {
        userId: number,
        username: string,
        password: string
    }

    @ApiProperty({ default: "Logged in", example: "Logged in" })
    msg: string
}


export class LogoutUserResponse {
    @ApiProperty({ default: "session has ended", example: "session has ended" })
    msg: string
}

export class LoginCheckResponse {
    @ApiProperty({ default: 1, example: 1 })
    userId: number

    @ApiProperty({ default: "Bob", example: "Bob" })
    username: string

    @ApiProperty({ default: "test@test.test", example: "test@test.test" })
    email: string
}

export class SignupResponse {
    @ApiProperty({ default: 1, example: 1 })
    id: number
    @ApiProperty({ default: "Bob", example: "Bob" })
    username: string
    @ApiProperty({ default: "$2b$10$KO3UDCrUBNxPk7I0oV42Te6sG4242FGh8CKVDm9cfWEla760FmsXT2", example: "$2b$10$KO3UDCrUBNxPk7I0oV42Te6sG4242FGh8CKVDm9cfWEla760FmsXT2" })
    password: string
    @ApiProperty({ default: "tes2t@test.test", example: "tes2t@test.test" })
    email: string
    @ApiProperty({ default: "2023-05-20T07:24:52.195Z", example: "2023-05-20T07:24:52.195Z" })
    updatedAt: string
    @ApiProperty({ default: '2023-05-20T07:24:52.195Z', example: '2023-05-20T07:24:52.195Z' })
    createdAt: string
}