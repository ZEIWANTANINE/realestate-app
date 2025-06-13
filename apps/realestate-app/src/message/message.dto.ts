import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE'
}

export class CreateMessageDto {
  @IsNumber()
  conversation_id: number;

  @IsString()
  message: string;

  @IsEnum(MessageType)
  message_type: MessageType;

  @IsString()
  @IsOptional()
  media_url?: string;
}

export class MessageQueryDto {
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  size?: number = 20;

  @IsNumber()
  @IsOptional()
  conversation_id?: number;

  @IsNumber()
  @IsOptional()
  sender_id?: number;
}
