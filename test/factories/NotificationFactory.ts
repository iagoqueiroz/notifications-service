import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';
import { faker } from '@faker-js/faker';

export class NotificationFactory {
  static make(props?: Partial<NotificationProps>): Notification {
    return new Notification({
      recipientId: faker.datatype.uuid(),
      content: faker.lorem.sentence(3),
      category: 'social',
      ...props,
    });
  }
}
