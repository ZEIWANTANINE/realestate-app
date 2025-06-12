import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VnpayPaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  orderInfo: string;

  @IsNotEmpty()
  @IsNumber()
  propertyId: number;

  @IsNotEmpty()
  @IsNumber()
  buyerId: number;
}
