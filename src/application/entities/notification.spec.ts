import { randomUUID } from 'crypto';
import { Notification } from './notification';

describe('Notification', () => {
  it('should create a notification', () => {
    const notification = new Notification({
      recipientId: randomUUID(),
      content: 'New notification!',
      category: 'social',
    });

    expect(notification).toBeTruthy();
  });

  it('should create a notification with all props', () => {
    const data = {
      id: randomUUID(),
      recipientId: randomUUID(),
      content: 'New notification!',
      category: 'social',
      readAt: null,
      canceledAt: null,
      createdAt: new Date(),
    };

    const notification = new Notification(data);

    expect(notification.id).toBe(data.id);
    expect(notification.recipientId).toBe(data.recipientId);
    expect(notification.content).toBe(data.content);
    expect(notification.category).toBe(data.category);
    expect(notification.readAt).toBe(data.readAt);
    expect(notification.canceledAt).toBe(data.canceledAt);
    expect(notification.createdAt).toBe(data.createdAt);
  });

  it('can read a notification', () => {
    const notification = new Notification({
      recipientId: randomUUID(),
      content: 'New notification!',
      category: 'social',
    });

    expect(notification.readAt).toBeFalsy();

    notification.read();

    expect(notification.readAt).toBeInstanceOf(Date);
  });

  it('can cancel a notification', () => {
    const notification = new Notification({
      recipientId: randomUUID(),
      content: 'New notification!',
      category: 'social',
    });

    expect(notification.canceledAt).toBeFalsy();

    notification.cancel();

    expect(notification.canceledAt).toBeInstanceOf(Date);
  });
});
