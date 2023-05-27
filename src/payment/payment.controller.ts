import { Auth } from './../auth/decorators/auth.decorator';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MakePaymentDto } from './dto/make-payment-dto';
import { PaymentService } from './payment.service';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MakePaymentResponse } from './types';
import { CheckPaymentDto } from './dto/check-payment.dto';

@ApiTags("payment")
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @ApiOkResponse({ type: MakePaymentResponse })
    @Auth()
    @Post()
    makePayment(@Body() dto: MakePaymentDto) {
        return this.paymentService.makePayment(dto)
    }
    @Auth()
    @Post('/info')
    checkPayment(@Body() checkPaymentDto: CheckPaymentDto) {
        console.log("payment info");

        return this.paymentService.checkPayment(checkPaymentDto);
    }
}
