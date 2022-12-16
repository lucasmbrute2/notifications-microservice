import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notification-use-case';
import { createNotificationDTO } from '../dtos/create-notification-dto';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

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
