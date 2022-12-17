import { Notification } from 'src/application/entities/notification';
import { NotificationRepository } from '@application/repositories/notifcations-repository';

export class InMemoryNotifcationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async findById(id: string): Promise<Notification | null> {
    const notifcation = this.notifications.find(
      (notificationInMemo) => notificationInMemo.id === id,
    );

    if (!notifcation) return null;
    return notifcation;
  }

  async create(notifcation: Notification) {
    this.notifications.push(notifcation);
  }

  async save(notification: Notification): Promise<void> {
    const notifcationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notifcationIndex >= 0) {
      this.notifications[notifcationIndex] = notification;
    }
  }

  async countManyByRecipientId(id: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === id,
    ).length;
  }

  async findManyByRecipientId(id: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === id,
    );
  }
}
