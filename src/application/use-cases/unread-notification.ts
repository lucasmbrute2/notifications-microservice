import { NotificationRepository } from '@application/repositories/notifcations-repository';
import { Injectable } from '@nestjs/common';
import { NotifcationNotFound } from './errors/notification-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(request: UnreadNotificationRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotifcationNotFound();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
