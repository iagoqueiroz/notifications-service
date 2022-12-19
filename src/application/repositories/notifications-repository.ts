import { Notification } from '@application/entities/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findAllByRecipientId(recipientId: string): Promise<Notification[]>;
}
