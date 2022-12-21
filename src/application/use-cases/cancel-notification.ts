import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFoundException } from './exceptions/notification-not-found';

interface CancelNotificationInput {
  notificationId: string;
}

type CancelNotificationOutput = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    input: CancelNotificationInput,
  ): Promise<CancelNotificationOutput> {
    const { notificationId } = input;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundException();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
