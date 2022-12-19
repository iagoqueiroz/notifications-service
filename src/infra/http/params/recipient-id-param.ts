import { IsUUID } from 'class-validator';

export class RecipientIdParam {
  @IsUUID()
  recipientId: string;
}
