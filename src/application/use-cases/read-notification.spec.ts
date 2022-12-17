import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotifcationRepository } from '@test/repositories/in-memory-notifcations-repositories';
import { NotifcationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotifcationRepository();
    const readNotificationUseCase = new ReadNotification(
      notificationRepository,
    );

    const notification = makeNotification();
    await notificationRepository.create(notification);

    await readNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', () => {
    const notificationRepository = new InMemoryNotifcationRepository();
    const readNotificationUseCase = new ReadNotification(
      notificationRepository,
    );

    expect(() => {
      return readNotificationUseCase.execute({
        notificationId: 'fake-id',
      });
    }).rejects.toThrow(NotifcationNotFound);
  });
});
