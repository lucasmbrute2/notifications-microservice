import { InMemoryNotifcationRepository } from '@test/repositories/in-memory-notifcations-repositories';
import { CancelNotification } from './cancel-notification';
import { randomUUID } from 'node:crypto';
import { NotifcationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('Send notification', () => {
  it('should be able to cancel a notification', async () => {
    const notifcationRepository = new InMemoryNotifcationRepository();
    const cancelNotificationUseCase = new CancelNotification(
      notifcationRepository,
    );

    const notification = makeNotification({ recipientId: randomUUID() });

    await notifcationRepository.create(notification);

    await cancelNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notifcationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existent notification', async () => {
    const notifcationRepository = new InMemoryNotifcationRepository();
    const cancelNotifcationUseCase = new CancelNotification(
      notifcationRepository,
    );

    expect(() => {
      return cancelNotifcationUseCase.execute({
        notificationId: 'test-error-notifcation',
      });
    }).rejects.toThrow(NotifcationNotFound);
  });
});
