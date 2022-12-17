import { NotificationRepository } from '@application/repositories/notifcations-repository';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientsNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const count = await this.notificationRepository.countManyByRecipientId(
      request.recipientId,
    );

    return {
      count,
    };
  }
}
