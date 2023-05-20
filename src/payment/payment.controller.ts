import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { MakePaymentDto } from './dto/make-payment-dto';
import { PaymentService } from './payment.service';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MakePaymentResponse } from './types';

@ApiTags("payment")
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @ApiOkResponse({ type: MakePaymentResponse })
    @UseGuards(AuthenticatedGuard)
    @Post()
    makePayment(@Body() dto: MakePaymentDto) {
        return this.paymentService.makePayment(dto)
    }

}
