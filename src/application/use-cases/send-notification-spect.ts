import { InMemoryNotifcationRepository } from 'test/repositories/in-memory-notifcations-repositories';
import { SendNotification } from './send-notification-use-case';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotifcationRepository();
    const sendNotificationUseCase = new SendNotification(
      notificationRepository,
    );
    const olderLength = notificationRepository.notifications.length;

    await sendNotificationUseCase.execute({
      category: 'social',
      content: 'notification',
      recipientId: '3131313daakdakdi',
    });

    expect(notificationRepository.notifications).toHaveLength(olderLength + 1);
  });
});
