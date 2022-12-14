import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entities/notification';
import { NotificationRepository } from 'src/repositories/notifcations-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notifcation: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notifcation.id,
        category: notifcation.category,
        content: notifcation.content.value,
        recipientId: notifcation.recipientId,
        readAt: notifcation.readAt,
        createdAt: notifcation.readAt,
      },
    });
  }
}
