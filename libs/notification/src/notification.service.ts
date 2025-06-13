import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@app/database';
import { NotificationEntity } from '@app/database/entities/notification.entity';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async createNotification(payload: {
    title: string;
    message: string;
    type: string;
    userId: number;
  }): Promise<NotificationEntity> {
    const newNotification = await this.notificationRepository.create({
      title: payload.title,
      content: payload.message,
      type: payload.type,
      user_id: payload.userId,
      is_read: false, // Default to unread
    });

    // Send real-time notification via WebSocket
    this.notificationGateway.sendNotificationToUser(payload.userId, newNotification);

    return newNotification;
  }

  async create(data: {
    type: string;
    title: string;
    content: string;
    user_id: number;
    data?: string;
  }) {
    return this.notificationRepository.create({
      ...data,
      is_read: false,
    });
  }

  async findAll(params: {
    page: number;
    size: number;
    user_id?: number;
    type?: string;
    is_read?: boolean;
  }) {
    return this.notificationRepository.findAll(params);
  }

  async findById(id: number) {
    return this.notificationRepository.findById(id);
  }

  async markAsRead(id: number) {
    return this.notificationRepository.update(id, {
      is_read: true,
      read_at: new Date(),
    });
  }

  // You can add more methods here, e.g., markNotificationAsRead, getNotificationsForUser, etc.
} 