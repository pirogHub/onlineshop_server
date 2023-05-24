import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class MakePaymentDto {
    @ApiProperty({ example: 20.0 })
    @IsNotEmpty()
    readonly amount: number

    @ApiProperty({ example: 'заказ №1' })
    @IsOptional()
    readonly description?: string;
}