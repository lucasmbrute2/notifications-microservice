import { SendNotification } from './send-notification-use-case';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification();

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'notification',
      recipientId: '3131313daakdakdi',
    });

    expect(notification).toBeTruthy();
  });
});
