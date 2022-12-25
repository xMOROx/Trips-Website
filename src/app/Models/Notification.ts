import { ComponentsOfApplication } from "./componentsOfApplication.enum";
import { NotificationType } from "./notificationType.enum";

export interface INotification {
    type?: NotificationType;
    title?: string;
    description?: string;
    date?: string;
    key?: string;
    from?: ComponentsOfApplication;
}
