export interface TransactionInterface {
  name: string;
  payment_gateway: string;
  payment_method: string;
  status: string;
  response_code: string;
  message: string;
  transaction_reference: string;
  order_id: string;
  payment_time: Date;
  ipn_received: boolean;
  currency: string;
  amount: number;
  property_id: number;
  buyer_id: number;
}
