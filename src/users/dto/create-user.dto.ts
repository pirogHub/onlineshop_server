import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class createUserDto {
    @ApiProperty({ default: "Bob", example: "Bob" })
    @IsNotEmpty()
    readonly username: string

    @ApiProperty({ default: "123456", example: "123456" })
    @IsNotEmpty()
    readonly password: string

    @ApiProperty({ default: "test@test.test", example: "test@test.test" })
    @IsNotEmpty()
    readonly email: string


}