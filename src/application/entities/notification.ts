import { Replace } from '@helpers/Replace';
import { randomUUID } from 'crypto';

export interface NotificationProps {
  id: string;
  recipientId: string;
  content: string;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

type InputProps = Replace<
  NotificationProps,
  {
    id?: string;
    createdAt?: Date;
  }
>;

export class Notification {
  private props: NotificationProps;

  constructor(props: InputProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this.props.id;
  }

  public get recipientId() {
    return this.props.recipientId;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get content() {
    return this.props.content;
  }

  public set content(content: string) {
    this.props.content = content;
  }

  public get category() {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public read() {
    this.props.readAt = new Date();
  }

  public unread() {
    this.props.readAt = null;
  }

  public get readAt() {
    return this.props.readAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public get canceledAt() {
    return this.props.canceledAt;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
