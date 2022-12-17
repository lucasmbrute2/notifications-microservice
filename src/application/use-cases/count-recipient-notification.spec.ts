import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotifcationRepository } from '@test/repositories/in-memory-notifcations-repositories';
import { CountRecipientsNotifications } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  it('should be able to count recipients', async () => {
    const notificationsRepository = new InMemoryNotifcationRepository();
    const countRecipientUseCase = new CountRecipientsNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('A beauty notification'),
        recipientId: 'recipient-1',
      }),
    );
    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('A beauty notification'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('A beauty notification'),
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countRecipientUseCase.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
