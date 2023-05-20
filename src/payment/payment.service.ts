import { Injectable, ForbiddenException } from '@nestjs/common';
import axios from 'axios';
import { MakePaymentDto } from './dto/make-payment-dto';
@Injectable()
export class PaymentService {

    async makePayment(dto: MakePaymentDto) {
        try {


            const { data } = await axios.post('https://api.yookassa.ru/v3/payments',
                {
                    amount: {
                        value: dto.amount,
                        currency: "RUB"
                    },
                    capture: true,
                    confirmation: {
                        type: 'redirect',
                        return_url: process.env.CLIENT_HOST + "/order"
                    },
                    description: 'Order №1'
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Idempotence-Key": Date.now()
                    },
                    auth: {
                        username: "321227",
                        password: "test_nGjjml1zkQdAVhclMaDJPhTkLOV-PhCfHuv9iq1t-Go"
                    }
                })
            return data
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }
}
