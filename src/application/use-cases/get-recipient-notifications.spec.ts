import { NotificationFactory } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get Recipient Notifications', () => {
  let repository: InMemoryNotificationsRepository;
  let instance: GetRecipientNotifications;

  beforeEach(() => {
    repository = new InMemoryNotificationsRepository();
    instance = new GetRecipientNotifications(repository);
  });

  it('should be able get all recipient notifications', async () => {
    Array.from({ length: 2 }).forEach(
      async () => await repository.create(NotificationFactory.make()),
    );

    Array.from({ length: 2 }).forEach(
      async () =>
        await repository.create(
          NotificationFactory.make({ recipientId: 'recipient-id-1' }),
        ),
    );

    const { notifications } = await instance.execute({
      recipientId: 'recipient-id-1',
    });

    expect(repository.notifications).toHaveLength(4);
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-id-1' }),
        expect.objectContaining({ recipientId: 'recipient-id-1' }),
      ]),
    );
  });
});
