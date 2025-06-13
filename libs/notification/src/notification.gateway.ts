import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Injectable } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { MessageService } from '../../message/src/message.service'
import { MessageReadRepository } from '@app/database'
import { ConversationService } from '../../conversation/src/conversation.service'
import { NotificationEntity } from '@app/database'

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private userSockets: Map<number, string> = new Map()

  constructor(
    private readonly notificationService: NotificationService,
    private readonly messageService: MessageService,
    private readonly messageReadRepository: MessageReadRepository,
    private readonly conversationService: ConversationService,
  ) {}

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId
    if (userId) {
      this.userSockets.set(Number(userId), client.id)
      client.join(`user_${userId}`)
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId
    if (userId) {
      this.userSockets.delete(Number(userId))
    }
  }

  sendNotificationToUser(userId: number, notification: NotificationEntity) {
    this.server.to(`user_${userId}`).emit('newNotification', notification)
  }

  @SubscribeMessage('joinConversation')
  async handleJoinConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: number },
  ) {
    const userId = client.handshake.query.userId
    if (userId) {
      client.join(`conversation_${data.conversationId}`)
      
      // Get unread messages when joining conversation
      const result = await this.messageReadRepository.findAll({
        page: 1,
        size: 100,
        user_id: Number(userId),
        conversation_id: data.conversationId,
      })
      client.emit('unreadMessages', result.data)
    }
  }

  @SubscribeMessage('leaveConversation')
  async handleLeaveConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: number },
  ) {
    client.leave(`conversation_${data.conversationId}`)
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      conversationId: number
      message: string
      messageType: string
      mediaUrl?: string
    },
  ) {
    const userId = Number(client.handshake.query.userId)
    if (!userId) return

    // Save message to database
    const message = await this.messageService.create({
      conversation_id: data.conversationId,
      sender_id: userId,
      message: data.message,
      message_type: data.messageType,
      media_url: data.mediaUrl,
    })

    // Get conversation participants
    const participants = await this.conversationService.getConversationParticipants(data.conversationId)

    // Send message to all participants in the conversation
    this.server.to(`conversation_${data.conversationId}`).emit('newMessage', message)

    // Create notifications for other participants
    for (const participant of participants) {
      if (participant.user_id !== userId) {
        const notification = await this.notificationService.create({
          type: 'NEW_MESSAGE',
          title: 'New Message',
          content: data.message,
          user_id: participant.user_id,
          data: JSON.stringify({
            conversationId: data.conversationId,
            messageId: message.id,
          }),
        })

        // Send notification to the specific user
        this.sendNotificationToUser(participant.user_id, notification)
      }
    }
  }

  @SubscribeMessage('markMessageAsRead')
  async handleMarkMessageAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { messageId: number },
  ) {
    const userId = Number(client.handshake.query.userId)
    if (!userId) return

    await this.messageReadRepository.create({
      message_id: data.messageId,
      user_id: userId,
      read_at: new Date(),
    })
    
    this.server.to(`conversation_${data.messageId}`).emit('messageRead', {
      messageId: data.messageId,
      userId: userId,
    })
  }

  @SubscribeMessage('markNotificationAsRead')
  async handleMarkNotificationAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { notificationId: number },
  ) {
    const userId = Number(client.handshake.query.userId)
    if (!userId) return

    await this.notificationService.markAsRead(data.notificationId)
    this.server.to(`user_${userId}`).emit('notificationRead', {
      notificationId: data.notificationId,
    })
  }
} 