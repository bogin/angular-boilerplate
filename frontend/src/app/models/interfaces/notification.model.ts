import { NotificationType } from "../enums/notification-type.enum";

export interface Notification {
    type: NotificationType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
}