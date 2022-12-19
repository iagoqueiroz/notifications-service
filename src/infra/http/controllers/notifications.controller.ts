import { CreateNotification } from '@application/use-cases/create-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { RecipientIdParam } from '../params/recipient-id-param';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private createNotification: CreateNotification,
    private getRecipientNotifications: GetRecipientNotifications,
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
}
