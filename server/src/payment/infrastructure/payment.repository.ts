import { CreatePaymentDto } from '../dto/create-payment.dto';
import { PaymentEntity } from './entities/payment.entity';

export abstract class PaymentRepository {
  abstract createPayment(data: CreatePaymentDto): Promise<PaymentEntity>;
}
