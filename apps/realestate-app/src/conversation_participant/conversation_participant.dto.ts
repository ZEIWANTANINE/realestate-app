import { IsNumber, IsOptional, IsEnum } from 'class-validator';

export enum ParticipantRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER'
}

export class CreateParticipantDto {
  @IsNumber()
  conversation_id: number;

  @IsNumber()
  user_id: number;

  @IsEnum(ParticipantRole)
  role: ParticipantRole;
}

export class UpdateParticipantDto {
  @IsEnum(ParticipantRole)
  @IsOptional()
  role?: ParticipantRole;
}

export class ParticipantQueryDto {
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
  conversation_id?: number;

  @IsEnum(ParticipantRole)
  @IsOptional()
  role?: ParticipantRole;
} 