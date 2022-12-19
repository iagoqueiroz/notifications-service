import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface GetRecipientNotificationsInput {
  recipientId: string;
}

interface GetRecipientNotificationsOutput {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    input: GetRecipientNotificationsInput,
  ): Promise<GetRecipientNotificationsOutput> {
    const { recipientId } = input;

    const notifications =
      await this.notificationsRepository.findAllByRecipientId(recipientId);

    return { notifications };
  }
}
