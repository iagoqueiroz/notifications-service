import { CreateNotification } from '@application/use-cases/create-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { NotificationIdParam } from '../params/notification-id-param';
import { RecipientIdParam } from '../params/recipient-id-param';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private createNotification: CreateNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
  ) {}

  @Post()
  async create(@Body() data: CreateNotificationDto) {
    const { notification } = await this.createNotification.execute(data);

    return { notification: NotificationViewModel.toHTTP(notification) };
  }

  @Get('from/recipient/:recipientId')
  async getFromRecipientId(@Param() { recipientId }: RecipientIdParam) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Patch(':notificationId/read')
  async readNotificationFromId(
    @Param() { notificationId }: NotificationIdParam,
  ) {
    await this.readNotification.execute({ notificationId });
  }

  @Patch(':notificationId/unread')
  async unreadNotificationFromId(
    @Param() { notificationId }: NotificationIdParam,
  ) {
    await this.unreadNotification.execute({ notificationId });
  }
}
