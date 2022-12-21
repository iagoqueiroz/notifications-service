import { IsUUID } from 'class-validator';

export class NotificationIdParam {
  @IsUUID()
  notificationId: string;
}
