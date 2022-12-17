import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@application/repositories/notifcations-repository';
import { NotifcationNotFound } from './errors/notification-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notifcationRepository: NotificationRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;
    const notifcation = await this.notifcationRepository.findById(
      notificationId,
    );

    if (!notifcation) {
      throw new NotifcationNotFound();
    }

    notifcation.cancel();

    await this.notifcationRepository.save(notifcation);
  }
}
