import { CreateNotification } from '@application/use-cases/create-notification';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationDto } from '../dtos/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private createNotification: CreateNotification) {}

  @Post()
  async create(@Body() data: CreateNotificationDto) {
    const { notification } = await this.createNotification.execute(data);

    return { notification };
  }
}
