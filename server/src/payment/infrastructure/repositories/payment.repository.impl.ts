import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';
import { PAYMENT_STATUS } from 'src/payment/payment-status.enum';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { PaymentRepository } from '../payment.repository';

export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async createPayment(data: CreatePaymentDto): Promise<PaymentEntity> {
    const payment = new PaymentEntity();
    payment.amount = data.amount;
    payment.transaction_id = data.transaction_id;

    await this.paymentRepository.save(payment);
    return payment;
  }

  async changePaymentStatus(id: number, status: PAYMENT_STATUS) {
    const payment = await this.paymentRepository.findOneBy({
      id,
    });
    payment.status = status;
    return this.paymentRepository.save(payment);
  }
}
