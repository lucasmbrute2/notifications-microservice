import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotifcationRepository } from '@test/repositories/in-memory-notifcations-repositories';
import { CountRecipientsNotifications } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  it('should be able to count recipients', async () => {
    const notificationsRepository = new InMemoryNotifcationRepository();
    const countRecipientUseCase = new CountRecipientsNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientUseCase.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
