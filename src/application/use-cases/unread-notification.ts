import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-fount';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }
    console.log(notification)
    notification.unread();
    console.log(notification)

    await this.notificationsRepository.save(notification);
  }
}