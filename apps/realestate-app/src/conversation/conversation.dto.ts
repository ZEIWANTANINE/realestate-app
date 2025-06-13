import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';

export enum ConversationType {
  PRIVATE = 'PRIVATE',
  GROUP = 'GROUP'
}

export class CreateConversationDto {
  @IsEnum(ConversationType)
  type: ConversationType;

  @IsString()
  @IsOptional()
  name?: string;
}
export enum ParticipantRole {
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER'
  }
export class AddParticipantDto {
  @IsNumber()
  user_id: number;

  @IsEnum(ParticipantRole)
  role: ParticipantRole;
}



export class ConversationQueryDto {
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  size?: number = 20;

  @IsEnum(ConversationType)
  @IsOptional()
  type?: ConversationType;
}
