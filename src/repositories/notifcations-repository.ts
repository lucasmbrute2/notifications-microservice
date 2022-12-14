import { Notification } from 'src/application/entities/notification';

export abstract class NotificationRepository {
  abstract create(notifcation: Notification): Promise<void>;
}
