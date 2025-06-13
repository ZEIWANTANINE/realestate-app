import { ConversationParticipantEntity } from '@app/database';

export interface IConversationParticipantService {
  create(data: {
    conversation_id: number;
    user_id: number;
    role: string;
    joined_at?: Date;
  }): Promise<ConversationParticipantEntity>;

  findAll(params: {
    page: number;
    size: number;
    user_id?: number;
    conversation_id?: number;
    role?: string;
  }): Promise<{
    data: ConversationParticipantEntity[];
    pagination: {
      total: number;
      size: number;
      page: number;
    };
  }>;

  findById(id: number): Promise<ConversationParticipantEntity | null>;

  update(id: number, data: Partial<ConversationParticipantEntity>): Promise<void>;

  softDelete(id: number): Promise<void>;
}
