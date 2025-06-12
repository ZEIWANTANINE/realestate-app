import { TransactionEntity } from '@app/database/entities/transaction.entity';
import { TransactionRepository } from '@app/database/repositories/transaction.repository';
import { Injectable } from '@nestjs/common';
import { VnpayPaymentDto } from 'apps/realestate-app/src/transaction/transaction.dto';
import * as crypto from 'crypto';
import * as qs from 'qs';

@Injectable()
export class TransactionService {
    constructor(private readonly transactionRepo: TransactionRepository) {}

  private readonly vnpConfig = {
    tmnCode: 'VNPAY_TMN_CODE',
    secretKey: 'VNPAY_SECRET_KEY',
    vnpUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
    returnUrl: 'http://localhost:3000/vnpay/return',
  };

  async createPaymentUrl(dto: VnpayPaymentDto): Promise<string> {
    const date = new Date();
    const createDate = this.formatDate(date);
    const amount = dto.amount * 100;

    const params: any = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.vnpConfig.tmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: dto.orderId,
      vnp_OrderInfo: dto.orderInfo,
      vnp_OrderType: 'other',
      vnp_Amount: amount.toString(),
      vnp_ReturnUrl: this.vnpConfig.returnUrl,
      vnp_IpAddr: '127.0.0.1',
      vnp_CreateDate: createDate,
    };

    const sortedParams = Object.fromEntries(Object.entries(params).sort());
    const signData = qs.stringify(sortedParams, { encode: false });
    const signed = crypto
      .createHmac('sha512', this.vnpConfig.secretKey)
      .update(signData)
      .digest('hex');
    sortedParams['vnp_SecureHash'] = signed;

    const paymentUrl = `${this.vnpConfig.vnpUrl}?${qs.stringify(sortedParams, {
      encode: true,
    })}`;

    return paymentUrl;
  }

  async handleVnpayReturn(query: any): Promise<TransactionEntity> {
    const secureHash = query.vnp_SecureHash;
    delete query.vnp_SecureHash;
    delete query.vnp_SecureHashType;

    const sortedParams = Object.fromEntries(Object.entries(query).sort());
    const signData = qs.stringify(sortedParams, { encode: false });
    const signed = crypto
      .createHmac('sha512', this.vnpConfig.secretKey)
      .update(signData)
      .digest('hex');

    if (secureHash !== signed) {
      throw new Error('Invalid signature from VNPAY');
    }

    const transaction = await this.transactionRepo.create({
      name: query.vnp_OrderInfo,
      payment_gateway: 'vnpay',
      payment_method: 'ATM',
      status: query.vnp_ResponseCode === '00' ? 'success' : 'failed',
      response_code: query.vnp_ResponseCode,
      message: this.getMessage(query.vnp_ResponseCode),
      transaction_reference: query.vnp_TxnRef,
      order_id: query.vnp_TxnRef,
      payment_time: this.parseDate(query.vnp_PayDate),
      ipn_received: true,
      currency: query.vnp_CurrCode,
      amount: parseFloat(query.vnp_Amount) / 100,
      property_id: Number(query.property_id) || null,
      buyer_id: Number(query.buyer_id) || null,
    });

    return transaction;
  }

  private formatDate(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return (
      date.getFullYear().toString() +
      pad(date.getMonth() + 1) +
      pad(date.getDate()) +
      pad(date.getHours()) +
      pad(date.getMinutes()) +
      pad(date.getSeconds())
    );
  }

  private parseDate(dateStr: string): Date {
    return new Date(
      Number(dateStr.slice(0, 4)),
      Number(dateStr.slice(4, 6)) - 1,
      Number(dateStr.slice(6, 8)),
      Number(dateStr.slice(8, 10)),
      Number(dateStr.slice(10, 12)),
      Number(dateStr.slice(12, 14)),
    );
  }

  private getMessage(code: string): string {
    const map = {
      '00': 'Thành công',
      '01': 'Giao dịch thất bại',
      // thêm mã khác nếu cần
    };
    return map[code] || 'Không rõ trạng thái';
  }
}
