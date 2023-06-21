import { NotificationType } from "../enums/notification-type.enum";

export interface Notification {
    type: NotificationType;
    data?: any;
}