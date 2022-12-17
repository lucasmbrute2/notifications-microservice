import { Notification } from '@application/entities/notification';
import { InMemoryNotifcationRepository } from '@test/repositories/in-memory-notifcations-repositories';
import { CancelNotification } from './cancel-notification';
import { randomUUID } from 'node:crypto';
import { Content } from '@application/entities/content';
import { NotifcationNotFound } from './errors/notification-not-found';

describe('Send notification', () => {
  it('should be able to cancel a notification', async () => {
    const notifcationRepository = new InMemoryNotifcationRepository();
    const cancelNotificationUseCase = new CancelNotification(
      notifcationRepository,
    );

    const notifcation = new Notification({
      category: 'social',
      content: new Content('A beauty notification'),
      recipientId: randomUUID(),
    });

    await notifcationRepository.create(notifcation);

    await cancelNotificationUseCase.execute({
      notificationId: notifcation.id,
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
