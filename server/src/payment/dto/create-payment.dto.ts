export class CreatePaymentDto {
  amount: number;
  transaction_id: string;
  orderId?: number;
}
