import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFoundException } from './exceptions/notification-not-found';

interface ReadNotificationInput {
  notificationId: string;
}

type ReadNotificationOutput = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(input: ReadNotificationInput): Promise<ReadNotificationOutput> {
    const { notificationId } = input;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundException();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
