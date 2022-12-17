import { NotificationRepository } from '@application/repositories/notifcations-repository';
import { Injectable } from '@nestjs/common';
import { NotifcationNotFound } from './errors/notification-not-found';

interface ReadNotificationRequest {
  notificationId: string;
}

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(request: ReadNotificationRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotifcationNotFound();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
