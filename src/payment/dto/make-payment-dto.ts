import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class MakePaymentDto {
    @ApiProperty({ example: 20.0 })
    @IsNotEmpty()
    readonly amount: number
}