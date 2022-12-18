import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @Length(4, 240)
  content: string;

  @IsNotEmpty()
  category: string;
}
