import { ConversationEntity } from '@app/database';

export interface IConversationService {
  create(data: {
    type: string;
    name?: string;
  }): Promise<ConversationEntity>;

  findAll(params: {
    page: number;
    size: number;
    created_by?: number;
    type?: string;
  }): Promise<{
    data: ConversationEntity[];
    pagination: {
      total: number;
      size: number;
      page: number;
    };
  }>;

  findById(id: number): Promise<ConversationEntity | null>;

  addParticipant(data: {
    conversation_id: number;
    user_id: number;
    role: string;
  }): Promise<any>;

  getConversationParticipants(conversationId: number): Promise<any[]>;
}
