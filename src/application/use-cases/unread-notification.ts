import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFoundException } from './exceptions/notification-not-found';

interface UnreadNotificationInput {
  notificationId: string;
}

type UnreadNotificationOutput = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    input: UnreadNotificationInput,
  ): Promise<UnreadNotificationOutput> {
    const { notificationId } = input;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundException();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
