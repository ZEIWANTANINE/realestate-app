import { IsNumber, IsOptional } from 'class-validator';

export class MarkMessageReadDto {
  @IsNumber()
  message_id: number;
}

export class MessageReadQueryDto {
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  size?: number = 20;

  @IsNumber()
  @IsOptional()
  user_id?: number;

  @IsNumber()
  @IsOptional()
  message_id?: number;

  @IsNumber()
  @IsOptional()
  conversation_id?: number;
}
