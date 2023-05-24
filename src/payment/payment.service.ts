import { Injectable, ForbiddenException } from '@nestjs/common';
import axios from 'axios';
import { MakePaymentDto } from './dto/make-payment-dto';
import { CheckPaymentDto } from './dto/check-payment.dto';
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
                    description: dto.description
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

    async checkPayment(checkPaymentDto: CheckPaymentDto) {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `https://api.yookassa.ru/v3/payments/${checkPaymentDto.paymentId}`,
                auth: {
                    username: '204971',
                    password: 'test_dgisbcPctB1RjjKeSBzdIuXJR0IRTFKm6Rdi9eNGZxE',
                },
            });

            return data;
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }
}
