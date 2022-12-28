import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CreateNotification } from './create-notification';

describe('Create Notification', () => {
  let repository: InMemoryNotificationsRepository;
  let instance: CreateNotification;

  beforeEach(() => {
    repository = new InMemoryNotificationsRepository();
    instance = new CreateNotification(repository);
  });

  it('should be able create a notification', async () => {
    const { notification } = await instance.execute({
      content: 'test notification',
      recipientId: 'example-recipient-id',
      category: 'social',
    });

    expect(repository.notifications).toHaveLength(1);
    expect(repository.notifications[0]).toBeInstanceOf(Notification);
    expect(repository.notifications[0]).toEqual(notification);
  });
});
