import { Body, Controller, Post } from '@nestjs/common';
import { createNotificationDTO } from '../dtos/create-notification-dto';

@Controller('notifications')
export class NotificationsController {
  @Post()
  async create(@Body() data: createNotificationDTO) {
    const { content, category, recipientId } = data;
  }
}
