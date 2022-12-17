import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotifcationRepository } from '@test/repositories/in-memory-notifcations-repositories';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipients notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotifcationRepository();
    const getRecipientNotificationsUseCase = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-test' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-test' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-test2' }),
    );

    const { notifications } = await getRecipientNotificationsUseCase.execute({
      recipientId: 'recipient-test',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-test' }),
        expect.objectContaining({ recipientId: 'recipient-test' }),
      ]),
    );
  });
});
