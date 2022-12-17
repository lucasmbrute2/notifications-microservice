import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notifcations-repository';
import { Injectable } from '@nestjs/common';

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResponse> {
    const notifications =
      await this.notificationRepository.findManyByRecipientId(
        request.recipientId,
      );

    return { notifications };
  }
}
