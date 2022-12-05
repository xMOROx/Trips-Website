import { NotificationType } from "./notificationType.enum";

export interface INotification {
    type: NotificationType;
    title: string;
    description: string;
    id: number;
    date: Date;
}
