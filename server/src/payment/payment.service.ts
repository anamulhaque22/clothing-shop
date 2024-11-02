import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './infrastructure/payment.repository';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepo: PaymentRepository) {}

  async createPayment(data: {
    amount: number;
    orderId?: number;
    transaction_id: string;
  }) {
    return this.paymentRepo.createPayment(data);
  }
}
