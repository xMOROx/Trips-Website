import { ComponentsOfApplication } from "./componentsOfApplication.enum";
import { NotificationType } from "./notificationType.enum";

export interface INotification {
    key?: string;
    date?: string;
    title?: string;
    description?: string;
    type?: NotificationType;
    from?: ComponentsOfApplication;
}
