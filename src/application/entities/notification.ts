import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: NotificationProps) {
    this.props = props;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set readAt(readAt: Date) {
    this.props.readAt = readAt;
  }

  public get readAt(): Date {
    return this.props.readAt;
  }

  public set category(category: string) {
    this.props.category;
  }

  public get category(): string {
    return this.props.category;
  }
}
