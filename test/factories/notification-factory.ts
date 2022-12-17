import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override): Notification {
  return new Notification({
    category: 'social',
    content: new Content('A beauty notification'),
    recipientId: 'recipient-1',
    ...override,
  });
}
