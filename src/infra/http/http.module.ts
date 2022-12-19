import { CreateNotification } from '@application/use-cases/create-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [CreateNotification, GetRecipientNotifications],
})
export class HttpModule {}
