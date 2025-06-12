import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { TransactionService } from '@app/transaction';
import { VnpayPaymentDto } from '../transaction/transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly vnpayService: TransactionService) {}

  @Get('create')
  async create(@Query() dto: VnpayPaymentDto) {
    const url = await this.vnpayService.createPaymentUrl(dto);
    return { paymentUrl: url };
  }

  @Get('return')
  async return(@Query() query: any) {
    const result = await this.vnpayService.handleVnpayReturn(query);
    return {
      message: 'Transaction processed',
      status: result.status,
      transaction: result,
    };
  }

  @Post('ipn') // nếu có hỗ trợ IPN từ server VNPAY
  async ipn(@Body() body: any) {
    return this.vnpayService.handleVnpayReturn(body);
  }
}
