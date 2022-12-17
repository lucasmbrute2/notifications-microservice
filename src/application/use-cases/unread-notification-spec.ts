import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotifcationRepository } from '@test/repositories/in-memory-notifcations-repositories';
import { NotifcationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotifcationRepository();
    const unreadNotificationUseCase = new UnreadNotification(
      notificationRepository,
    );

    const notification = makeNotification({ readAt: new Date() });
    await notificationRepository.create(notification);
    await unreadNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('shoud not be able to unread a non existing notification', async ()=>){
    const notificationRepository = new InMemoryNotifcationRepository();
    const unreadNotificationUseCase = new UnreadNotification(
      notificationRepository,
    );

    expect(()=>{
        return await unreadNotificationUseCase.execute({
            notificationId: 'notification-fail-test',
        });
    }).rejects.toThrow(NotifcationNotFound)
  }
});
