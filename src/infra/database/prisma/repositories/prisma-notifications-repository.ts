import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entities/notification';
import { NotificationRepository } from '@application/repositories/notifcations-repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notifcation: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notifcation);

    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
