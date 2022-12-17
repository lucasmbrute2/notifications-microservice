import { CancelNotification } from '@application/use-cases/cancel-notification';
import {
  CountRecipientNotificationsResponse,
  CountRecipientsNotifications,
} from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { Body, Controller, Post } from '@nestjs/common';
import { Get, Param, Patch } from '@nestjs/common/decorators';
import { SendNotification } from 'src/application/use-cases/send-notification-use-case';
import { createNotificationDTO } from '../dtos/create-notification-dto';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipients: CountRecipientsNotifications,
    private getRecipients: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get(':count/from/:id')
  async countFromRecipient(@Param('id') recipientId: string) {
    const { count } = await this.countRecipients.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get(':id/list')
  async getFromRecipient(@Param('id') recipientId: string) {
    const { notifications } = await this.getRecipients.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') notificationId: string) {
    await this.readNotification.execute({
      notificationId,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') notificationId: string) {
    await this.unreadNotification.execute({
      notificationId,
    });
  }

  @Post()
  async create(@Body() data: createNotificationDTO) {
    const { content, category, recipientId } = data;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return NotificationViewModel.toHTTP(notification);
  }
}
