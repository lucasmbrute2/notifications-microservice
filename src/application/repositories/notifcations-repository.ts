import { Notification } from 'src/application/entities/notification';

export abstract class NotificationRepository {
  abstract create(notifcation: Notification): Promise<void>;
  abstract findById(id: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(id: string): Promise<number>;
  abstract findManyByRecipientId(id: string): Promise<Notification[]>;
}
