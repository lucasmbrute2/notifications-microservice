import { Notification } from 'src/application/entities/notification';
import { NotificationRepository } from 'src/repositories/notifcations-repository';

export class InMemoryNotifcationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notifcation: Notification) {
    this.notifications.push(notifcation);
  }
}
