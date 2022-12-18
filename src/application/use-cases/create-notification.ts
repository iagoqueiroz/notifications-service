import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface CreateNotificationInput {
  recipientId: string;
  content: string;
  category: string;
}

interface CreateNotificationOutput {
  notification: Notification;
}

@Injectable()
export class CreateNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    input: CreateNotificationInput,
  ): Promise<CreateNotificationOutput> {
    const notification = new Notification({
      recipientId: input.recipientId,
      content: input.content,
      category: input.category,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
