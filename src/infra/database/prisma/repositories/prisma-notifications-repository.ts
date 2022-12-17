import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entities/notification';
import { NotificationRepository } from '@application/repositories/notifcations-repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async create(notifcation: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notifcation);

    await this.prisma.notification.create({
      data: raw,
    });
  }

  async findById(id: string): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id,
      },
    });

    if (!notification) return null;

    return PrismaNotificationMapper.toDomain(notification);
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async countManyByRecipientId(id: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId: id,
      },
    });

    return count;
  }

  async findManyByRecipientId(id: string): Promise<Notification[]> {
    const notification = await this.prisma.notification.findMany({
      where: {
        recipientId: id,
      },
    });

    return notification.map(PrismaNotificationMapper.toDomain);
  }
}
