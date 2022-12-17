import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { Notification as RawNotification } from '@prisma/client';

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

  static toDomain(raw: RawNotification) {
    const { content, id, ...rest } = raw;

    return new Notification(
      {
        content: new Content(content),
        ...rest,
      },
      id,
    );
  }
}
