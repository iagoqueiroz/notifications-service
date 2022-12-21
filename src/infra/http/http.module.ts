import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CreateNotification } from '@application/use-cases/create-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    CreateNotification,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
    CancelNotification,
  ],
})
export class HttpModule {}
