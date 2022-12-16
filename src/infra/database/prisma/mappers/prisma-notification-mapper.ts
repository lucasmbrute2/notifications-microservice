import { Notification } from '@application/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notifcation: Notification) {
    return {
      id: notifcation.id,
      category: notifcation.category,
      content: notifcation.content.value,
      recipientId: notifcation.recipientId,
      readAt: notifcation.readAt,
      createdAt: notifcation.readAt,
    };
  }
}
